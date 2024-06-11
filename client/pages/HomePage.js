import React, { useCallback } from 'react';
import { View, SafeAreaView } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import Header from '../components/Header';
import MenuCard from '../components/menuCard'

import { commonStyles } from '../styles/GlobalStyles';

export default function HomePage() {

    const navigation = useNavigation();

    const onPressGrids = useCallback(() => {
        navigation.navigate('Grids');
    }, [navigation]);
    
    return (
        <SafeAreaView style={commonStyles.container}>
            <Header is_navigation={false} />
            <View style={[commonStyles.row, commonStyles.flex1]}>
                <View style={commonStyles.flex1}>
                    <MenuCard name="Game" onPress={onPressGrids} />
                    <MenuCard name="Game" />
                </View>
                <View style={commonStyles.flex1}>
                    <MenuCard name="Cards" />
                    <MenuCard name="Game" />
                </View>
            </View>
        </SafeAreaView>
    );
}