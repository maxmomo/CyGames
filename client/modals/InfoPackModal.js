import React from 'react';
import { View, Modal, KeyboardAvoidingView, StyleSheet, Platform, Text } from 'react-native';

import ModalButton from '../components/ModalButton';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../constants/colors';
import { commonStyles } from '../styles/GlobalStyles';

export default function InfoPackModal({ 
    visible, 
    handleCancel,
    info,
}) {

    return (
        <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardAvoidingView}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <View style={styles.textView}>
                            <Text style={styles.text}>{info}</Text>
                        </View>
                        <View style={commonStyles.margin5Top}>
                            <ModalButton
                                text={'Fermer'}
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
        backgroundColor: colors.backgroundLight,
        width: '95%',
        borderRadius: 20,
        padding: '5%',
        alignItems: 'center',
    },
    textView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '3%'
    },  
    text: {
        fontSize: 16,
        color: colors.whiteText
    }
});
