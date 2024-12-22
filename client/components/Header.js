import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../constants/colors';

export default function Header({ showBackButton = true, onProfilePress }) {
    const navigation = useNavigation();
    const { width, height } = Dimensions.get('window'); 

    return (
        <View style={[styles.container, {height: height * 0.13}]}>
            {/* Bouton de retour */}
            {showBackButton ? (
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.leftButtonSection}>
                    <MaterialCommunityIcons name='arrow-left-circle' size={height * 0.06} color={colors.theme} />
                </TouchableOpacity>
            ) : (
                <View style={styles.leftButtonSection} />
            )}

            {/* Bouton Profil */}
            <TouchableOpacity style={styles.rightButtonSection}>
                <MaterialCommunityIcons name='account' size={height * 0.06} color={colors.theme} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.top,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    leftButtonSection: {
        marginLeft: '5%',
        marginTop: '5%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    rightButtonSection: {
        marginRight: '5%',
        marginTop: '5%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 16,
        color: colors.whiteText,
    },
});