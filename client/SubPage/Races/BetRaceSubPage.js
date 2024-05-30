import React, {useEffect, useState, useCallback} from 'react';
import { View, SafeAreaView, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMyContext } from '../../context/MyContext';

import Bets10List from '../../components/List/Bets10List';
import BetModal from '../../modals/BetModal';
import Bets3List from '../../components/List/Bets3List';

import { getBetsUserRace, setBetsUserRace } from '../../api/race/api';

import { commonStyles } from '../../styles/GlobalStyles';
import RaceBet from '../../components/RaceBet';

export default function BetRaceSubPage() {
    
    const { state, dispatch } = useMyContext();
    const navigation = useNavigation();

    const [bets, setBets] = useState([]);
    const [startlist, setStartlist] = useState([]);
    const [position, setPosition] = useState(0)
    const [riderId, setRiderId] = useState(0)
    const [betTypeId, setBetTypeId] = useState(0)
    const [isModalBetVisible, setIsModalBetVisible] = useState(false);

    const team = state['team']
    const year = state['year']
    const user_id = state['user']['id']
    const league_id = state['league']['id']
    const race_id = state['race']['race_id']
    
    useEffect(() => {
        if (isModalBetVisible === false) {
            getBetDataEffect();
        }
        setStartlist(state['startlist'])
    }, [getBetDataEffect, riderId, isModalBetVisible]);

    const getBetDataEffect = useCallback(async () => {
        try {
            const betsData = await getBetsUserRace(state['ip_adress'], race_id, user_id, league_id);
            setBets(betsData);

        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }

    }, [team, year, navigation]);

    const onPressCreateBet = async () => {
        try {
            await setBetsUserRace(state['ip_adress'], race_id, user_id, league_id, position, riderId, betTypeId);
            setIsModalBetVisible(false)
            
        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }
    };

    const toggleBetModal = () => {
        setIsModalBetVisible(!isModalBetVisible);
    };

    const onPressItem = (typeId) => {
        setIsModalBetVisible(!isModalBetVisible);
        setBetTypeId(typeId)
    };

    return (
        <SafeAreaView style={commonStyles.containerLight}>
            <RaceBet user_id={user_id} onPress={onPressItem} isModalBetVisible={isModalBetVisible} />
            <BetModal visible={isModalBetVisible} toggleModal={toggleBetModal} startlist={startlist} setPosition={setPosition} riderId={riderId} setRiderId={setRiderId} onPress={onPressCreateBet} betTypeId={betTypeId} />
        </SafeAreaView>
    );
}