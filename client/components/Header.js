import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMyContext } from '../context/MyContext';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../constants/colors';

export default function Header({ showBackButton = true, onProfilePress }) {
    const navigation = useNavigation();
    const { state } = useMyContext();
    const { width, height } = Dimensions.get('window'); 

    const credit = state['user']['credit']

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

            {/* Crédits du joueur */}
            <View style={styles.creditSection}>
                <MaterialCommunityIcons name='cash' size={height * 0.04} color={colors.theme} />
                <Text style={styles.credtiText}>{credit.toLocaleString()}</Text>
            </View>

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
    creditSection: {
        marginTop: '5%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    credtiText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.theme
    }
});