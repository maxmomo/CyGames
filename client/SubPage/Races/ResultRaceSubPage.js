import React, {useEffect, useState, useCallback} from 'react';
import { View, SafeAreaView, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMyContext } from '../../context/MyContext';

import Results10List from '../../components/List/Results10List';
import Results3List from '../../components/List/Results3List';

import { getResultsRace } from '../../api/race/api';

import { commonStyles } from '../../styles/GlobalStyles';

export default function ResultRaceSubPage() {
    
    const { state, dispatch } = useMyContext();
    const navigation = useNavigation();

    const [results, setResults] = useState([]);
    const [riderId, setRiderId] = useState(0)
    const [isModalBetVisible, setIsModalBetVisible] = useState(false);

    const team = state['team']
    const year = state['year']
    const user_id = state['user']['id']
    const league_id = state['league']['id']
    const race_id = state['race']['race_id']
    const odr = state['race']['odr']

    useEffect(() => {
        getResultsDataEffect();

    }, [getResultsDataEffect]);

    const getResultsDataEffect = useCallback(async () => {
        try {
            const resultsData = await getResultsRace(state['ip_adress'], race_id, user_id, league_id);
            setResults(resultsData);

        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }

    }, [team, year, navigation]);

    return (
        <SafeAreaView style={commonStyles.containerLight}>
            <ScrollView style={commonStyles.margin2Top}>
                <View style={[commonStyles.flex3]}>
                    <Results10List results={results} betTypeId={8} />
                </View>
                {odr === '0' && <View style={[commonStyles.flex2, commonStyles.row]}>
                    <View style={[commonStyles.flex1]}>
                        <Results3List type={'Points'} results={results} resultTypeId={2} />
                    </View>
                    <View style={[commonStyles.flex1]}>
                        <Results3List type={'Montagne'} results={results} resultTypeId={3} />
                    </View>
                </View>}
                {odr === '0' && <View style={[commonStyles.flex2, commonStyles.row]}>
                    <View style={[commonStyles.flex1]}>
                        <Results3List type={'Jeune'} results={results} resultTypeId={4} />
                    </View>
                    <View style={[commonStyles.flex1]}>
                    </View>
                </View>}
            </ScrollView>
        </SafeAreaView>
    );
}