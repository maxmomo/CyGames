import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import colors from '../../constants/colors';

export default function BasicSearchBar(props) {
    return (
        <TextInput
            style={styles.searchBar}
            placeholder={props.placeholder}
            placeholderTextColor={colors.whiteText}
            value={props.value}
            onChangeText={props.onChangeText}
        />
    );
}

const styles = StyleSheet.create({
    searchBar: {
        backgroundColor: colors.backgroundLight,
        padding: '2%',
        marginTop: '1%',
        marginHorizontal: '1%',
        borderRadius: 10,
        color: colors.whiteText,
        borderWidth: 1,
        borderColor: colors.whiteText
    }
});