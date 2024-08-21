import React, { useEffect, useState, useCallback } from 'react';
import { TouchableOpacity, FlatList, StyleSheet, Text, SafeAreaView, View, Image, Alert } from 'react-native';
import { useMyContext } from '../context/MyContext';
import { useNavigation } from '@react-navigation/native';
import { getUserRiders } from '../api/riders/api';
import { commonStyles } from '../styles/GlobalStyles';
import Header from '../components/Header';
import colors from '../constants/colors';

export default function CategoryCardsPage() {
    const { state, dispatch } = useMyContext();
    const navigation = useNavigation();

    const [riders, setRiders] = useState([]);
    const [bronze, setBronze] = useState(0);
    const [silver, setSilver] = useState(0);
    const [gold, setGold] = useState(0);
    const [userBronze, setUserBronze] = useState(0);
    const [userSilver, setUserSilver] = useState(0);
    const [userGold, setUserGold] = useState(0);

    const user_id = state['user']['id'];

    const getRidersEffect = useCallback(async () => {
        try {
            const data = await getUserRiders(state['ip_adress'], user_id);

            setRiders(data.slice(0, -3));
            
            setGold(data[data.length - 3]);
            setSilver(data[data.length - 2]);
            setBronze(data[data.length - 1]);
            
            const countGold = data.slice(0, -3).filter(rider => rider.category === 1).length;
            const countSilver = data.slice(0, -3).filter(rider => rider.category === 2).length;
            const countBronze = data.slice(0, -3).filter(rider => rider.category === 3).length;

            setUserGold(countGold);
            setUserSilver(countSilver);
            setUserBronze(countBronze);
            dispatch({ type: 'SET_USER_RIDERS', payload: data });

        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }
    }, [state['ip_adress'], user_id, dispatch]);

    useEffect(() => {
        getRidersEffect();
    }, [getRidersEffect]);

    const navigateToCards = (category) => {
        navigation.navigate('Cards', { category });
    };

    return (
        <SafeAreaView style={commonStyles.container}>
            <Header is_navigation={true} />
            <View style={styles.container}>
                <TouchableOpacity 
                    style={[styles.card, styles.gold]}
                    onPress={() => navigateToCards(1)}
                >
                    <Text style={styles.text}>{userGold} / {gold}</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.card, styles.silver]}
                    onPress={() => navigateToCards(2)}
                >
                    <Text style={styles.text}>{userSilver} / {silver}</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.card, styles.bronze]}
                    onPress={() => navigateToCards(3)}
                >
                    <Text style={styles.text}>{userBronze} / {bronze}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    card: {
        width: '90%',
        height: '30%',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
        opacity: 1,
    },
    text: {
        color: colors.background,
        fontWeight: 'bold',
        fontSize: 24,
    },
    gold: {
        backgroundColor: '#ccb557', // Jaune doré
        borderWidth: 2,
        borderColor: '#937829', // Teinte de bordure dorée
    },
    silver: {
        backgroundColor: '#bdbdbd', // Gris argenté
        borderWidth: 2,
        borderColor: '#878787', // Teinte de bordure argentée
    },
    bronze: {
        backgroundColor: '#d7a87e', // Brun bronze
        borderWidth: 2,
        borderColor: '#5e3819', // Teinte de bordure bronzea
    },
});
