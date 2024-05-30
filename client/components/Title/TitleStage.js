import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../constants/colors';

export default function TitleRace(props) {
    return (
        <View style={styles.titleView}>
            <Text style={styles.titleText}>{props.name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    titleView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: '2%',
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.whiteText
    },
});