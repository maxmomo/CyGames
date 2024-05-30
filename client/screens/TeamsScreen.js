import React, { useEffect, useState, useCallback } from 'react';
import { View, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMyContext } from '../context/MyContext';

import Header from '../components/Basic/Header';
import SelectTeamStatus from '../components/SelectTeamStatus';
import BasicSearchBar from '../components/Basic/BasicSearchBar';
import CardTeams from '../components/Cards/CardTeams';

import { getTeams } from '../api/team/api';

import { commonStyles } from '../styles/GlobalStyles';

export default function TeamsScreen() {

    const { state, dispatch } = useMyContext();
    const navigation = useNavigation();

    const DEFAULT_STATUS = 'WT';

    const [teams, setTeams] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState(DEFAULT_STATUS);
    const [searchQuery, setSearchQuery] = useState('');

    const status = state['team_status']
    const year = state['year']
    
    useEffect(() => {
        getTeamsEffect();
    }, [getTeamsEffect]);

    const getTeamsEffect = useCallback(async () => {
        try {
            const data = await getTeams(state['ip_adress'], year);
            setTeams(data);
        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }
    }, [year, navigation]);

    const onPressTeam = useCallback((item) => {
        dispatch({ type: 'SET_TEAM', payload: item });
        navigation.navigate('Team')
    }, [navigation, dispatch]);

    return (
        <SafeAreaView style={commonStyles.container}>
            <Header is_navigation={false} />
            <View style={commonStyles.margin2Top}>
                <SelectTeamStatus data={status} selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} />
            </View>
            <View style={commonStyles.margin2Top}>
                <BasicSearchBar placeholder={'Rechercher une équipe...'} onChangeText={setSearchQuery} />
            </View>
            <View style={[commonStyles.margin2Top, {flex: 1}]}>   
                <CardTeams teams={teams} searchQuery={searchQuery} selectedStatus={selectedStatus} onPress={onPressTeam} />
            </View>   
        </SafeAreaView>
    );
}