import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../constants/colors';

export default function BasicSubtitleView(props) {
    return (
        <View style={styles.subtitleView}>
            <Text style={styles.subtitleText}>{props.text}</Text>
        </View>
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