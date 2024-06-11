import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../constants/colors';

const StarIcons = ({ score }) => {
    const stars = [];
    for (let i = 0; i < 3; i++) {
        const iconName = i < score ? 'star' : 'star-outline';
        stars.push(
            <MaterialCommunityIcons key={i} name={iconName} size={30} color={colors.theme} />
        );
    }
    return <View style={styles.row}>{stars}</View>;
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
});

export default StarIcons;