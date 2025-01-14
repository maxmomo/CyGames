import React, { useMemo } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { useMyContext } from '../context/MyContext';
import { commonStyles } from '../styles/GlobalStyles';
import RiderCard from '../components/RiderCard';

export default function CardsPage({ route }) {
    const { state } = useMyContext();
    const { category } = route.params;
    const { team } = route.params;

    let riders = []

    if (category) {
        riders = useMemo(() => 
            state.user_riders.filter(rider => rider.category === category && rider.rank !== undefined && rider.rank !== null), 
            [state.user_riders, category]
        );
    }

    if (team) {
        riders = useMemo(() => 
            state.user_riders.filter(rider => rider.team_id === team && rider.rank !== undefined && rider.rank !== null), 
            [state.user_riders, team]
        );        
    }

    if (riders.length % 2 !== 0) {
        riders = [...riders, { id: 'dummy', isDummy: true }];
    }

    const renderItem = ({ item }) => <RiderCard item={item} isDummy={item.isDummy} />;

    return (
        <SafeAreaView style={commonStyles.container}>
            <FlatList
                data={riders}
                renderItem={renderItem}
                numColumns={2}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}