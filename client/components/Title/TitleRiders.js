import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Flag from 'react-native-flags';
import colors from '../../constants/colors';

export default function TitleRider(props) {
    return (
        <View style={styles.titleView}>
            <Flag code={props.nationality} size={24} type={'flat'}/>
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
        marginLeft: '2%',
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.whiteText
    },
});