import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../constants/colors';

const StarIcons = ({ score = 0 }) => {
    const validScore = typeof score === 'number' && score >= 0 && score <= 3 ? score : 0;

    const stars = [];
    for (let i = 0; i < 3; i++) {
        const iconName = i < validScore ? 'star' : 'star-outline';
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
