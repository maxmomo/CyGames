import React, {useState, useEffect, useCallback}  from 'react';
import { View, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMyContext } from '../../context/MyContext';

import StagesList from '../../components/List/StagesList';

import { getStagesRace } from '../../api/race/api';

import { commonStyles } from '../../styles/GlobalStyles';

export default function StagesRaceSubPage() {
    
    const navigation = useNavigation();
    const { state, dispatch } = useMyContext();

    const [stages, setStages] = useState([]);

    const race = state['race']

    useEffect(() => {
        getStageRaceDataEffect();
    }, [getStageRaceDataEffect]);

    const getStageRaceDataEffect = useCallback(async () => {
        try {
            const stagesData = await getStagesRace(state['ip_adress'], race.race_id);
            setStages(stagesData);

        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }

    }, []);

    const goStage = () => {
        navigation.navigate('Stage');
    };
    
    return (
        <SafeAreaView style={commonStyles.containerLight}>
            <View style={commonStyles.margin2Top}>
                <StagesList stages={stages} onItemPress={goStage} />
            </View>
        </SafeAreaView>
    );
}