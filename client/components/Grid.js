import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Text } from 'react-native';
import colors from '../constants/colors';
import HeaderCell from './HeaderCell';

const Grid = ({ setModal1Visible, setSelectedCell, gridData, validated }) => {

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
                            disabled={validated}
                            onPress={() => {
                                setSelectedCell({ row: parseInt(rowItem.slice(1)) - 4, col: parseInt(colItem.slice(1)) - 1 });
                                setModal1Visible(true);
                            }}
                        >
                            {gridData[parseInt(rowItem.slice(1)) - 4] && gridData[parseInt(rowItem.slice(1)) - 4][parseInt(colItem.slice(1)) - 1] && (
                                <>
                                    <Text>{gridData[parseInt(rowItem.slice(1)) - 4][parseInt(colItem.slice(1)) - 1]['name']}</Text>
                                    {gridData[parseInt(rowItem.slice(1)) - 4][parseInt(colItem.slice(1)) - 1]['correct'] === 2 && (
                                        <Image
                                            source={require('../assets/check.png')} 
                                            style={styles.cross}
                                        />
                                    )}
                                    {gridData[parseInt(rowItem.slice(1)) - 4][parseInt(colItem.slice(1)) - 1]['correct'] === 1 && (
                                        <Image
                                            source={require('../assets/cross.png')} 
                                            style={styles.cross}
                                        />
                                    )}
                                </>
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
        flex: 1
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
        aspectRatio: 1
    },
    emptyCell: {
        flex: 1,
    },

    dimmedImage: {
        opacity: 0.3,
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