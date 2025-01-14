import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMyContext } from '../context/MyContext';

import MenuCard from '../components/MenuCard';
import { commonStyles } from '../styles/GlobalStyles';
import { getAllExchanges } from '../api/exchange/api';
import InfoPackModal from '../modals/InfoPackModal';

export default function ExchangeChoosePage() {
    const navigation = useNavigation();
    const { state, dispatch } = useMyContext();

    const [exchanges, setExchanges] = useState([]);
    const [infoVisible, setInfoVisible] = useState(false);
    const [selectedExchange, setSelectedExchange] = useState(null);

    useEffect(() => {
        getExchangesEffect();
    }, [getExchangesEffect]);
    
    const toggleInfoModal = (item) => {
        setSelectedExchange(item); 
        setInfoVisible(!infoVisible);
    };

    const handleCancelInfo = () => {
        setInfoVisible(false);
        setSelectedExchange(null); 
    };

    const getExchangesEffect = useCallback(async () => {
        try {
            const data = await getAllExchanges(state['ip_adress'])
            setExchanges(data);
        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }
    }, []);

    const onPressExchange= (item) => {
        navigation.navigate('Exchange', {item});
    };

    const renderItem = ({ item, index }) => (
        <MenuCard 
            name={item.name} 
            onPress={() => onPressExchange(item)} 
            noMargin={true} 
            onInfoPress={() => toggleInfoModal(item)}
        />
    );

    return (
        <SafeAreaView style={commonStyles.container}>
            <FlatList
                data={exchanges} 
                renderItem={renderItem} 
                keyExtractor={(item) => item.id} 
                numColumns={2} 
            />
            <InfoPackModal 
                visible={infoVisible}
                handleCancel={handleCancelInfo}
                info={selectedExchange?.info}
            />
        </SafeAreaView>
    );
}