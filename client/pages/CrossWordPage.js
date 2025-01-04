import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useMyContext } from '../context/MyContext';
import CrosswordInputModal from '../modals/CrossWordInputModal';
import { commonStyles } from '../styles/GlobalStyles';
import colors from '../constants/colors';
import StarIcons from '../components/StarIcons';
import { BasicButton } from '../components';
import CrossWord from '../components/CrossWord';

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
            <View style={[commonStyles.center, commonStyles.row, { flex: 1 }]}>
                <Text style={[commonStyles.text24, commonStyles.bold]}>
                    {`Niveau ${crosswordData?.level ?? 'Indéfini'} :`}
                </Text>
                <StarIcons score={crosswordData?.score || 0} />
            </View>
            <View style={{ flex: 6 }}>
                <CrossWord 
                    userGrid={userGrid} 
                    onPressCell={onPressCell} 
                />
            </View>
            <View style={[commonStyles.center, { flex: 2 }]}>
                <BasicButton text="Valider" />
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