import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../../constants/colors';

export default function BasicSubtitle(props) {
    return (
        <TouchableOpacity style={styles.subtitleView} onPress={props.onPress}>
            <Text style={styles.subtitleText}>{props.text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    subtitleView: {
        borderBottomWidth: 2,
        borderBottomColor: colors.theme,
        padding: '3%',
        width: '60%',
        marginBottom: '2%'
    },
    subtitleText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.theme
    },
});