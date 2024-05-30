import React, {useState, useEffect, useCallback} from 'react';
import { View, SafeAreaView } from 'react-native';
import { useMyContext } from '../../context/MyContext';

import BasicSubtitle from '../../components/Basic/BasicSubtitle';
import SelectRace from '../../components/SelectRace';
import TeamResultList from '../../components/List/TeamResultList';

import { getStatistics } from '../../api/team/api';

import { commonStyles } from '../../styles/GlobalStyles';

export default function PerformanceTeamSubPage() {
    
    const { state, dispatch } = useMyContext();

    const [selectedRace, setSelectedRace] = useState();
    const [statistics, setStatistics] = useState([]);
    const [statisticsFiltered, setStatisticsFiltered] = useState([]);

    const team = state['team']

    useEffect(() => {
        getPerformanceTeamDataEffect();

        if (statistics[0]) {
            if (selectedRace === 'Giro') {
                setStatisticsFiltered(statistics[0].filter(item => item.race_name === 'Giro d\'Italia'))
            } else if (selectedRace === 'TDF') {
                setStatisticsFiltered(statistics[0].filter(item => item.race_name === 'Tour de France'))
            } else if (selectedRace === 'Vuelta') {
                setStatisticsFiltered(statistics[0].filter(item => item.race_name === 'La Vuelta ciclista a España'))
            }
        }

    }, [getPerformanceTeamDataEffect, selectedRace]);

    const getPerformanceTeamDataEffect = useCallback(async () => {
        try {
            const statisticsData = await getStatistics(state['ip_adress'], team.related_team_id);
            setStatistics(statisticsData)

        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }

    }, [team, selectedRace]);

    const setGiro = () => {
        setSelectedRace('Giro')
    }

    const setTDF = () => {
        setSelectedRace('TDF')
    }

    const setVuelta = () => {
        setSelectedRace('Vuelta')
    }

    return (
        <SafeAreaView style={commonStyles.containerLight}>
            <BasicSubtitle text={'VICTOIRES SUR GT'} />
            <View style={commonStyles.margin2Top}>
                <SelectRace selectedRace={selectedRace} setGiro={setGiro} setTDF={setTDF} setVuelta={setVuelta} />
            </View>
            <View style={[commonStyles.margin2Top, commonStyles.flex1]}>
                <TeamResultList statistics={statisticsFiltered} />
            </View>
        </SafeAreaView>
    );
}