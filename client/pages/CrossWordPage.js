import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useMyContext } from '../context/MyContext';
import CrosswordInputModal from '../modals/CrossWordInputModal';
import { commonStyles } from '../styles/GlobalStyles';
import colors from '../constants/colors';
import StarIcons from '../components/StarIcons';

const GRID_SIZE = 10;

export default function CrossWordPage() {
    const { state } = useMyContext();
    const crosswordData = state['crossWord'];
    const [modalVisible, setModalVisible] = useState(false);
    const [definition, setDefinition] = useState('');
    const [direction, setDirection] = useState('H'); 
    const [isHV, setIsHV] = useState(false); 
    const [wordCells, setWordCells] = useState([]);
    const [userGrid, setUserGrid] = useState(initializeGrid());

    function initializeGrid() {
        const initialGrid = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill({ value: '', spe: 0, visible: false, finalValue: '' }));
        Object.keys(crosswordData.squares).forEach((key) => {
            const row = key.charCodeAt(0) - 65;
            const col = parseInt(key.match(/\d+/)?.[0], 10) - 1;
            if (row >= 0 && row < GRID_SIZE && col >= 0 && col < GRID_SIZE) {
                initialGrid[col][row] = { ...crosswordData.squares[key], value: '', visible: false, finalValue: crosswordData.squares[key].value };
            }
        });
        return initialGrid;
    }

    const onPressCell = (cell, rowIndex, colIndex) => {
        setDefinition(cell.def1);
        setIsHV(cell.direction === 'HV');
        setDirection(cell.direction === 'HV' ? 'H' : cell.direction);
        const cells = getWordCells(rowIndex, colIndex, cell.direction === 'HV' ? 'H' : cell.direction);
        setWordCells(cells);
        setModalVisible(true);
    };

    const getWordCells = (row, col, direction) => {
        const cells = [];
        let currentRow = row;
        let currentCol = col;
        while (currentRow >= 0 && currentRow < GRID_SIZE && currentCol >= 0 && currentCol < GRID_SIZE) {
            const currentCell = userGrid[currentRow][currentCol];
            if (currentCell.finalValue === '') break;
            cells.push({ ...currentCell, row: currentRow, col: currentCol });
            if (direction === 'H') currentCol += 1;
            else if (direction === 'V') currentRow += 1;
        }
        return cells;
    };

    const handleInputChange = (text, index) => {
        const updatedCells = [...wordCells];
        updatedCells[index].value = text.toUpperCase();
        setWordCells(updatedCells);
    };

    const handleModalClose = () => {
        const updatedGrid = [...userGrid];
        wordCells.forEach((cell) => {
            updatedGrid[cell.row][cell.col].value = cell.value;
            updatedGrid[cell.row][cell.col].visible = true;
        });
        setUserGrid(updatedGrid);
        setModalVisible(false);
    };

    const handleDirectionChange = (newDirection) => {
        setDirection(newDirection);
        setDefinition(newDirection === 'H' ? wordCells[0].def1 : wordCells[0].def2);
        
        // Recalculer le nombre de cases en fonction de la nouvelle direction
        const updatedCells = getWordCells(wordCells[0].row, wordCells[0].col, newDirection);
        setWordCells(updatedCells);
    };

    return (
        <SafeAreaView style={commonStyles.container}>
            <View style={[commonStyles.center, commonStyles.row]}>
                <Text style={[commonStyles.text24, commonStyles.bold]}>{'Niveau ' + crosswordData['level'] + ' : '}</Text>
                <StarIcons score={crosswordData['score']} />
            </View>
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

            <CrosswordInputModal
                visible={modalVisible}
                onClose={handleModalClose}
                definition={definition}
                wordCells={wordCells}
                onInputChange={handleInputChange}
                isHV={isHV}
                direction={direction}
                handleDirectionChange={handleDirectionChange}
            />
        </SafeAreaView>
    );
}

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
