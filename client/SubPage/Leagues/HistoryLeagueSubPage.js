import React, {useState, useEffect, useCallback}  from 'react';
import { View, SafeAreaView, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useMyContext } from '../../context/MyContext';

import { getRidersOfferHistory } from '../../api/mercato/api';

import { commonStyles } from '../../styles/GlobalStyles';
import HistoryList from '../../components/List/HistoryList';

export default function HistoryLeagueSubPage() {
    
    const { state, dispatch } = useMyContext();

    const [history, setHistory] = useState([]);

    const user_id = state['user']['id']
    const league_id = state['league']['id']

    useEffect(() => {
        getHistoryLeagueDataEffect();
    }, [getHistoryLeagueDataEffect]);

    useFocusEffect(
        useCallback(() => {
            getHistoryLeagueDataEffect();
        }, [])
    );

    const getHistoryLeagueDataEffect = useCallback(async () => {
        try {
            const historyData = await getRidersOfferHistory(state['ip_adress'], league_id);
            
            const turn1 = historyData.reduce((acc, offer) => {
                const { fullName, RiderId, nationality } = offer;
                if (!acc[RiderId]) {
                    acc[RiderId] = {
                        fullName,
                        nationality,
                        offers: [],
                    };
                }
                acc[RiderId].offers.push(offer);
                
                return acc;
            }, {});
            
            const turn1Sections = Object.keys(turn1).map(key => ({
                fullName: turn1[key].fullName,
                data: turn1[key].offers,
                nationality: turn1[key].nationality,
            }));
            
            setHistory(turn1Sections);

        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }

    }, [user_id, league_id]);
    
    return (
        <SafeAreaView style={commonStyles.containerLight}>
            <View style={[commonStyles.margin2Top, commonStyles.flex1]}>
                <HistoryList history={history}/>
            </View>
        </SafeAreaView>
    );
}