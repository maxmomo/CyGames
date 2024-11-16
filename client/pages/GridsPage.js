import { useEffect, useState, useCallback } from 'react';
import { TouchableOpacity, FlatList, StyleSheet, Text, SafeAreaView, View, Image, Dimensions } from 'react-native';
import { useMyContext } from '../context/MyContext';
import { useNavigation } from '@react-navigation/native';

import Header from '../components/Header';

import { getAllGrids } from '../api/grid/api';
import { getAllRiders } from '../api/riders/api';

import { commonStyles } from '../styles/GlobalStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../constants/colors';

const windowWidth = Dimensions.get('window').width;

export default function GridsPage() {

    const { state, dispatch } = useMyContext();
    const navigation = useNavigation();

    const [grids, setGrids] = useState([]);
    const [riders, setRiders] = useState([]);

    const user_id = state['user']['id']

    useEffect(() => {
        getGridsEffect();
        getRidersEffect();
    }, [getGridsEffect]);

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
            setRiders(data);
            dispatch({ type: 'SET_RIDERS', payload: data });
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
                <MaterialCommunityIcons key={i} name={iconName} size={24} color={colors.backgroundLight} />
            );
        }
        return stars;
    };
    
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.card} onPress={() => onPressGrid(item)}>
                <Image 
                    style={styles.image} 
                    source={require('../assets/Niveau.png')} 
                />
                <View style={styles.textView}>
                    <Text style={styles.text}>Niveau {item.level}</Text>
                    <View style={commonStyles.row}>
                        {renderStarIcons(item.score)}
                    </View>
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
        alignItems: 'center',
        justifyContent: 'center',
        margin: '2%',
        width: windowWidth * 0.46, 
        height: windowWidth * 0.40
    },
    image: {
        resizeMode: 'cover',
        height: '100%',
        width: '100%',
    },
    textView: {
        position: 'absolute',
        alignItems: 'center',
    },
    text: {
        color: colors.backgroundLight,
        fontSize: 28,
        fontWeight: 'bold',
    }
});
