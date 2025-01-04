import React from 'react';
import { SafeAreaView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import MenuCard from '../components/MenuCard';
import { commonStyles } from '../styles/GlobalStyles';

export default function PackChoosePage() {
    const navigation = useNavigation();

    const onPressBronze = () => {
        const text = 'Echangez 4 coureurs bronzes contre un coureur argent'
        const type = 'silver'
        navigation.navigate('Exchange', {text, type});
    };

    const onPressGold = () => {
        const text = 'Echangez 4 coureurs argents contre un coureur or'
        const type = 'gold'
        navigation.navigate('Exchange', {text, type});
    };

    const onPressNew = () => {
        const text = 'Echangez 4 coureurs or contre un nouveau coureur garanti'
        const type = 'new'
        navigation.navigate('Exchange', {text, type});
    };
    

    // Data for the FlatList
    const menuItems = [
        { id: '1', name: 'Pack Bronze', onPress: onPressNew },
        { id: '2', name: 'Pack Argent', onPress: onPressGold },
        { id: '3', name: 'Pack Or', onPress: onPressNew },
    ];

    // Render item function
    const renderItem = ({ item, index }) => (
        <MenuCard 
            name={item.name} 
            onPress={item.onPress} 
            noMargin={true} 
        />
    );

    return (
        <SafeAreaView style={commonStyles.container}>
            <FlatList
                data={menuItems} 
                renderItem={renderItem} 
                keyExtractor={(item) => item.id} 
                numColumns={2} 
            />
        </SafeAreaView>
    );
}
