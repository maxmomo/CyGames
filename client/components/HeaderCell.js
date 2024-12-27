import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Flag from 'react-native-flags';
import GridIcon from './GridIcon';
import colors from '../constants/colors';
import { commonStyles } from '../styles/GlobalStyles';

const HeaderCell = ({ item, gridData }) => {
    const grid = gridData || {}; // Fallback si gridData est indéfini
    const element = 'e' + item[1];
    const additional = 'a' + item[1];
    const information = 'i' + item[1];

    const isNationality = grid[element] === 'Nationality';
    const isRace = grid[element] === 'Race';
    const infoValue = grid[information] || null;
    const additionalValue = grid[additional] || null;

    if (isNationality) {
        return (
            <View style={styles.cell}>
                {infoValue ? (
                    <Flag code={infoValue} size={32} />
                ) : (
                    <Text style={commonStyles.text13}>N/A</Text>
                )}
            </View>
        );
    }

    if (isRace) {
        return (
            <View style={styles.cell}>
                <GridIcon
                    race={infoValue || 'unknown'}
                    additional={additionalValue || 'N/A'}
                />
            </View>
        );
    }

    return (
        <View style={styles.cell}>
            <Text style={commonStyles.text13}>{infoValue || 'No data'}</Text>
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