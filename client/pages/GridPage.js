import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, SafeAreaView, View, Modal, KeyboardAvoidingView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useMyContext } from '../context/MyContext';
import Flag from 'react-native-flags';

import { commonStyles } from '../styles/GlobalStyles';
import Header from '../components/Basic/Header';
import colors from '../constants/colors';
import Logo from '../components/Basic/Logo';
import BasicTextInputModal from '../components/Basic/BasicTextInputModal';
import BasicButton from '../components/Basic/BasicButton';

export default function GridPage() {
    const { state } = useMyContext();
    const grid = state['grid'];

    const [modalVisible, setModalVisible] = useState(false);
    const [textInputValue, setTextInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const riders = state['riders']

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

    const renderStarIcons = (score) => {
        const stars = [];
        for (let i = 0; i < 3; i++) {
            const iconName = i < score ? 'star' : 'star-outline';
            stars.push(
                <MaterialCommunityIcons key={i} name={iconName} size={40} color={colors.theme} />
            );
        }
        return stars;
    };

    const renderHeaderCell = (Item) => {
        const element = 'e' + Item[1];
        const additional = 'a' + Item[1];
        const information = 'i' + Item[1];
        if (grid[element] === 'Nationality') {
            return <Flag code={grid[Item]} size={32} />;
        } else if (grid[element] === 'Race') {
            return <Logo race={grid[information]} additional={grid[additional]} />;
        }
        return (
            <View style={styles.cell}>
                <Text style={commonStyles.text13}>{grid[information]}</Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={commonStyles.container}>
            <Header is_navigation={true} />
            <View style={[commonStyles.margin3Bottom, commonStyles.center]}>
                <Text style={[commonStyles.text24, commonStyles.bold]}>{'Niveau' + ' ' + grid['level']}</Text>
            </View>
            <View style={[commonStyles.margin3Bottom, commonStyles.center, commonStyles.row]}>
                {renderStarIcons(grid['score'])}
            </View>
            <View style={styles.gridContainer}>
                <View style={styles.row}>
                    <View style={styles.emptyCell}></View>
                    {['i1', 'i2', 'i3'].map((colItem) => (
                        <View key={colItem} style={styles.headerCell}>
                            {renderHeaderCell(colItem)}
                        </View>
                    ))}
                </View>
                {['i4', 'i5', 'i6'].map((rowItem) => (
                    <View key={rowItem} style={styles.row}>
                        <View key={rowItem} style={styles.headerCell}>
                            {renderHeaderCell(rowItem)}
                        </View>
                        {['i1', 'i2', 'i3'].map((colItem) => (
                            <TouchableOpacity key={`${rowItem}-${colItem}`} style={styles.cell} onPress={() => setModalVisible(true)}>
    
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}
            </View>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Valider</Text>
            </TouchableOpacity>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardAvoidingView}
            >
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
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
                                <BasicButton text={'Valider'} onPress={() => setModalVisible(false)} />
                            </View>
                        </View>
                    </View>
                </Modal>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
    
    
}

const styles = StyleSheet.create({
    gridContainer: {
        flex: 1,
        marginHorizontal: '2%',
        marginTop: '3%'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'stretch',
    },
    cell: {
        flex: 1,
        borderWidth: 1,
        borderColor: colors.theme,
        justifyContent: 'center',
        alignItems: 'center',
        aspectRatio: 1, 
    },
    headerCell: {
        flex: 1,
        borderWidth: 1,
        borderColor: colors.theme,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.backgroundLight,
        aspectRatio: 1, 
    },
    emptyCell: {
        flex: 1,
        backgroundColor: colors.backgroundLight,
    },
    button: {
        backgroundColor: colors.theme,
        alignItems: 'center',
        padding: '2%',
        marginVertical: '5%', // Ajustez cette valeur selon vos besoins
        borderRadius: 30, // J'ai également changé le borderRadius pour correspondre à la conception du bouton
    },
    button: {
        backgroundColor: colors.theme,
        alignItems: 'center',
        padding: '2%',
        marginHorizontal: '10%', // Maintenez la marge horizontale
        borderRadius: 30, // Maintenez le borderRadius
        position: 'absolute', // Ajoutez cette ligne pour définir la position absolue
        bottom: '5%', // Ajoutez le décalage depuis le bas que vous souhaitez
        left: 0, // Centrez horizontalement le bouton dans son conteneur
        right: 0, // Centrez horizontalement le bouton dans son conteneur
    },    
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
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
    }
});
