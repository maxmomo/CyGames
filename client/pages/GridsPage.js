import React, { useEffect, useState, useCallback } from 'react';
import { TouchableOpacity, FlatList, StyleSheet, Text, SafeAreaView, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useMyContext } from '../context/MyContext';
import { useNavigation } from '@react-navigation/native';

import { getAllGrids } from '../api/grid/api';

import { commonStyles } from '../styles/GlobalStyles';
import Header from '../components/Basic/Header';
import colors from '../constants/colors';

export default function GridsPage() {

    const { state, dispatch } = useMyContext();
    const navigation = useNavigation();

    const [grids, setGrids] = useState([]);

    const user_id = state['user']['id']

    useEffect(() => {
        getGridsEffect();
    }, [getGridsEffect]);

    const getGridsEffect = useCallback(async () => {
        try {
            const data = await getAllGrids(state['ip_adress'], user_id);
            setGrids(data);
        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }
    }, []);

    const onPressGrid = useCallback((item) => {
        dispatch({ type: 'SET_GRID', payload: item });
        navigation.navigate('Grid');
    }, [navigation]);
    
    const renderStarIcons = (score) => {
        const stars = [];
        for (let i = 0; i < 3; i++) {
            const iconName = i < score ? 'star' : 'star-outline';
            stars.push(
                <MaterialCommunityIcons key={i} name={iconName} size={24} color={colors.theme} />
            );
        }
        return stars;
    };
    
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.card} onPress={() => onPressGrid(item)}>
                <Text style={commonStyles.text24}>Niveau {item.level}</Text>
                <View style={commonStyles.row}>
                    {renderStarIcons(item.score)}
                </View>
            </TouchableOpacity>
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

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.backgroundLight,
        padding: '3%',
        borderRadius: 30,
        borderWidth: 1,
        borderColor: colors.theme,
        alignItems: 'center',
        margin: '1%',
        flex: 1
    }
});