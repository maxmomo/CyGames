import React, {useState, useEffect, useCallback}  from 'react';
import { View, SafeAreaView, Alert } from 'react-native';
import { useMyContext } from '../../context/MyContext';

import MyTeam from '../../components/MyTeam';

import { getStartListRace } from '../../api/race/api';

import { commonStyles } from '../../styles/GlobalStyles';

export default function MyTeamRaceSubPage() {
    
    const { state, dispatch } = useMyContext();

    const [userTeam, setUserTeam] = useState([]);

    const race = state['race']
    const user_id = state['user']['id']
    const league_id = state['league']['id']
    const year = state['year']

    useEffect(() => {
        getMyTeamRaceDataEffect();
    }, [getMyTeamRaceDataEffect]);

    const getMyTeamRaceDataEffect = useCallback(async () => {
        try {
            const startlistData = await getStartListRace(state['ip_adress'], race.race_id, user_id, league_id, year);

            startlistData.reduce((acc, rider) => {

                const riderIds = state['user_team'].map(rider => rider.id);

                const foundId = riderIds.find(id => id === rider.id)
                
                if (foundId) {
                    const foundRider = state['user_team'].find(rider => rider.id === foundId);
                    setUserTeam(currentTeam => [...currentTeam, foundRider])
                }

            }, {});

        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }

    }, []);
    
    return (
        <SafeAreaView style={commonStyles.containerLight}>
            <View style={[commonStyles.margin2Top, commonStyles.flex1]}>
                <MyTeam riders={userTeam} />
            </View>
        </SafeAreaView>
    );
}