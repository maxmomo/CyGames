import React, { memo, useMemo } from 'react';
import { FlatList, StyleSheet, Text, SafeAreaView, View, Image, TouchableOpacity } from 'react-native';
import { useMyContext } from '../context/MyContext';
import { commonStyles } from '../styles/GlobalStyles';
import Header from '../components/Header';
import colors from '../constants/colors';
import RiderCard from '../components/RiderCard';
import Flag from 'react-native-flags';

const ListFooter = () => <View style={{ height: 100 }} />;

export default function CardsPage({ route }) {
    const { state } = useMyContext();
    const { category } = route.params;


    let riders = useMemo(() => state.user_riders.filter(rider => rider.category === category), [state.user_riders, category]);

    if (riders.length % 2 !== 0) {
        riders = [...riders, { id: 'dummy', isDummy: true }];
    }

    const renderItem = ({ item }) => <RiderCard item={item} isDummy={item.isDummy} />;

    return (
        <SafeAreaView style={commonStyles.container}>
            <Header is_navigation={true} />
            <FlatList
                data={riders}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                numColumns={2}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}