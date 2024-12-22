import React, { useState, useCallback, useEffect } from 'react';
import { Text, SafeAreaView, View, Alert } from 'react-native';
import { useMyContext } from '../context/MyContext';
import { useNavigation } from '@react-navigation/native';

import Header from '../components/Header';
import { BasicButton } from '../components';
import Grid from '../components/Grid';
import StarIcons from '../components/StarIcons';

import GridInputModal from '../modals/GridInputModal';

import { checkUserGridLines, getUserGridLines, setUserGridLines } from '../api/gridLine/api';
import { retryGrids, awardGrids } from '../api/grid/api';
import { createUserRiders } from '../api/userRiders/api';

import { commonStyles } from '../styles/GlobalStyles';


export default function GridPage() {
    const { state, dispatch } = useMyContext();
    const navigation = useNavigation();

    const grid = state.grid || {};
    const user = state.user || {};
    const riders = state.riders || [];

    const [modal1Visible, setModal1Visible] = useState(false);
    const [textInputValue, setTextInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedCell, setSelectedCell] = useState({ row: null, col: null });
    const [gridData, setGridData] = useState([[], [], []]);

    const isValidated = grid.validated === true || grid.validated === 1;
    const isAwarded = grid.awarded === true || grid.awarded === 1;

    useEffect(() => {
        getGridLinesEffect();
    }, [state.grid]);

    const getGridLinesEffect = useCallback(async () => {
        try {
            const data = await getUserGridLines(state.ip_adress, user.id, grid.id);
            setGridData(data);
        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }
    }, [state.ip_adress, user.id, grid.id]);

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
            const updatedItem = { ...item, row: selectedCell.row, col: selectedCell.col };
            setGridData(prevGridData => {
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
        if (!isAwarded) {
            try {
                const datas = await awardGrids(state.ip_adress, user.id, grid.id, grid.score);
                const updatedGrid = { ...grid, awarded: 1 };
                dispatch({ type: 'SET_GRID', payload: updatedGrid });
                navigation.navigate('CardsReward', { datas });
            } catch (error) {
                Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
            }
        }
    };

    const onPressValidate = useCallback(async () => {
        try {
            await setUserGridLines(state.ip_adress, user.id, grid.id, gridData);
            const res = await checkUserGridLines(state.ip_adress, user.id, grid.id, gridData);
            const updatedGrid = { ...grid, score: res.score, validated: true };
            dispatch({ type: 'SET_GRID', payload: updatedGrid });
        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }
    }, [gridData]);

    const onPressRetry = useCallback(async () => {
        try {
            await retryGrids(state.ip_adress, user.id, grid.id);
            const data = await getUserGridLines(state.ip_adress, user.id, grid.id);
            setGridData(data);
            const updatedGrid = { ...grid, validated: 0 };
            dispatch({ type: 'SET_GRID', payload: updatedGrid });
        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }
    }, []);

    return (
        <SafeAreaView style={commonStyles.container}>
            <Header is_navigation={true} />
            <View style={[commonStyles.center, commonStyles.row, { flex: 1 }]}>
                <Text style={[commonStyles.text24, commonStyles.bold]}>{`Niveau ${grid.level || ''} :`}</Text>
                <StarIcons score={grid.score || 0} />
            </View>
            <View style={{ flex: 6 }}>
                <Grid
                    setModal1Visible={setModal1Visible}
                    setSelectedCell={setSelectedCell}
                    gridData={gridData}
                    validated={!!grid.validated}
                />
            </View>
            <View style={[commonStyles.center, { flex: 2 }]}>
                {!isValidated && <BasicButton text="Valider" onPress={onPressValidate} />}
                {isValidated && isAwarded && <BasicButton text="Recommencer" onPress={onPressRetry} />}
                {isValidated && !isAwarded && <BasicButton text="Récompenses" onPress={handleReward} />}
            </View>
            <GridInputModal
                visible={modal1Visible}
                onClose={setModal1Visible}
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