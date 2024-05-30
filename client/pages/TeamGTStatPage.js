import React, {useEffect, useState, useCallback} from 'react';
import { View, SafeAreaView, FlatList, Alert, ActivityIndicator } from 'react-native';
import { useMyContext } from '../context/MyContext';

import Header from '../components/Basic/Header';
import BestRidersList from '../components/List/BestRidersList';
import BestRidersChart from '../components/Chart/BestRidersChart';
import TitleTeam from '../components/Title/TitleTeam';
import RaceLogo from '../components/Basic/RaceLogo';
import BasicSubtitle from '../components/Basic/BasicSubtitle';

import colors from '../constants/colors';
import { commonStyles } from '../styles/GlobalStyles';

import { getStatisticsRace } from '../api/statistic/api';

const logo_vuelta = require('../assets/logo-vuelta.png');
const logo_tdf = require('../assets/logo-tdf.png');
const logo_giro = require('../assets/logo-giro.png');

export default function TeamGTStatPage({ route, navigation }) {
    
    const { state, dispatch } = useMyContext();

    const [statistics, setStatistics] = useState({
        statistics_best_result: [],
        statistics_best_result_evolution: [],
        statistics_best_point: [],
        statistics_best_point_evolution: [],
        statistics_best_montain: [],
        statistics_best_montain_evolution: [],
        statistics_best_young: [],
        statistics_best_young_evolution: []
    })
    const [logo, setLogo] = useState('')
    const [visibility, setVisibility] = useState({
        isGCVisible: true,
        isPointVisible: true,
        isMontainVisible: true,
        isYoungVisible: true
    });
    const [isLoading, setIsLoading] = useState(true);

    const VISIBILITY_KEYS = {
        GC: 'isGCVisible',
        POINT: 'isPointVisible',
        MONTAIN: 'isMontainVisible',
        YOUNG: 'isYoungVisible'
    };
    
    const team = state['team']
    const selectedRace = state['raceStatistic']
    
    useEffect(() => {
        if (selectedRace === 'Giro') {
            getStatisticsDataEffect(1039);
            setLogo(logo_giro);
        } else if (selectedRace === 'Tour de France') {
            getStatisticsDataEffect(1049);
            setLogo(logo_tdf);
        } else if (selectedRace === 'Vuelta') {
            getStatisticsDataEffect(1051);
            setLogo(logo_vuelta);
        }
    }, []);

    const getStatisticsDataEffect = useCallback(async (pcs_id) => {
        setIsLoading(true);
        try {
            const statisticsData = await getStatisticsRace(state['ip_adress'], team.related_team_id, pcs_id);
            setStatistics(statisticsData);
        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        } finally {
            setIsLoading(false);
        }

    }, [team, navigation]);

    const toggleVisibility = (key) => {
        setVisibility(prevVisibility => ({
            ...prevVisibility,
            [key]: !prevVisibility[key]
        }));
    };

    const Element = ({ toggle_key, statistics, statistics_evolution, isVisible, text }) => (
        <>
            <BasicSubtitle text={text} onPress={() => toggleVisibility(toggle_key)} />
            {isVisible && (
                <View>
                    <View style={commonStyles.margin2Top}>
                        <BestRidersList statistics={statistics} />
                    </View>
                    <View style={commonStyles.margin2Top}>
                        <BestRidersChart statistics={statistics_evolution} />
                    </View>
                </View>
            )}
        </>
    );    
 
    return (
        <SafeAreaView style={commonStyles.container}>
            <Header is_navigation={true} />
            <View style={commonStyles.margin2Top}>
                <TitleTeam nationality={team['nationality']} name={team['name']} />
            </View>
            <View style={[commonStyles.margin2Top, commonStyles.center]}>
                <RaceLogo source={logo} height={100} width={100} />
            </View>
            <View style={[commonStyles.margin2Top, commonStyles.flex1]}>
                {isLoading === false && <FlatList
                    ListHeaderComponent={
                        <>
                            <Element text={'Meilleur classement général'} toggle_key={VISIBILITY_KEYS.GC} statistics={statistics['statistics_best_result']} statistics_evolution={statistics['statistics_best_result_evolution']} isVisible={visibility.isGCVisible}/>
                            <Element text={'Meilleur classement par point'} toggle_key={VISIBILITY_KEYS.POINT} statistics={statistics['statistics_best_point']} statistics_evolution={statistics['statistics_best_point_evolution']} isVisible={visibility.isPointVisible}/>
                            <Element text={'Meilleur classement montagne'} toggle_key={VISIBILITY_KEYS.MONTAIN} statistics={statistics['statistics_best_montain']} statistics_evolution={statistics['statistics_best_montain_evolution']} isVisible={visibility.isMontainVisible}/>
                            <Element text={'Meilleur classement jeune'} toggle_key={VISIBILITY_KEYS.YOUNG} statistics={statistics['statistics_best_young']} statistics_evolution={statistics['statistics_best_young_evolution']} isVisible={visibility.isYoungVisible}/>
                        </>
                    }
                /> || <ActivityIndicator size="large" color={colors.theme} />}
            </View>
        </SafeAreaView>
    );
}