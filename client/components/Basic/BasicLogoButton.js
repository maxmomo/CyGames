import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../../constants/colors';

export default function BasicLogoButton(props) {
    return (
        <TouchableOpacity 
            style={[styles.button, {backgroundColor: props.active ? colors.theme : colors.inactive}]} 
            onPress={props.onPress}
        >
            <MaterialCommunityIcons name={props.logo} size={24} color={colors.background} />  
            <Text style={styles.buttonText}>{props.text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: '3%',
        backgroundColor: colors.theme,
        marginBottom: '2%',
        marginHorizontal: '2%',
        borderRadius: 10,
    },
    buttonText: {
        color: colors.background,
        fontSize: 18,
        marginLeft: '1%',
        fontWeight: 'bold'
    },
});