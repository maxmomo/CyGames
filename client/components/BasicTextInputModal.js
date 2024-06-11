import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import colors from '../constants/colors';

export default function BasicTextInputModal(props) {
    const limitedSuggestions = props.suggestions.slice(0, 3);

    return (
        <View style={styles.inputView}>
            <TextInput
                style={styles.input}
                placeholder={props.placeholder}
                placeholderTextColor={colors.whiteText}
                value={props.value}
                onChangeText={props.onChangeText}
            />
            {props.showSuggestions && (
                <View style={styles.suggestionsContainer}>
                    {limitedSuggestions.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.suggestionItem}
                            onPress={() => props.onSuggestionClick(item.name)}
                        >
                            <Text style={styles.suggestionText}>{item.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    inputView: {
        width: '100%',
    },
    input: {
        width: '100%',
        padding: '3%',
        borderRadius: 30,
        backgroundColor: colors.whiteText,
        borderWidth: 2,
        borderColor: colors.theme
    },
    suggestionsContainer: {
        backgroundColor: colors.whiteText,
        borderRadius: 30,
        maxHeight: '70%',
    },
    suggestionItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.theme,
    },
    suggestionText: {
        color: colors.background,
    },
});