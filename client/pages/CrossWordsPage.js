import { useEffect, useState, useCallback } from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import { useMyContext } from '../context/MyContext';
import { useNavigation } from '@react-navigation/native';

import GameCard from '../components/GameCard';

import { getAllCrossWords } from '../api/crossWord/api';

import { commonStyles } from '../styles/GlobalStyles';

export default function CrossWordsPage() {

    const { state, dispatch } = useMyContext();
    const navigation = useNavigation();

    const [crossWords, setCrossWords] = useState([]);

    const user_id = state['user']['id']

    useEffect(() => {
        getCrossWordsEffect();
    }, [getCrossWordsEffect]);

    const getCrossWordsEffect = useCallback(async () => {
        try {
            const data = await getAllCrossWords(state['ip_adress'], user_id);
            setCrossWords(data);
        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }
    }, []);

    const onPressCrossWord = (item) => {
        dispatch({ type: 'SET_CROSSWORD', payload: item });
        navigation.navigate('CrossWord');
    };
    
    const renderItem = ({ item }) => {
        return (
            <GameCard item={item} onPress={onPressCrossWord} />
        );
    };

    return (
        <SafeAreaView style={commonStyles.container}>
            <View>
                <FlatList
                    data={crossWords}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    );
}