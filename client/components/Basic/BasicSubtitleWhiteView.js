import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../constants/colors';

export default function BasicSubtitleWhiteView(props) {
    return (
        <View style={styles.subtitleView}>
            <Text style={styles.subtitleText}>{props.text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    subtitleView: {
        borderBottomWidth: 2,
        borderBottomColor: colors.whiteText,
        padding: '3%',
        width: '60%',
        marginBottom: '2%'
    },
    subtitleText: {
        fontSize: 18,
        color: colors.whiteText
    },
});