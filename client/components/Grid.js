import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Text } from 'react-native';
import colors from '../constants/colors';
import HeaderCell from './HeaderCell';

const Grid = ({ setModal1Visible, setSelectedCell, gridDataLines, validated, gridData, awarded }) => {
    return (
        <View style={styles.gridContainer}>
            <View style={styles.row}>
                <View style={styles.emptyCell}></View>
                {['i1', 'i2', 'i3'].map((colItem) => (
                    <HeaderCell key={colItem} item={colItem} gridData={gridData} />
                ))}
            </View>
            {['i4', 'i5', 'i6'].map((rowItem) => {
                const rowIndex = parseInt(rowItem.slice(1)) - 4;
                return (
                    <View key={rowItem} style={styles.row}>
                        <HeaderCell key={rowItem} item={rowItem} gridData={gridData} />
                        {['i1', 'i2', 'i3'].map((colItem) => {
                            const colIndex = parseInt(colItem.slice(1)) - 1;
                            const cellData = gridDataLines?.[rowIndex]?.[colIndex];

                            return (
                                <TouchableOpacity
                                    key={`${rowItem}-${colItem}`}
                                    style={styles.cell}
                                    disabled={validated}
                                    onPress={() => {
                                        setSelectedCell({ row: rowIndex, col: colIndex });
                                        setModal1Visible(true);
                                    }}
                                >
                                    {cellData?.name ? (
                                        <Text style={styles.cellText}>{cellData.name}</Text>
                                    ) : (
                                        <Text style={[styles.cellText, { color: 'gray' }]}>Vide</Text>
                                    )}
                                    {cellData?.correct === 2 && (
                                        <Image
                                            source={require('../assets/check.png')}
                                            style={styles.cross}
                                        />
                                    )}
                                    {cellData?.correct === 1 && (
                                        <Image
                                            source={require('../assets/cross.png')}
                                            style={styles.cross}
                                        />
                                    )}
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    gridContainer: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
    },
    cell: {
        flex: 1,
        borderWidth: 1,
        borderColor: colors.theme,
        justifyContent: 'center',
        alignItems: 'center',
        aspectRatio: 1,
    },
    emptyCell: {
        flex: 1,
    },
    cellText: {
        fontSize: 16,
        textAlign: 'center',
        color: colors.text || 'black',
    },
    cross: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        opacity: 0.5,
    },
});

export default Grid;