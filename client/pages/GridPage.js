import React from 'react';
import { TouchableOpacity, FlatList, StyleSheet, Text, SafeAreaView, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useMyContext } from '../context/MyContext';
import Flag from 'react-native-flags';

import { commonStyles } from '../styles/GlobalStyles';
import Header from '../components/Basic/Header';
import colors from '../constants/colors';

export default function GridPage() {
    const { state } = useMyContext();
    const grid = state['grid'];

    const renderStarIcons = (score) => {
        const stars = [];
        for (let i = 0; i < 3; i++) {
            const iconName = i < score ? 'star' : 'star-outline';
            stars.push(
                <MaterialCommunityIcons key={i} name={iconName} size={40} color={colors.theme} />
            );
        }
        return stars;
    };

    const renderHeaderCell = (Item) => {
        const element = 'e' + Item[1]
        // Vérifiez si la colonne correspond à une colonne 'e' et que la valeur correspond à 'Nationality'
        if (grid[element] === 'Nationality') {
            // Affiche le drapeau])
            return <Flag code={grid[Item]} size={32} />;
        }
        // Sinon, affiche simplement le titre de la colonne
        return (
            <View style={styles.cell}>
                <Text style={commonStyles.text13}>{grid[Item]}</Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={commonStyles.container}>
            <Header is_navigation={true} />
            <View style={[commonStyles.margin3Bottom, commonStyles.center]}>
                <Text style={[commonStyles.text24, commonStyles.bold]}>{'Niveau' + ' ' + grid['level']}</Text>
            </View>
            <View style={[commonStyles.margin3Bottom, commonStyles.center, commonStyles.row]}>
                {renderStarIcons(grid['score'])}
            </View>
            <View style={styles.gridContainer}>
                {/* Ligne vide pour la première ligne */}
                <View style={styles.row}>
                    {/* Cellule vide pour l'extrémité supérieure gauche */}
                    <View style={styles.emptyCell}></View>
                    {/* Titres des colonnes */}
                    {['i1', 'i2', 'i3'].map((colItem) => (
                        <View key={colItem} style={styles.headerCell}>
                            {renderHeaderCell(colItem)}
                        </View>
                    ))}
                </View>
                {/* Contenu de la grille */}
                {['i4', 'i5', 'i6'].map((rowItem) => (
                    <View key={rowItem} style={styles.row}>
                        {/* Titres des lignes */}
                        <View key={rowItem} style={styles.headerCell}>
                            {renderHeaderCell(rowItem)}
                        </View>
                        {/* Contenu des cellules */}
                        {['i1', 'i2', 'i3'].map((colItem) => (
                            <TouchableOpacity key={`${rowItem}-${colItem}`} style={styles.cell}>
                                {/* Insérer le contenu de la cellule ici */}
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}
            </View>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Valider</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    gridContainer: {
        flex: 1,
        marginHorizontal: '2%',
        marginTop: '3%'
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
        aspectRatio: 1, // Garantit que chaque cellule a une proportion carrée
    },
    headerCell: {
        flex: 1,
        borderWidth: 1,
        borderColor: colors.theme,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.backgroundLight,
        aspectRatio: 1, // Garantit que chaque cellule a une proportion carrée
    },
    emptyCell: {
        flex: 1,
        backgroundColor: colors.backgroundLight,
    },
    button: {
        backgroundColor: colors.theme,
        alignItems: 'center',
        padding: '2%',
        margin: '10%',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
