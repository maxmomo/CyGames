import React, { useState, useCallback, useEffect }  from 'react';
import { View, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMyContext } from '../../context/MyContext';

import NextEvent from '../../components/NextEvent';

import { commonStyles } from '../../styles/GlobalStyles';
import { getNextRaces } from '../../api/race/api';

export default function NextEventLeagueSubPage() {
    
    const navigation = useNavigation();
    const { state, dispatch } = useMyContext();

    const [races, setRaces] = useState([]);
    const [race, setRace] = useState({});

    useEffect(() => {
        getRacesDataEffect();
    }, [getRacesDataEffect]);


    const getRacesDataEffect = useCallback(async () => {
        try {
            const racesData = await getNextRaces(state['ip_adress']);
            setRaces(racesData)

        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }

    }, []);

    const goRace = (item) => {
        dispatch({ type: 'SET_RACE', payload: item });
        navigation.navigate('Race');
    };

    return (
        <SafeAreaView style={commonStyles.containerLight}>
            <View style={commonStyles.margin2Top}>
                <NextEvent races={races} onPress={goRace} race={race} setRace={setRace} />
            </View>
        </SafeAreaView>
    );
}