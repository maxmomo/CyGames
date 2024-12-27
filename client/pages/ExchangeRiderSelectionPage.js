import React from 'react';
import { SafeAreaView, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { commonStyles } from '../styles/GlobalStyles';
import RiderCard from '../components/RiderCard';

export default function ExchangeRiderSelectionPage({ route }) {
    const { riders, onSelect } = route.params;
    const navigation = useNavigation();

    const handleRiderSelect = (rider) => {
        if (onSelect) {
            onSelect(rider); 
        }
        navigation.goBack(); 
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleRiderSelect(item)}>
            <RiderCard item={item} />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={commonStyles.container}>
            <FlatList
                data={riders}
                renderItem={renderItem}
                keyExtractor={(item, index) => (item?.id ? item.id.toString() : index.toString())}
                numColumns={2}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}
