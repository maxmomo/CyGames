import React, { useRef, useEffect } from 'react';
import { View, Text, Modal, TextInput, KeyboardAvoidingView, StyleSheet, Platform } from 'react-native';
import ModalButton from '../components/ModalButton';
import colors from '../constants/colors';
import BasicTextInputModal from '../components/BasicTextInputModal';
import { commonStyles } from '../styles/GlobalStyles';

export default function GridInputModal({ 
    visible, 
    onClose, 
    handleTextInputChange,
    textInputValue, 
    suggestions, 
    showSuggestions, 
    handleSuggestionClick, 
    handleValidate, 
    handleCancel 
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
                onRequestClose={() => onClose(1)}
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
    );
}

const styles = StyleSheet.create({
    keyboardAvoidingView: {
        flex: 1
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: colors.top,
        width: '95%',
        borderRadius: 20,
        padding: '5%',
        alignItems: 'center',
    },
});
