import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useMyContext } from '../context/MyContext';

import Header from '../components/Basic/Header';
import TitleRace from '../components/Title/TitleRace';
import StagesRaceSubPage from '../SubPage/Races/StagesRaceSubPage';
import StartlistRaceSubPage from '../SubPage/Races/StartlistRaceSubPage';
import MyTeamRaceSubPage from '../SubPage/Races/MyTeamRaceSubPage';
import BetRaceSubPage from '../SubPage/Races/BetRaceSubPage';
import ResultRaceSubPage from '../SubPage/Races/ResultRaceSubPage';
import RankingRaceSubPage from '../SubPage/Races/RankingRaceSubPage';
import RaceInformation from '../components/RaceInformation';

import { commonStyles } from '../styles/GlobalStyles';
import colors from '../constants/colors';

const RaceStack  = createMaterialTopTabNavigator();

export default function RacePage() {
    
    const { state, dispatch } = useMyContext();

    const race = state['race']
    
    return (
        <SafeAreaView style={commonStyles.containerLight}>
            <Header is_navigation={true} />
            <View style={commonStyles.margin2Top}>
                <TitleRace nationality={race['nationality']} name={race['name'] + ' - ' + race['season']} />
            </View>
            <View style={commonStyles.margin2Top}>
                <RaceInformation race={race} />
            </View>
            <RaceStack.Navigator
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
                <RaceStack.Screen 
                    name="Paris" 
                    component={BetRaceSubPage}
                />
                <RaceStack.Screen 
                    name="Résultats" 
                    component={ResultRaceSubPage}
                />
                {race['odr'] === '0' && <RaceStack.Screen 
                    name="Etapes" 
                    component={StagesRaceSubPage}
                />}
                <RaceStack.Screen 
                    name="StartList" 
                    component={StartlistRaceSubPage}
                />
                <RaceStack.Screen 
                    name="Mon équipe" 
                    component={MyTeamRaceSubPage}
                />
                <RaceStack.Screen 
                    name="Classement" 
                    component={RankingRaceSubPage}
                />
            </RaceStack.Navigator>
        </SafeAreaView>
    );
}