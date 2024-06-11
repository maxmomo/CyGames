import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../constants/colors';

export default function BasicButton(props) {
    return (
        <TouchableOpacity 
            style={styles.button} 
            onPress={props.onPress}
        >
            <Text 
                style={styles.buttonText}
            >
                {props.text}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.theme,
        paddingVertical: '3%',
        paddingHorizontal: '10%',
        borderRadius: 10,
        margin: '2%',
        justifyContent: 'center'
    },
    buttonText: {
        color: colors.background,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});