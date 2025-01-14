import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { useMyContext } from '../context/MyContext';
import { useNavigation } from '@react-navigation/native';

import { commonStyles } from '../styles/GlobalStyles';
import colors from '../constants/colors';
import { getExchangeRiders } from '../api/riders/api';
import RiderCard from '../components/RiderCard';
import { BasicButton } from '../components';
import { exchangeUserRiders } from '../api/userRiders/api';

const { width, height } = Dimensions.get('window');

export default function ExchangePage({ route }) {
    const navigation = useNavigation();
    const { state } = useMyContext();
    const { item } = route.params;

    const user = state.user || {};

    const [selectedRiders, setSelectedRiders] = useState([null, null, null, null]); 
    const [riders, setRiders] = useState([]); 
    const [availableRiders, setAvailableRiders] = useState([]); 

    useEffect(() => {
        getRidersEffect();
    }, []);

    useEffect(() => {
        const filteredRiders = riders.filter(
            (rider) => !selectedRiders.some((selected) => selected && selected.id === rider.id)
        );
        setAvailableRiders(filteredRiders);
    }, [selectedRiders, riders]);

    const getRidersEffect = useCallback(async () => {
        try {
            const data = await getExchangeRiders(state.ip_adress, user.id, item);
            setRiders(data && data[0] || []);
        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }
    }, [state.ip_adress, user.id, item]);

    const handleSelectRider = (index) => {
        navigation.navigate('ExchangeRiderSelection', {
            riders: availableRiders, 
            onSelect: (rider) => {
                const updatedSelection = [...selectedRiders];
                updatedSelection[index] = rider;
                setSelectedRiders(updatedSelection);
            },
        });
    };

    const handleRemoveRider = (index) => {
        const updatedSelection = [...selectedRiders];
        updatedSelection[index] = null; 
        setSelectedRiders(updatedSelection);
    };

    const handleValidate  = useCallback(async () => {
        const datas = await exchangeUserRiders(state.ip_adress, user.id, item, selectedRiders)
        navigation.navigate('CardsReward', { datas: datas, from: 'exchange' });
    }, [selectedRiders]);

    const areAllRidersSelected = selectedRiders.every((rider) => rider !== null);

    return (
        <SafeAreaView style={commonStyles.container}>
            {!areAllRidersSelected && <View style={styles.box}>
                <Text style={styles.instructions}>{item.info}</Text>
            </View>}
            <View style={styles.gridContainer}>
                {selectedRiders.map((rider, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.zone]}
                        onPress={() => handleSelectRider(index)}
                        onLongPress={() => handleRemoveRider(index)}
                    >
                        {rider ? (
                            <View style={styles.riderCardContainer}>
                                <RiderCard item={rider} small={true} />
                            </View>
                        ) : (
                            <Text style={styles.zoneText}>Sélectionner un coureur</Text>
                        )}
                    </TouchableOpacity>
                ))}
            </View>
            {areAllRidersSelected && (
                <View style={styles.buttonContainer}>
                    <BasicButton text="Valider" onPress={handleValidate} />
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    instructions: {
        fontSize: 18,
        fontWeight: '500',
        color: colors.black,
        textAlign: 'center',
    },
    box: {
        backgroundColor: colors.card,
        borderRadius: 10,
        padding: '5%',
        marginHorizontal: '3%',
        marginTop: '2%',
    },
    gridContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: '2%' 
    },
    zone: {
        width: width * 0.47,
        height: height * 0.35,
        borderRadius: 20,
        backgroundColor: colors.whiteText,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '2%'
    },
    zoneText: {
        fontSize: 16,
        color: colors.black,
        textAlign: 'center',
    },
    riderCardContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        marginHorizontal: '1%'
    },
    buttonContainer: {
        paddingHorizontal: '10%',
        paddingVertical: '5%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});