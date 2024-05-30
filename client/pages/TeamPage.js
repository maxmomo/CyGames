import React, {useState, useEffect, useCallback} from 'react';
import { View, SafeAreaView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useMyContext } from '../context/MyContext';

import Header from '../components/Basic/Header';
import TitleTeam from '../components/Title/TitleTeam';
import InformationTeamSubPage from '../SubPage/Teams/InformationTeamSubPage';
import HistoryTeamSubPage from '../SubPage/Teams/HistoryTeamSubPage';
import RidersTeamSubPage from '../SubPage/Teams/RidersTeamSubPage';
import PerformanceTeamSubPage from '../SubPage/Teams/PerformanceTeamSubPage';

import { commonStyles } from '../styles/GlobalStyles';
import colors from '../constants/colors';
import { getTeam } from '../api/team/api';

const TeamStack  = createMaterialTopTabNavigator();

export default function TeamPage({route}) {
    
    const { state, dispatch } = useMyContext();
    const [team, setTeam] = useState({});
    
    useEffect(() => {
        getTeamDataEffect();
    }, [getTeamDataEffect]);

    const getTeamDataEffect = useCallback(async () => {
        try {
            const teamData = await getTeam(state['ip_adress'], route.params['id']);
            setTeam(teamData)
            dispatch({ type: 'SET_TEAM', payload: teamData });

        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }

    }, [team]);

    return (
        <SafeAreaView style={commonStyles.containerLight}>
            <Header is_navigation={true} />
            { Object.keys(team).length !== 0 && <View style={commonStyles.flex1}>

                <View style={commonStyles.margin2Top}>
                    <TitleTeam nationality={team['nationality']} name={team['name']} year={team['year']} />
                </View>
                <TeamStack.Navigator
                    screenOptions={{
                        tabBarStyle: {
                            backgroundColor: colors.backgroundLight
                        },
                        tabBarActiveTintColor: colors.theme,
                        tabBarInactiveTintColor: colors.whiteText,
                        tabBarLabelStyle: {
                            flexShrink: 1,
                            width: '100%',
                        },
                        tabBarScrollEnabled: true,
                        tabBarIndicatorStyle: {
                            backgroundColor: colors.theme
                        },
                    }}
                >
                    <TeamStack.Screen 
                        name="Informations" 
                        component={InformationTeamSubPage}
                    />
                    <TeamStack.Screen 
                        name="Coureurs" 
                        component={RidersTeamSubPage}
                    />
                    <TeamStack.Screen 
                        name="Performance" 
                        component={PerformanceTeamSubPage}
                    />
                </TeamStack.Navigator>
            </View>}
        </SafeAreaView>
    );
}