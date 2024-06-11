import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useMyContext } from '../context/MyContext';
import colors from '../constants/colors';
import HeaderCell from './HeaderCell';

const Grid = ({ setModalVisible, setSelectedCell, selectedCell, gridData, setGridData, selectedItem }) => {

    useEffect(() => {
        if (selectedCell.row !== null && selectedCell.col !== null) {
            const { row, col } = selectedCell;
            const updatedGridData = [...gridData];
            selectedItem['col'] = selectedCell.col
            selectedItem['row'] = selectedCell.row
            updatedGridData[row][col] = selectedItem
            setGridData(updatedGridData);
        }
    }, [selectedItem]);

    return (
        <View style={styles.gridContainer}>
            <View style={styles.row}>
                <View style={styles.emptyCell}></View>
                {['i1', 'i2', 'i3'].map((colItem) => (
                    <HeaderCell key={colItem} item={colItem} />
                ))}
            </View>
            {['i4', 'i5', 'i6'].map((rowItem) => (
                <View key={rowItem} style={styles.row}>
                    <HeaderCell key={rowItem} item={rowItem} />
                    {['i1', 'i2', 'i3'].map((colItem) => (
                        <TouchableOpacity
                            key={`${rowItem}-${colItem}`}
                            style={styles.cell}
                            onPress={() => {
                                setSelectedCell({ row:  parseInt(rowItem.slice(1)) - 4, col: parseInt(colItem.slice(1)) - 1 });
                                setModalVisible(true);
                            }}
                        >
                            {/* Affichez l'image si elle existe dans gridData */}
                            {gridData[parseInt(rowItem.slice(1)) - 4] && gridData[parseInt(rowItem.slice(1)) - 4][parseInt(colItem.slice(1)) - 1] && (
                                <Image
                                    source={{ uri: gridData[parseInt(rowItem.slice(1)) - 4][parseInt(colItem.slice(1)) - 1]['picture'] }}
                                    style={styles.image}
                                />
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    gridContainer: {
        flex: 1,
        marginHorizontal: '2%',
        marginTop: '3%',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'stretch',
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
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
});

export default Grid;
