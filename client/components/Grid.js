import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
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
                                    <Image
                                        source={{ uri: gridData[parseInt(rowItem.slice(1)) - 4][parseInt(colItem.slice(1)) - 1]['picture'] }}
                                        style={[
                                            styles.image,
                                            gridData[parseInt(rowItem.slice(1)) - 4][parseInt(colItem.slice(1)) - 1]['correct'] === 1 && styles.dimmedImage
                                        ]}
                                    />
                                    {gridData[parseInt(rowItem.slice(1)) - 4][parseInt(colItem.slice(1)) - 1]['correct'] === 2 && (
                                        <Image
                                            source={require('../assets/check.png')} // Remplacez par le chemin réel de votre image de croix
                                            style={styles.cross}
                                        />
                                    )}
                                    {gridData[parseInt(rowItem.slice(1)) - 4][parseInt(colItem.slice(1)) - 1]['correct'] === 1 && (
                                        <Image
                                            source={require('../assets/cross.png')} // Remplacez par le chemin réel de votre image de croix
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
    dimmedImage: {
        opacity: 0.3, // Réduisez l'opacité pour rendre l'image plus faible en intensité
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