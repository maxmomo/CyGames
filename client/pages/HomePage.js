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

    const onPressCards = useCallback(() => {
        navigation.navigate('CategoryCards');
    }, [navigation]);

    const onPressCrossWords = useCallback(() => {
        navigation.navigate('CrossWords');
    }, [navigation]);
    
    return (
        <SafeAreaView style={commonStyles.container}>
            <Header is_navigation={false} />
            <View style={[commonStyles.row, commonStyles.flex1]}>
                <View style={commonStyles.flex1}>
                    <MenuCard name="Grille" onPress={onPressGrids} />
                    <MenuCard name="Mot croisé" onPress={onPressCrossWords} />
                </View>
                <View style={commonStyles.flex1}>
                    <MenuCard name="Cards" onPress={onPressCards} />
                    {/* <MenuCard name="A implémenter" /> */}
                </View>
            </View>
        </SafeAreaView>
    );
}