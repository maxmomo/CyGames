import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../constants/colors';
import { commonStyles } from '../../styles/GlobalStyles';

export default function TitleLeague(props) {
    return (
        <View style={styles.titleView}>
            <Text style={[commonStyles.bold, commonStyles.text24]}>{props.name.toUpperCase()}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    titleView: {
        marginHorizontal: '2%',
    },
});