import React, { useEffect , useState, useCallback } from 'react';
import { View, SafeAreaView, Text, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useMyContext } from '../../context/MyContext';

import { createOffer, getRidersOfferMercato } from '../../api/mercato/api';
import { getTotalUserLeague } from '../../api/league/api'

import CountDown from '../../components/Basic/Countdown';
import RidersOfferList from '../../components/List/RidersOfferList';
import BasicSearchBar from '../../components/Basic/BasicSearchBar';
import MakeOfferModal from '../../modals/MakeOfferModal';

import colors from '../../constants/colors';
import { commonStyles } from '../../styles/GlobalStyles';

export default function MercatoLeagueSubPage() {
    
    const navigation = useNavigation();
    const { state, dispatch } = useMyContext();

    const [ridersOfferMercato, setRidersOfferMercato] = useState([]);
    const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft());
    const [total, setTotal] = useState(false);
    const [searchQuery1, setSearchQuery1] = useState('');
    const [searchQuery2, setSearchQuery2] = useState('');
    const [searchQuery3, setSearchQuery3] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [offer, setOffer] = useState('');
    const [rider, setRider] = useState({});
    const [triggerRefresh, setTriggerRefresh] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const league = state['league']
    const user_id = state['user']['id']
    const league_id = state['league']['id']
    const year = state['year']

    filteredRidersOfferMercato = ridersOfferMercato

    if (searchQuery1 !== '') {
        filteredRidersOfferMercato = filteredRidersOfferMercato.filter(rider => (rider.cost <= searchQuery1))
    }
    if (searchQuery2 !== '') {
        filteredRidersOfferMercato = filteredRidersOfferMercato.filter(rider => (rider.team_name.toLowerCase().includes(searchQuery2.toLowerCase()) || rider.team_abbreviation.toLowerCase().includes(searchQuery2.toLowerCase())))
    }
    if (searchQuery3 !== '') {
        filteredRidersOfferMercato = filteredRidersOfferMercato.filter(rider => (rider.rider_name.toLowerCase().includes(searchQuery3.toLowerCase())))
    }

    useFocusEffect(
        useCallback(() => {
            const newTimeLeft = calculateTimeLeft();
            setTimeLeft(newTimeLeft);
            getMercatoeDataEffect();
        }, [])
    );

    useEffect(() => {
        if (!league) return;
    
        const timer = setInterval(() => {
            const newTimeLeft = calculateTimeLeft();
            setTimeLeft(newTimeLeft)
    
            if (newTimeLeft === 0) {
                clearInterval(timer);
            }
        }, 60000);

        getMercatoeDataEffect();
    
        return () => clearInterval(timer);
    }, [league, timeLeft, getMercatoeDataEffect, triggerRefresh]);

    function calculateTimeLeft() {
        if (!league) return 0

        const now = new Date();
        let mercatoEndDate = new Date();

        if (league['mercato_turns'] === 2) {
            mercatoEndDate = new Date(league['mercato_endDate1']);
        } else if (league['mercato_turns'] === 1) {
            mercatoEndDate = new Date(league['mercato_endDate2']);
        }
        const difference = mercatoEndDate - now;

        return difference > 0 ? difference : 0;
    }

    const isBeforeSpecifiedDate = () => {
        let mercatoEndDate = new Date();
        if (league['mercato_turns'] === 2) {
            mercatoEndDate = new Date(league['mercato_endDate1']);
        } else if (league['mercato_turns'] === 1) {
            mercatoEndDate = new Date(league['mercato_endDate2']);
        }
        const currentDate = new Date();
        return currentDate < mercatoEndDate;
    };

    const getMercatoeDataEffect = useCallback(async () => {
        setIsLoading(true);
        try {
            const mercatoData = await getRidersOfferMercato(state['ip_adress'], user_id, league_id, year);
            setRidersOfferMercato(mercatoData);

            const totalData = await getTotalUserLeague(state['ip_adress'], league_id, user_id);
            setTotal(totalData)

        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        } finally {
            setIsLoading(false);
        }

    }, [user_id, league_id, navigation]);

    const onPressValidate = async () => {
        setIsLoading(true);
        last_offer = rider['offer'] ? rider['offer'] : 0;
        last_offer_string = last_offer.toString();

        try {
            if (offer > total + last_offer) {
                Alert.alert('Erreur', 'Vous n\'avez plus le budget pour une telle offre.');
            } else if (offer < rider['cost']) {
                setOffer(parseInt(rider['cost']))
                Alert.alert('Erreur', 'Vous ne pouvez pas faire une offre inférieure au coût du coureur.')
            } else if (offer !== last_offer_string) {
                toggleModal();
                await createOffer(state['ip_adress'], user_id, league_id, offer, rider['rider_id']);
                setTriggerRefresh(prev => prev + 1);
            } else {
                toggleModal();
            }

        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        } finally {
            setIsLoading(false);
        }
    };

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };
    
    return (
        <SafeAreaView style={commonStyles.containerLight}>
            <View style={commonStyles.flex2}>
                <View style={commonStyles.margin5Top}> 
                    <CountDown timeLeft={timeLeft} />
                </View>
                { total && <View style={[commonStyles.margin2Top, commonStyles.margin2Left]}>
                    <Text style={commonStyles.text16}>Budget restant : {total} M</Text>
                </View> || <View style={[commonStyles.margin2Top, commonStyles.margin2Left]}>
                    <Text style={commonStyles.text16}>Budget restant : 0M</Text>
                </View> }
                <View style={commonStyles.margin2Top}>
                    <BasicSearchBar placeholder={'Rechercher un coureur...'} value={searchQuery3} onChangeText={setSearchQuery3} />
                </View>
                <View style={commonStyles.margin2Top}>
                    <BasicSearchBar placeholder={'Rechercher une équipe...'} value={searchQuery2} onChangeText={setSearchQuery2} />
                </View>
                <View style={commonStyles.margin2Top}>
                    <BasicSearchBar placeholder={'Coût inférieur à ...'} value={searchQuery1} onChangeText={setSearchQuery1} />
                </View>
            </View>
            {isLoading && <ActivityIndicator size="large" color={colors.theme} /> || <View style={commonStyles.flex3}>
                <RidersOfferList mercato={true} offers={filteredRidersOfferMercato} rider={rider} setRider={setRider} toggleModal={toggleModal} offer={offer} setOffer={setOffer} />
            </View>} 
            <MakeOfferModal visible={isModalVisible} rider={rider} toggleModal={toggleModal} onPressValidate={onPressValidate} offer={offer} setOffer={setOffer} />
        </SafeAreaView>
    );
}