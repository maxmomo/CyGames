import React, {useEffect, useState, useCallback}  from 'react';
import { View, SafeAreaView, Alert } from 'react-native';
import { useMyContext } from '../../context/MyContext';

import HistoryTeamList from '../../components/List/HistoryTeamList';

import { commonStyles } from '../../styles/GlobalStyles';
import { getHistory } from '../../api/team/api';

export default function HistoryTeamSubPage() {

    const { state, dispatch } = useMyContext();

    const [history, setHistory] = useState([]);
    const [refreshKey, setRefreshKey] = React.useState(0);

    const team = state['team']
    const year = state['year']

    useEffect(() => {
        getHistoryTeamDataEffect();
    }, [refreshKey, getHistoryTeamDataEffect]);

    const getHistoryTeamDataEffect = useCallback(async () => {
        try {
            const historyData = await getHistory(state['ip_adress'], team.related_team_id, year, team.year);
            setHistory(historyData);

        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }

    }, [team, year]);

    const handleRefresh = () => {
        setRefreshKey(prevKey => prevKey + 1);
    };

    return (
        <SafeAreaView style={commonStyles.containerLight}>
            <View style={[commonStyles.margin2Top, commonStyles.flex1]}>
                <HistoryTeamList history={history} onItemPress={handleRefresh} />
            </View>
        </SafeAreaView>
    );
}