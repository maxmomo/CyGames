import React, {useEffect, useState, useCallback} from 'react';
import { View, SafeAreaView, Alert } from 'react-native';
import { useMyContext } from '../../context/MyContext';

import Prediction from '../../components/Prediction';

import { commonStyles } from '../../styles/GlobalStyles';
import { getPrediction } from '../../api/stage/api';

export default function PredictionStageSubPage() {

    const { state, dispatch } = useMyContext();

    const [prediction, setPrediction] = useState([]);

    const stage = state['stage']
    const race = state['race']

    useEffect(() => {
        getPredictionStageDataEffect();
    }, [getPredictionStageDataEffect]);

    const getPredictionStageDataEffect = useCallback(async () => {
        try {
            const predictionData = await getPrediction(state['ip_adress'], stage.id, race.race_id);
            setPrediction(predictionData);
            
        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }

    }, []);

    return (
        <SafeAreaView style={commonStyles.containerLight}>
            <View style={[commonStyles.margin2Top, commonStyles.flex1]}>
                <Prediction riders={prediction} />
            </View>
        </SafeAreaView>
    );
}