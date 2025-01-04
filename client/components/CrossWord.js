import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import colors from '../constants/colors';

const CrossWord = ({ userGrid, onPressCell }) => {
    return (
        <View style={styles.gridContainer}>
            {userGrid.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                    {row.map((cell, colIndex) => {
                        const cellStyle = [
                            styles.cell,
                            cell.spe === 1 && cell.finalValue !== '' && styles.highlightedCell,
                            cell.finalValue === '' && styles.blackenedCell,
                            cell.finalValue !== '' && cell.spe === 0 && styles.whitenedCell,
                        ];
                        return cell.spe === 1 ? (
                            <TouchableOpacity
                                key={colIndex}
                                style={cellStyle}
                                onPress={() => onPressCell(cell, rowIndex, colIndex)}
                            >
                                <Text style={styles.cellText}>{cell.visible ? cell.value : ''}</Text>
                            </TouchableOpacity>
                        ) : (
                            <View key={colIndex} style={cellStyle}>
                                <Text style={styles.cellText}>{cell.visible ? cell.value : ''}</Text>
                            </View>
                        );
                    })}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    gridContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    row: {
        flexDirection: 'row',
    },
    cell: {
        width: 35,
        height: 35,
        borderWidth: 1,
        borderColor: colors.theme,
        justifyContent: 'center',
        alignItems: 'center',
    },
    highlightedCell: {
        backgroundColor: colors.theme, 
    },
    blackenedCell: {
        backgroundColor: colors.card,
    },
    whitenedCell: {
        backgroundColor: 'white'
    },
    cellText: {
        color: colors.dark,
    }
});

export default CrossWord;