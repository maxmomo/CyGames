import React, { useState, useCallback, useEffect } from 'react';
import { View, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useMyContext } from '../../context/MyContext';

import { getRidersOffer } from '../../api/mercato/api';

import RidersOfferList from '../../components/List/RidersOfferList';

import { commonStyles } from '../../styles/GlobalStyles';
import colors from '../../constants/colors';

export default function OfferLeagueSubPage() {
    
    const navigation = useNavigation();
    const { state, dispatch } = useMyContext();

    const [ridersOffer, setRidersOffer] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [triggerRefresh, setTriggerRefresh] = useState(0);

    const user_id = state['user']['id']
    const league_id = state['league']['id']

    useFocusEffect(
        useCallback(() => {
            getOfferLeagueDataEffect();
        }, [])
    );

    useEffect(() => {
        getOfferLeagueDataEffect();
    }, [getOfferLeagueDataEffect, triggerRefresh]);

    const getOfferLeagueDataEffect = useCallback(async () => {
        setIsLoading(true);
        try {
            const offersData = await getRidersOffer(state['ip_adress'], user_id, league_id);
            setRidersOffer(offersData);

        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        } finally {
            setIsLoading(false);
        }

    }, [user_id, league_id, navigation]);

    const onPressDelete = async () => {
        setTriggerRefresh(prev => prev + 1);
    };
    
    return (
        <SafeAreaView style={commonStyles.containerLight}>
            {isLoading && <ActivityIndicator size="large" color={colors.theme} /> || <View style={commonStyles.margin5Top}> 
                <RidersOfferList offers={ridersOffer} state={state} user_id={user_id} league_id={league_id} onPressDelete={onPressDelete} />
            </View>}
        </SafeAreaView>
    );
}