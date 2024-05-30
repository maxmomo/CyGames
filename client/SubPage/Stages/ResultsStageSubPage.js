import React, {useEffect, useState, useCallback} from 'react';
import { View, SafeAreaView, Alert, ScrollView } from 'react-native';
import { useMyContext } from '../../context/MyContext';

import { getResultsStage } from '../../api/stage/api';

import { commonStyles } from '../../styles/GlobalStyles';
import Results3List from '../../components/List/Results3List';

export default function ResultsStageSubPage() {
    
    const { state, dispatch } = useMyContext();

    const [results, setResults] = useState([]);

    const user_id = state['user']['id']
    const league_id = state['league']['id']
    const race_id = state['race']['race_id']
    const stage_id = state['stage']['id']

    useEffect(() => {
        getResultsStageDataEffect();
    }, [getResultsStageDataEffect]);

    const getResultsStageDataEffect = useCallback(async () => {
        try {
            const resultsData = await getResultsStage(state['ip_adress'], race_id, user_id, league_id, stage_id);
            setResults(resultsData);

        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }

    }, []);

    return (
        <SafeAreaView style={commonStyles.containerLight}>
            <ScrollView style={commonStyles.margin2Top}>
                <View style={[commonStyles.flex3]}>
                    <Results3List results={results} resultTypeId={8} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}