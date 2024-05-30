import React, {useEffect, useState, useCallback} from 'react';
import { View, Alert, ScrollView } from 'react-native';
import { useMyContext } from '../context/MyContext';

import Bets3List from './List/Bets3List';

import { getBetsUserStage } from '../api/stage/api';

import { commonStyles } from '../styles/GlobalStyles';

export default function StageBet(props) {
    
    const { state, dispatch } = useMyContext();

    const [bets, setBets] = useState([]);

    const league_id = state['league']['id']
    const race_id = state['race']['race_id']
    const stage_id = state['stage']['id']

    useEffect(() => {
        getBetStageDataEffect();
    }, [getBetStageDataEffect, props.isModalBetVisible]);

    const getBetStageDataEffect = useCallback(async () => {
        try {
            const betsData = await getBetsUserStage(state['ip_adress'], race_id, props.user_id, league_id, stage_id);
            setBets(betsData)

        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }

    }, [bets, props.onPressItem]);

    return (
        <ScrollView style={commonStyles.margin2Top}>
            <View style={[commonStyles.flex3]}>
                <Bets3List bets={bets} betTypeId={8} onPress={props.onPress} readonly={props.readonly} />
            </View>
        </ScrollView>
    );
}