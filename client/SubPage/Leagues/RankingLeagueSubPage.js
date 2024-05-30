import React, {useState, useEffect, useCallback}  from 'react';
import { View, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMyContext } from '../../context/MyContext';

import UsersList from '../../components/List/UsersList';

import { getUsersLeague } from '../../api/league/api';

import { commonStyles } from '../../styles/GlobalStyles';

export default function RankingLeagueSubPage() {
    
    const navigation = useNavigation();
    const { state, dispatch } = useMyContext();

    const [users, setUsers] = useState([]);

    const user_id = state['user']['id']
    const league_id = state['league']['id']

    useEffect(() => {
        getRankingLeagueDataEffect();
    }, [getRankingLeagueDataEffect]);

    const getRankingLeagueDataEffect = useCallback(async () => {
        try {
            const usersData = await getUsersLeague(state['ip_adress'], league_id, user_id);
            setUsers(usersData);

        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }

    }, [user_id, league_id, navigation]);
    
    return (
        <SafeAreaView style={commonStyles.containerLight}>
            <View style={commonStyles.margin2Top}>
                <UsersList users={users} type={'global'} />
            </View>
        </SafeAreaView>
    );
}