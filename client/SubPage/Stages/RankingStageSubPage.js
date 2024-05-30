import React, {useState, useEffect, useCallback}  from 'react';
import { View, SafeAreaView, Alert } from 'react-native';
import { useMyContext } from '../../context/MyContext';

import UsersList from '../../components/List/UsersList';

import { getUsersStage } from '../../api/stage/api';

import { commonStyles } from '../../styles/GlobalStyles';

export default function RankingStageSubPage() {
    
    const { state, dispatch } = useMyContext();

    const [users, setUsers] = useState([]);

    const league_id = state['league']['id']
    const race = state['race']
    const stage_id = state['stage']['id']

    useEffect(() => {
        getRankingStageDataEffect();
    }, [getRankingStageDataEffect]);

    const getRankingStageDataEffect = useCallback(async () => {
        try {
            const usersData = await getUsersStage(state['ip_adress'], league_id, race.race_id, stage_id);
            setUsers(usersData);

        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }

    }, []);

    return (
        <SafeAreaView style={commonStyles.containerLight}>
            <View style={commonStyles.margin2Top}>
                <UsersList users={users} type={'stage'} />
            </View>
        </SafeAreaView>
    );
}