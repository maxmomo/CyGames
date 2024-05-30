import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useMyContext } from '../context/MyContext';

import Header from '../components/Basic/Header';
import TitleLeague from '../components/Title/TitleLeague';
import MercatoLeagueSubPage from '../SubPage/Leagues/MercatoLeagueSubPage';
import OfferLeagueSubPage from '../SubPage/Leagues/OfferLeagueSubPage';
import NextEventLeagueSubPage from '../SubPage/Leagues/NextEventLeagueSubPage';
import RankingLeagueSubPage from '../SubPage/Leagues/RankingLeagueSubPage';
import MyTeamLeagueSubPage from '../SubPage/Leagues/MyTeamLeagueSubPage';
import HistoryLeagueSubPage from '../SubPage/Leagues/HistoryLeagueSubPage';

import { commonStyles } from '../styles/GlobalStyles';
import colors from '../constants/colors';

const LeagueStack  = createMaterialTopTabNavigator();

export default function LeaguePage() {

    const { state, dispatch } = useMyContext();

    const league = state['league']
    
    return (
        <SafeAreaView style={commonStyles.containerLight}>
            <Header is_navigation={true} />
            <View style={commonStyles.margin2Top}>
                <TitleLeague name={league['name'].toUpperCase()} />
            </View>
            <LeagueStack.Navigator
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
                <LeagueStack.Screen 
                    name="Evenement" 
                    component={NextEventLeagueSubPage}
                />
                <LeagueStack.Screen 
                    name="Classement" 
                    component={RankingLeagueSubPage}
                />
                <LeagueStack.Screen 
                    name='Mon equipe'
                    component={MyTeamLeagueSubPage}
                />
                <LeagueStack.Screen 
                    name="Mercato" 
                    component={MercatoLeagueSubPage}
                />
                <LeagueStack.Screen 
                    name='Mes offres'
                    component={OfferLeagueSubPage}
                />
                <LeagueStack.Screen 
                    name='Historique'
                    component={HistoryLeagueSubPage}
                />
            </LeagueStack.Navigator>
        </SafeAreaView>
    );
}