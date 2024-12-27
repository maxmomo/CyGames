import { useEffect, useState, useCallback } from 'react';
import { FlatList, SafeAreaView, View, Text, Alert } from 'react-native';
import { useMyContext } from '../context/MyContext';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import GameCard from '../components/GameCard';
import { getAllGrids } from '../api/grid/api';
import { getAllRiders } from '../api/riders/api';
import { commonStyles } from '../styles/GlobalStyles';

export default function GridsPage() {
    const { state, dispatch } = useMyContext();
    const navigation = useNavigation();
    const [grids, setGrids] = useState([]);

    const user_id = state['user']['id'];

    useFocusEffect(
        useCallback(() => {
            getGridsEffect();
            getRidersEffect();
        }, [state['ip_adress'], user_id])
    );

    const getGridsEffect = useCallback(async () => {
        try {
            const data = await getAllGrids(state['ip_adress'], user_id);
            setGrids(data || []);
        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }
    }, [state['ip_adress'], user_id]);

    const getRidersEffect = useCallback(async () => {
        try {
            const data = await getAllRiders(state['ip_adress']);
            dispatch({ type: 'SET_RIDERS', payload: data });
        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }
    }, [state['ip_adress'], dispatch]);

    const onPressGrid = (item) => {
        const grid_id = item.id;
        navigation.navigate('Grid', { grid_id });
    };

    const renderItem = ({ item }) => {
        return (
            <GameCard
                item={item}
                onPress={onPressGrid}
            />
        );
    };

    return (
        <SafeAreaView style={commonStyles.container}>
            <View>
                {grids.length === 0 ? (
                    <Text style={{ textAlign: 'center', marginTop: 20 }}>Aucune grille disponible</Text>
                ) : (
                    <FlatList
                        data={grids}
                        keyExtractor={(item) => item?.id?.toString() || Math.random().toString()}
                        renderItem={renderItem}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                    />
                )}
            </View>
        </SafeAreaView>
    );
}