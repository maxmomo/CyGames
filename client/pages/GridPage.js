import React, { useEffect, useState, useCallback } from 'react';
import { TouchableOpacity, FlatList, StyleSheet, Text, SafeAreaView, View } from 'react-native';
import { useMyContext } from '../context/MyContext';

import { getAllGrids } from '../api/grid/api';

import { commonStyles } from '../styles/GlobalStyles';
import Header from '../components/Basic/Header';
import MenuCard from '../components/Cards/menuCard'
import colors from '../constants/colors';

export default function GridsPage() {

    const { state, dispatch } = useMyContext();

    const [grids, setGrids] = useState([]);

    useEffect(() => {
        getGridsEffect();
    }, [getGridsEffect]);

    const getGridsEffect = useCallback(async () => {
        try {
            const data = await getAllGrids(state['ip_adress']);
            setGrids(data);
        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }
    }, []);
    
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.card} onPress={() => props.onPress(item)}>
                <Text style={commonStyles.text13}>Niveau {item.level}</Text>
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
        width: '47%',
        padding: '3%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.theme,
        alignItems: 'center',
        margin: '1%',
        flex: 1
    },
    cardEmpty: {
        backgroundColor: colors.background,
        width: '47%',
        padding: '3%',
        alignItems: 'center',
        margin: '1%',
        flex: 1
    },
    image: {
        width: 100,
        height: 100,
    },
});