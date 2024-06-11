// GridPage.js
import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, SafeAreaView, View, Modal, KeyboardAvoidingView, Platform } from 'react-native';
import { useMyContext } from '../context/MyContext';
import { commonStyles } from '../styles/GlobalStyles';
import Header from '../components/Header';
import colors from '../constants/colors';
import BasicTextInputModal from '../components/BasicTextInputModal';
import BasicButton from '../components/BasicButton';
import Grid from '../components/Grid';
import StarIcons from '../components/StarIcons';
import { setUserGridLines } from '../api/gridLine/api';

export default function GridPage() {
    const { state } = useMyContext();
    const grid = state['grid'];
    const user = state['user']
    const riders = state['riders'];

    const [modalVisible, setModalVisible] = useState(false);
    const [textInputValue, setTextInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedCell, setSelectedCell] = useState({ row: null, col: null, picture: null });
    const [selectedItem, setSelectedItem] = useState({});
    const [gridData, setGridData] = useState([[], [], []]);

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
            setSelectedItem(item);
            setTextInputValue('');
            setModalVisible(false);
        }
    };

    const handleCancel = () => {
        setTextInputValue('');
        setModalVisible(false);
    };

    const onPressSave = useCallback(async () => {
        try {
            await setUserGridLines(state['ip_adress'], user['id'], grid['id'], gridData);
        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }
    }, []);

    return (
        <SafeAreaView style={commonStyles.container}>
            <Header is_navigation={true} />
            <View style={[commonStyles.margin3Bottom, commonStyles.center, commonStyles.row]}>
                <Text style={[commonStyles.text24, commonStyles.bold]}>{'Niveau' + ' ' + grid['level'] + ' : '}</Text>
                <StarIcons score={grid['score']} />
            </View>
            <View style={[commonStyles.margin3Bottom, commonStyles.flex1]}>
                <Grid 
                    setModalVisible={setModalVisible} 
                    setSelectedCell={setSelectedCell} 
                    selectedCell={selectedCell}
                    gridData={gridData}
                    setGridData={setGridData}
                    selectedItem={selectedItem}
                />
            </View>
            <View style={[commonStyles.margin3Bottom]}>
                <BasicButton text={'Sauvegarder'} onPress={onPressSave} />
                <BasicButton text={'Valider'} onPress={() => setModalVisible(true)} />
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
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
                                <BasicButton
                                    text={'Valider'}
                                    onPress={handleValidate}
                                />
                                <BasicButton
                                    text={'Annuler'}
                                    onPress={handleCancel}
                                />
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: colors.whiteText,
        borderRadius: 30,
        width: '98%',
        padding: '10%',
        alignItems: 'center',
    },
    keyboardAvoidingView: {
        flex: 1,
    },
});
