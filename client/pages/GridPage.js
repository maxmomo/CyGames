import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, View, Modal, KeyboardAvoidingView, Platform, Alert, FlatList, TouchableOpacity, Image } from 'react-native';
import { useMyContext } from '../context/MyContext';
import { commonStyles } from '../styles/GlobalStyles';
import Header from '../components/Header';
import colors from '../constants/colors';
import BasicTextInputModal from '../components/BasicTextInputModal';
import { BasicButton, BasicTextInput, LogoMain } from '../components';
import Grid from '../components/Grid';
import StarIcons from '../components/StarIcons';
import { checkUserGridLines, getUserGridLines, setUserGridLines } from '../api/gridLine/api';
import { retryGrids } from '../api/grid/api';
import GridSolution from '../components/GridSolution';
import ModalButton from '../components/ModalButton';
import { createUserRiders } from '../api/userRiders/api';
import Flag from 'react-native-flags';
import RiderCard from '../components/RiderCard';

export default function GridPage() {
    const { state, dispatch } = useMyContext();
    const grid = state['grid'];
    const user = state['user'];
    const riders = state['riders'];

    const [modal1Visible, setModal1Visible] = useState(false);
    const [modal2Visible, setModal2Visible] = useState(false);
    const [modal3Visible, setModal3Visible] = useState(false);
    const [textInputValue, setTextInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedCell, setSelectedCell] = useState({ row: null, col: null });
    const [gridData, setGridData] = useState([[], [], []]);
    const [solution, setSolution] = useState({});
    const [rewardRiders, setRewardRiders] = useState([]);

    useEffect(() => {
        getGridLinesEffect();
    }, [state]);

    const getGridLinesEffect = useCallback(async () => {
        try {
            const data = await getUserGridLines(state['ip_adress'], user['id'], grid['id']);
            setGridData(data);
        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }
    }, [state, user, grid]);

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
        setModal1Visible(false);
    };

    const handleReward = useCallback(async () => {
        setModal2Visible(false);
        const datas = await createUserRiders(state['ip_adress'], user['id'], 1);
        console.log(datas)
        setRewardRiders(datas);
        setModal3Visible(true);
    },[]);

    const handleCancel2 = () => {
        setModal3Visible(false);
    };

    const onPressSave = useCallback(async () => {
        try {
            await setUserGridLines(state['ip_adress'], user['id'], grid['id'], gridData);
        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }
    }, []);

    const onPressValidate = useCallback(async () => {
        try {
            await setUserGridLines(state['ip_adress'], user['id'], grid['id'], gridData);
            const res = await checkUserGridLines(state['ip_adress'], user['id'], grid['id'], gridData);
            setSolution(res);
            grid['score'] = res['score']
            grid['validated'] = true
            dispatch({ type: 'SET_GRID', payload: grid });
            setModal2Visible(true);
        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }
    }, [gridData]);

    const onPressRetry = useCallback(async () => {
        try {
            await retryGrids(state['ip_adress'], user['id'], grid['id']);
            const data = await getUserGridLines(state['ip_adress'], user['id'], grid['id']);
            setGridData(data);
            grid['validated'] = 0
            dispatch({ type: 'SET_GRID', payload: grid });
        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }
    }, []);

    return (
        <SafeAreaView style={commonStyles.container}>
            <Header is_navigation={true} />
            <View style={[commonStyles.margin3Bottom, commonStyles.center, commonStyles.row]}>
                <Text style={[commonStyles.text24, commonStyles.bold]}>{'Niveau ' + grid['level'] + ' : '}</Text>
                <StarIcons score={grid['score']} />
            </View>
            <View style={[commonStyles.margin3Bottom, commonStyles.flex3]}>
                <Grid 
                    setModal1Visible={setModal1Visible} 
                    setSelectedCell={setSelectedCell} 
                    gridData={gridData}
                    validated={grid['validated']}
                />
            </View>
            <View style={[commonStyles.margin3Bottom, commonStyles.flex1, commonStyles.center]}>
                {grid['validated'] === 0 && <BasicButton text={'Réinitialiser'} onPress={onPressSave} />}
                {grid['validated'] === 0 && <BasicButton text={'Sauvegarder'} onPress={onPressSave} />}
                {grid['validated'] === 0 && <BasicButton text={'Valider'} onPress={onPressValidate} />}
                {(grid['validated'] === true || grid['validated'] === 1) && <BasicButton text={'Recommencer'} onPress={onPressRetry} />}
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modal1Visible}
                onRequestClose={() => setModal1Visible(false)}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.keyboardAvoidingView}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalView}>
                            <BasicTextInputModal
                                value={textInputValue}
                                onChangeText={handleTextInputChange}
                                suggestions={suggestions}
                                showSuggestions={showSuggestions}
                                onSuggestionClick={handleSuggestionClick}
                            />
                            <View style={commonStyles.margin5Top}>
                                <ModalButton
                                    text={'Valider'}
                                    onPress={handleValidate}
                                />
                                <ModalButton
                                    text={'Annuler'}
                                    onPress={handleCancel}
                                />
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modal2Visible}
                onRequestClose={() => setModal2Visible(false)}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.keyboardAvoidingView}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalView}>
                            <View style={[commonStyles.margin3Bottom, commonStyles.center, commonStyles.row]}>
                                <Text style={[commonStyles.text24Inv, commonStyles.bold]}>{'Niveau ' + grid['level'] + ' : '}</Text>
                                <StarIcons score={grid['score']} />
                            </View>
                            <GridSolution gridData={gridData}/>
                            <View style={commonStyles.margin5Top}>
                                <ModalButton
                                    text={'Récompenses'}
                                    onPress={handleReward}
                                />
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modal3Visible}
                onRequestClose={() => setModal3Visible(false)}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.keyboardAvoidingView}
                >
                    <View style={styles.modalContainer}>
                        {rewardRiders.length != 0 && <View style={styles.modalView2}>
                            <View style={[commonStyles.row]}>
                                <RiderCard item={rewardRiders[0]} isDummy={false}/>
                                <RiderCard item={rewardRiders[1]} isDummy={false}/>
                                <RiderCard item={rewardRiders[2]} isDummy={false}/>
                            </View>
                            <View style={commonStyles.margin5Top}>
                                <ModalButton
                                    text={'Fermer'}
                                    onPress={handleCancel2}
                                />
                            </View>
                        </View>}
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    keyboardAvoidingView: {
        flex: 1,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        flex: 1,
        backgroundColor: colors.whiteText,
        borderRadius: 30,
        width: '98%',
        maxHeight: '80%', // Limiter la hauteur maximale du modal
        padding: '5%',
    },
    modalView2: {
        flex: 1,
        backgroundColor: colors.whiteText,
        borderRadius: 30,
        width: '98%',
        maxHeight: '40%', // Limiter la hauteur maximale du modal
        padding: '5%',
    },
    text: {
        color: colors.dark,
        fontWeight: 'bold',
    },
});