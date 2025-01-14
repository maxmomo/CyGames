import React, { useEffect, useState, useCallback } from 'react';
import { TouchableOpacity, StyleSheet, Text, SafeAreaView, View, Alert } from 'react-native';
import { useMyContext } from '../context/MyContext';
import { useNavigation } from '@react-navigation/native';
import { getUserRidersCategory } from '../api/riders/api';
import { commonStyles } from '../styles/GlobalStyles';
import colors from '../constants/colors';

export default function CategoryCardsPage() {
    const { state, dispatch } = useMyContext();
    const navigation = useNavigation();
    
    const [bronze, setBronze] = useState(0);
    const [silver, setSilver] = useState(0);
    const [gold, setGold] = useState(0);
    const [special, setSpecial] = useState(0);
    const [userBronze, setUserBronze] = useState(0);
    const [userSilver, setUserSilver] = useState(0);
    const [userGold, setUserGold] = useState(0);
    const [userSpecial, setUserSpecial] = useState(0);

    const user_id = state['user']['id'];
    
    const getRidersEffect = useCallback(async () => {
        try {
            const data = await getUserRidersCategory(state['ip_adress'], user_id);
            
            setGold(data[data.length - 4]);
            setSilver(data[data.length - 3]);
            setBronze(data[data.length - 2]);
            setSpecial(data[data.length - 1]);
            
            const countGold = data.slice(0, -3).filter(rider => rider.category === 1 && rider.posseded == true).length;
            const countSilver = data.slice(0, -3).filter(rider => rider.category === 2 && rider.posseded == true).length;
            const countBronze = data.slice(0, -3).filter(rider => rider.category === 3 && rider.posseded == true).length;
            const countSpecial = data.slice(0, -3).filter(rider => rider.category === 4 && rider.posseded == true).length;

            setUserGold(countGold);
            setUserSilver(countSilver);
            setUserBronze(countBronze);
            setUserSpecial(countSpecial);
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
                <TouchableOpacity 
                    style={[styles.card, styles.special]}
                    onPress={() => navigateToCards(4)}
                >
                    <Text style={styles.text}>{userSpecial} / {special}</Text>
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
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flex:1,
        marginVertical: '2%',
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
    special: {
        backgroundColor: '#2a2525', // Brun bronze
        borderWidth: 2,
        borderColor: '#090505', // Teinte de bordure bronzea
    },
});