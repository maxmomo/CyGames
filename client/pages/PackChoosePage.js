import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMyContext } from '../context/MyContext';

import MenuCard from '../components/MenuCard';
import { commonStyles } from '../styles/GlobalStyles';

import ValidatePackModal from '../modals/ValidatePackModal';
import { buyPack, getAllPacks } from '../api/pack/api';
import InfoPackModal from '../modals/InfoPackModal';

export default function PackChoosePage() {
    const navigation = useNavigation();
    const { state, dispatch } = useMyContext();
    const user = state.user || {};
    
    const [packs, setPacks] = useState([]);
    const [canAfford, setCanAfford] = useState(true);
    const [selectedPack, setSelectedPack] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [infoVisible, setInfoVisible] = useState(false);
    
    useEffect(() => {
        getPacksEffect();
    }, [getPacksEffect]);
    
    const toggleInfoModal = (item) => {
        setSelectedPack(item); 
        setInfoVisible(!infoVisible);
    };

    const handleCancelInfo = () => {
        setInfoVisible(false);
        setSelectedPack(null); 
    };

    const getPacksEffect = useCallback(async () => {
        try {
            const data = await getAllPacks(state['ip_adress']);
            setPacks(data);
        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }
    }, []);

    const onPressPack = (item) => {
        setSelectedPack(item); 
        const isAffordable = user.credit >= item.price;
        setCanAfford(isAffordable);
        setModalVisible(true); 
    };

    const handleCancelModal = () => {
        setModalVisible(false);
        setSelectedPack(null); 
    };

    const handleValidateModal = async () => {
        try {
            setModalVisible(false);
            const datas = await buyPack(state.ip_adress, user.id, selectedPack.type, selectedPack.price);
            const newCredit = user.credit - selectedPack.price;
            dispatch({ type: 'SET_USER', payload: { ...user, credit: newCredit }});
            navigation.navigate('CardsReward', { datas: datas, from: 'pack' });
            setIsAwarded(true);
            setSelectedPack(null); 
        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }
    };

    const renderItem = ({ item }) => (
        <MenuCard 
            name={item.name} 
            onPress={() => onPressPack(item)} 
            noMargin={true} 
            price={item.price}
            onInfoPress={() => toggleInfoModal(item)}
        />
    );

    return (
        <SafeAreaView style={commonStyles.container}>
            <FlatList
                data={packs} 
                renderItem={renderItem} 
                keyExtractor={(item) => item.id} 
                numColumns={2} 
            />
            <ValidatePackModal
                visible={modalVisible}
                handleCancel={handleCancelModal}
                handleValidate={handleValidateModal}
                price={selectedPack?.price} 
                pack={selectedPack?.name} 
                info={selectedPack?.info}
                canAfford={canAfford}
            />
            <InfoPackModal 
                visible={infoVisible}
                handleCancel={handleCancelInfo}
                info={selectedPack?.info}
            />
        </SafeAreaView>
    );
}