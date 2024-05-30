import React, {useEffect, useState, useCallback}  from 'react';
import { View, SafeAreaView, Alert } from 'react-native';
import { useMyContext } from '../../context/MyContext';

import RidersList from '../../components/List/RidersList';

import { getRiders } from '../../api/team/api';

import { commonStyles } from '../../styles/GlobalStyles';

export default function RidersTeamSubPage() {

    const { state, dispatch } = useMyContext();

    const [riders, setRiders] = useState([]);

    const team = state['team']

    useEffect(() => {
        getRidersTeamDataEffect();
    }, [getRidersTeamDataEffect]);

    const getRidersTeamDataEffect = useCallback(async () => {
        try {
            const ridersData = await getRiders(state['ip_adress'], team.id);
            setRiders(ridersData);

        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }

    }, [team]);

    return (
        <SafeAreaView style={commonStyles.containerLight}>
            <View style={[commonStyles.margin2Top, commonStyles.flex1]}>
                <RidersList riders={riders} />
            </View>
        </SafeAreaView>
    );
}