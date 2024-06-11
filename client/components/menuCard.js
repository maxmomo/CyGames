import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { commonStyles } from '../styles/GlobalStyles';
import colors from '../constants/colors';


export default function MenuCard(props) {

    return (
        <TouchableOpacity style={styles.card} onPress={props.onPress}>
            <Text style={commonStyles.text24}>{props.name}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        borderWidth: 2,
        borderColor: colors.theme,
        margin: '10%',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
});