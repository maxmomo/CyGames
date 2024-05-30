import React, {useState, useEffect, useCallback}  from 'react';
import { View, SafeAreaView, Alert, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useMyContext } from '../../context/MyContext';

import { getRidersUserLeague } from '../../api/league/api';

import MyTeam from '../../components/MyTeam';

import { commonStyles } from '../../styles/GlobalStyles';

export default function MyTeamLeagueSubPage() {
    
    const { state, dispatch } = useMyContext();

    const [userRiders, setUserRiders] = useState([]);

    const user_id = state['user']['id']
    const league_id = state['league']['id']

    useEffect(() => {
        getMyTeamLeagueDataEffect();
    }, [getMyTeamLeagueDataEffect]);

    useFocusEffect(
        useCallback(() => {
            getMyTeamLeagueDataEffect();
        }, [])
    );

    const getMyTeamLeagueDataEffect = useCallback(async () => {
        try {
            const userRidersData = await getRidersUserLeague(state['ip_adress'], league_id, user_id);
            setUserRiders(userRidersData)
            dispatch({ type: 'SET_USER_TEAM', payload: userRidersData });

        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }

    }, [user_id, league_id]);
    
    return (
        <SafeAreaView style={commonStyles.containerLight}>
            <View style={[commonStyles.margin2Top, commonStyles.flex1]}>
                <MyTeam riders={userRiders} />
            </View>
        </SafeAreaView>
    );
}