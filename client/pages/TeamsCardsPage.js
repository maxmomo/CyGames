import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, SafeAreaView, FlatList, Alert } from 'react-native';
import { useMyContext } from '../context/MyContext';
import { useNavigation } from '@react-navigation/native';
import { getUserRidersTeam } from '../api/riders/api';
import { commonStyles } from '../styles/GlobalStyles';
import colors from '../constants/colors';
import MenuCard from '../components/MenuCard';

export default function TeamsCardsPage() {
    const { state, dispatch } = useMyContext();
    const navigation = useNavigation();

    const [teamStats, setTeamStats] = useState([]);

    const user_id = state['user']['id'];
    
    const getRidersEffect = useCallback(async () => {
        try {
            const data = await getUserRidersTeam(state['ip_adress'], user_id);
            const teams = data.slice(-23).map(teamStat => ({
                id: teamStat.team_id,
                name: teamStat.name,
                count: teamStat.count,
            }));

            setTeamStats(teams);
            
            const ridersData = data.slice(0, -18); 
            dispatch({ type: 'SET_USER_RIDERS', payload: ridersData });

        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }
    }, [state['ip_adress'], user_id, dispatch]);

    useEffect(() => {
        getRidersEffect();
    }, [getRidersEffect]);

    const navigateToCards = (team) => {
        navigation.navigate('Cards', { team });
    };

    const renderItem = ({ item }) => (
        <MenuCard name={item.name} onPress={() => navigateToCards(item.id)} full={true} />
    );

    return (
        <SafeAreaView style={commonStyles.container}>
            <FlatList
                data={teamStats}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    listContent: {
        paddingVertical: 10,
    },
    card: {
        width: '90%',
        height: '30%',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: colors.background,
        fontWeight: 'bold',
        fontSize: 18, 
    },
});
