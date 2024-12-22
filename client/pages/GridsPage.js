import { useEffect, useState, useCallback } from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import { useMyContext } from '../context/MyContext';
import { useNavigation } from '@react-navigation/native';

import Header from '../components/Header';
import GameCard from '../components/GameCard';

import { getAllGrids } from '../api/grid/api';
import { getAllRiders } from '../api/riders/api';

import { commonStyles } from '../styles/GlobalStyles';

export default function GridsPage() {

    const { state, dispatch } = useMyContext();
    const navigation = useNavigation();

    const [grids, setGrids] = useState([]);

    const user_id = state['user']['id']

    useEffect(() => {
        getGridsEffect();
        getRidersEffect();
    }, [getGridsEffect, navigation]);

    const getGridsEffect = useCallback(async () => {
        try {
            const data = await getAllGrids(state['ip_adress'], user_id);
            setGrids(data);
        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }
    }, []);

    const getRidersEffect = useCallback(async () => {
        try {
            const data = await getAllRiders(state['ip_adress']);
            dispatch({ type: 'SET_RIDERS', payload: data });
        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }
    }, []);

    const onPressGrid = (item) => {
        dispatch({ type: 'SET_GRID', payload: item });
        navigation.navigate('Grid');
    };
    
    const renderItem = ({ item }) => {
        return (
            <GameCard item={item} onPress={onPressGrid} />
        );
    };
    return (
        <SafeAreaView style={commonStyles.container}>
            <Header is_navigation={true} />
            <View>
                <FlatList
                    data={grids}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    );
}