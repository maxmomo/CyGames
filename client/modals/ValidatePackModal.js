import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, KeyboardAvoidingView, StyleSheet, Platform, Text } from 'react-native';

import ModalButton from '../components/ModalButton';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../constants/colors';
import { commonStyles } from '../styles/GlobalStyles';
import InfoPackModal from './InfoPackModal';

export default function ValidatePackModal({ 
    visible, 
    handleValidate, 
    handleCancel,
    price,
    pack,
    info,
    canAfford
}) {

    const [infoVisible, setInfoVisible] = useState(false);

    const toggleInfoModal = () => {
        setInfoVisible(!infoVisible);
    };

    const handleCancelModal = () => {
        setInfoVisible(false);
    };

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
                            {canAfford && <Text style={styles.text}>Voulez vous dépenser</Text>}
                            {!canAfford && <Text style={styles.text}>Le prix de ce pack est de</Text>}
                            <MaterialCommunityIcons name='cash' size={26} color={colors.theme} />
                            <Text style={styles.text}>{price && price.toLocaleString()}</Text>
                        </View>
                        <View style={styles.textView}>
                            {canAfford && <Text style={styles.text}>pour un {pack} ? </Text>}
                            {!canAfford && <Text style={styles.text}>Vous n'avez pas les crédits suffisants</Text>}
                            {canAfford && <TouchableOpacity onPress={toggleInfoModal}>
                                <MaterialCommunityIcons name="information-outline" size={20} color={colors.theme} style={styles.infoIcon} />
                            </TouchableOpacity>}
                        </View>
                        <View style={commonStyles.margin5Top}>
                            {canAfford && <ModalButton
                                text={'Valider'}
                                onPress={handleValidate}
                            />}
                            <ModalButton
                                text={'Annuler'}
                                onPress={handleCancel}
                            />
                        </View>
                    </View>
                </View>
                <InfoPackModal
                    visible={infoVisible}
                    handleCancel={handleCancelModal}
                    info={info} 
                />
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
