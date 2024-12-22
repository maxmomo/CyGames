import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useMyContext } from '../context/MyContext';
import Flag from 'react-native-flags';
import GridIcon from './GridIcon';
import colors from '../constants/colors';
import { commonStyles } from '../styles/GlobalStyles';

const HeaderCell = ({ item }) => {
    const { state } = useMyContext();
    const grid = state['grid'];
    const element = 'e' + item[1];
    const additional = 'a' + item[1];
    const information = 'i' + item[1];

    if (grid[element] === 'Nationality') {
        return (
            <View style={styles.cell}>
                <Flag code={grid[item]} size={32} />
            </View>
        );
    } else if (grid[element] === 'Race') {
        return (
            <View style={styles.cell}>
                <GridIcon race={grid[information]} additional={grid[additional]} />
            </View>
        );
    }
    return (
        <View style={styles.cell}>
            <Text style={commonStyles.text13}>{grid[information]}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    cell: {
        flex: 1,
        borderWidth: 1,
        borderColor: colors.theme,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.card,
        aspectRatio: 1,
    },
});

export default HeaderCell;