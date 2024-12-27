import React, { useState, useCallback, useEffect } from 'react';
import { Text, SafeAreaView, View, Alert } from 'react-native';
import { useMyContext } from '../context/MyContext';
import { useNavigation } from '@react-navigation/native';

import { BasicButton } from '../components';
import Grid from '../components/Grid';
import StarIcons from '../components/StarIcons';

import GridInputModal from '../modals/GridInputModal';

import { checkUserGridLines, getUserGridLines, setUserGridLines } from '../api/gridLine/api';
import { retryGrids, awardGrids, getGrid } from '../api/grid/api';

import { commonStyles } from '../styles/GlobalStyles';

export default function GridPage({ route }) {
    const { state } = useMyContext();
    const navigation = useNavigation();
    const { grid_id } = route.params;

    const user = state.user || {};
    const riders = state.riders || [];

    const [modal1Visible, setModal1Visible] = useState(false);
    const [textInputValue, setTextInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedCell, setSelectedCell] = useState({ row: null, col: null });
    const [gridDataLines, setGridDataLines] = useState([]);
    const [gridData, setGridData] = useState(null);
    const [gridKey, setGridKey] = useState(0);
    const [isValidated, setIsValidated] = useState(false);
    const [isAwarded, setIsAwarded] = useState(false);

    useEffect(() => {
        getGridEffect();
        getGridLinesEffect();
    }, [onPressValidate, onPressRetry]);

    const getGridLinesEffect = useCallback(async () => {
        try {
            const data = await getUserGridLines(state.ip_adress, user.id, grid_id);
            setGridDataLines(data || []);
        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }
    }, [state.ip_adress, user.id, grid_id]);

    const getGridEffect = useCallback(async () => {
        try {
            const data = await getGrid(state.ip_adress, grid_id, user.id);
            setGridData(data || { level: 'N/A', score: 0 });
            setIsValidated(data?.validated === true || data?.validated === 1);
            setIsAwarded(data?.awarded === true || data?.awarded === 1);
        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }
    }, [state.ip_adress, user.id, grid_id]);

    const handleTextInputChange = (text) => {
        setTextInputValue(text);
        if (text.length >= 3) {
            const filteredSuggestions = riders.filter(item =>
                item.name.toLowerCase().includes(text.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setTextInputValue(suggestion);
        setSuggestions([]);
        setShowSuggestions(false);
    };

    const handleValidate = () => {
        const item = riders.find(item => item.name === textInputValue);
        if (item && selectedCell.row !== null && selectedCell.col !== null) {
            const updatedItem = { ...item, row: selectedCell.row, col: selectedCell.col, rider_id: item.id };
            setGridDataLines(prevGridData => {
                const updatedGridData = [...prevGridData];
                updatedGridData[selectedCell.row][selectedCell.col] = updatedItem;
                return updatedGridData;
            });
            setTextInputValue('');
            setModal1Visible(false);
        }
    };

    const handleCancel = () => {
        setTextInputValue('');
        setSuggestions([]);
        setModal1Visible(false);
    };

    const handleReward = async () => {
        if (isValidated) {
            try {
                const datas = await awardGrids(state.ip_adress, user.id, grid_id, gridData.score);
                navigation.navigate('CardsReward', { datas: datas });
                setIsAwarded(true);
            } catch (error) {
                console.error('Error rewarding grid:', error);
                Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
            }
        }
    };

    const onPressValidate = useCallback(async () => {
        try {
            await setUserGridLines(state.ip_adress, user.id, grid_id, gridDataLines);
            await checkUserGridLines(state.ip_adress, user.id, grid_id, gridDataLines);
            const updatedGridLines = await getUserGridLines(state.ip_adress, user.id, grid_id);
            setGridDataLines(updatedGridLines || []);
            const data = await getGrid(state.ip_adress, grid_id, user.id);
            setGridData(data || { level: 'N/A', score: 0 });
            setIsValidated(true);
        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }
    }, [gridDataLines]);

    const onPressRetry = useCallback(async () => {
        try {
            await retryGrids(state.ip_adress, user.id, grid_id);
            const updatedGridLines = await getUserGridLines(state.ip_adress, user.id, grid_id);
            setGridDataLines(updatedGridLines || []);
            setIsValidated(false);
        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }
    }, []);

    return (
        <SafeAreaView style={commonStyles.container}>
            {gridData && gridDataLines && (
                <View style={[commonStyles.center, commonStyles.row, { flex: 1 }]}>
                    <Text style={[commonStyles.text24, commonStyles.bold]}>
                        {`Niveau ${gridData?.level ?? 'Indéfini'} :`}
                    </Text>
                    <StarIcons score={gridData?.score || 0} />
                </View>
            )}
            <View style={{ flex: 6 }}>
                <Grid
                    setModal1Visible={setModal1Visible}
                    setSelectedCell={setSelectedCell}
                    gridDataLines={gridDataLines}
                    validated={isValidated}
                    awarded={isAwarded}
                    gridData={gridData}
                    key={gridKey}
                />
            </View>
            <View style={[commonStyles.center, { flex: 2 }]}>
                {!isValidated && <BasicButton text="Valider" onPress={onPressValidate} />}
                {isValidated && isAwarded && <BasicButton text="Recommencer" onPress={onPressRetry} />}
                {isValidated && !isAwarded && <BasicButton text="Récompenses" onPress={handleReward} />}
            </View>
            <GridInputModal
                visible={modal1Visible}
                onClose={() => setModal1Visible(false)}
                textInputValue={textInputValue}
                handleTextInputChange={handleTextInputChange}
                suggestions={suggestions}
                showSuggestions={showSuggestions}
                handleSuggestionClick={handleSuggestionClick}
                handleValidate={handleValidate}
                handleCancel={handleCancel}
            />
        </SafeAreaView>
    );
}