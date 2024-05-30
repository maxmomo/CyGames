import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Flag from 'react-native-flags';
import colors from '../../constants/colors';

export default function TitleTeam(props) {
    return (
        <View style={styles.titleView}>
            <Flag code={props.nationality} size={32} type={'flat'}/>
            <Text style={styles.titleText}>{props.name.toUpperCase()}</Text>
            <Text style={styles.titleText}>{props.year}</Text>
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
        marginLeft: '3%',
        fontSize: 22,
        fontWeight: 'bold',
        color: colors.whiteText
    },
});