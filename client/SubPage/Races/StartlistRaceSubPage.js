import React, {useState, useEffect, useCallback}  from 'react';
import { View, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMyContext } from '../../context/MyContext';

import StartlistList from '../../components/List/StartlistList';

import { getStartListRace } from '../../api/race/api';

import { commonStyles } from '../../styles/GlobalStyles';

export default function StartlistRaceSubPage() {

    const { state, dispatch } = useMyContext();

    const [startlist, setStartlist] = useState([]);

    const race = state['race']
    const user_id = state['user']['id']
    const league_id = state['league']['id']
    const year = state['year']

    useEffect(() => {
        getStartlistRaceDataEffect();
    }, [getStartlistRaceDataEffect]);

    const getStartlistRaceDataEffect = useCallback(async () => {
        try {
            const startlistData = await getStartListRace(state['ip_adress'], race.race_id, user_id, league_id, year);
            
            const teams = startlistData.reduce((acc, rider) => {
                const { team_name, team_id, team_nationality, team_jersey } = rider;
                if (!acc[team_id]) {
                    acc[team_id] = {
                        team_name,
                        team_nationality,
                        team_id,
                        team_jersey,
                        riders: [],
                    };
                }
                acc[team_id].riders.push(rider);
                
                return acc;
            }, {});
            
            const teamSections = Object.keys(teams).map(key => ({
                title: teams[key].team_name,
                data: teams[key].riders,
                team_nationality: teams[key].team_nationality,
                team_jersey: teams[key].team_jersey,
                team_id: teams[key].team_id,
            }));

            dispatch({ type: 'SET_STARTLIST', payload: teamSections });
            setStartlist(teamSections)

        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }

    }, []);
    
    return (
        <SafeAreaView style={commonStyles.containerLight}>
            <View style={[commonStyles.margin2Top, commonStyles.flex1]}>
                <StartlistList startlist={startlist} />
            </View>
        </SafeAreaView>
    );
}