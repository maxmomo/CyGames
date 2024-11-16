import React, { useRef, useEffect } from 'react';
import { View, Text, Modal, TextInput, KeyboardAvoidingView, StyleSheet, Platform } from 'react-native';
import ModalButton from '../components/ModalButton';
import colors from '../constants/colors';

export default function CrosswordInputModal({ 
    visible, 
    onClose, 
    definition, 
    wordCells, 
    onInputChange, 
    isHV, 
    direction, 
    handleDirectionChange 
}) {
    const inputRefs = useRef([]);

    useEffect(() => {
        if (visible && inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, [visible]);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardAvoidingView}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        {isHV && (
                            <View style={styles.directionButtons}>
                                <ModalButton
                                    text="Horizontal"
                                    onPress={() => handleDirectionChange('H')}
                                    opacity={direction === 'H' ? 1 : 0} 
                                />
                                <ModalButton
                                    text="Vertical"
                                    onPress={() => handleDirectionChange('V')}
                                    opacity={direction === 'V' ? 1 : 0} 
                                />
                            </View>
                        )}
                        <View style={styles.defContainer}>
                            <Text style={styles.text}>{definition}</Text>
                        </View>
                        <View style={styles.wordContainer}>
                            {wordCells.map((cell, index) => (
                                <TextInput
                                    key={index}
                                    ref={(ref) => (inputRefs.current[index] = ref)}
                                    style={styles.input}
                                    maxLength={1}
                                    value={cell.value}
                                    onChangeText={(text) => {
                                        onInputChange(text, index);
                                        if (text && inputRefs.current[index + 1]) {
                                            inputRefs.current[index + 1].focus();
                                        }
                                    }}
                                />
                            ))}
                        </View>

                        <View style={styles.buttonContainer}>
                            <ModalButton text="Fermer" onPress={onClose} />
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
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
        backgroundColor: colors.whiteText,
        width: '95%',
        borderRadius: 20,
        padding: '5%',
        alignItems: 'center',
    },
    defContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        color: colors.dark,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18
    },
    directionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    wordContainer: {
        flexDirection: 'row',
        marginTop: '10%',
        alignItems: 'center',
    },
    input: {
        width: '8%',
        height: '180%',
        marginHorizontal: '1%',
        borderWidth: 1,
        borderColor: colors.dark,
        textAlign: 'center',
        fontSize: 18,
        color: colors.dark,
    },
    buttonContainer: {
        marginTop: '10%',
        width: '100%',
        alignItems: 'center',
    },
});
