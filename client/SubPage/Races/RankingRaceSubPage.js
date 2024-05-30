import React, {useState, useEffect, useCallback}  from 'react';
import { View, SafeAreaView, Alert } from 'react-native';
import { useMyContext } from '../../context/MyContext';

import UsersList from '../../components/List/UsersList';

import { getUsersRace } from '../../api/race/api';

import { commonStyles } from '../../styles/GlobalStyles';

export default function RankingRaceSubPage() {
    
    const { state, dispatch } = useMyContext();

    const [users, setUsers] = useState([]);

    const league_id = state['league']['id']
    const race = state['race']

    useEffect(() => {
        getRankingRaceDataEffect();
    }, [getRankingRaceDataEffect]);

    const getRankingRaceDataEffect = useCallback(async () => {
        try {
            const usersData = await getUsersRace(state['ip_adress'], league_id, race.race_id);
            setUsers(usersData);

        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }

    }, []);

    return (
        <SafeAreaView style={commonStyles.containerLight}>
            <View style={commonStyles.margin2Top}>
                <UsersList users={users} type={'race'} />
            </View>
        </SafeAreaView>
    );
}