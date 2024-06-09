import React from 'react';
import { View, TextInput, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import colors from '../../constants/colors';

export default function BasicTextInputModal(props) {
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
                    <FlatList
                        data={props.suggestions}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.suggestionItem}
                                onPress={() => props.onSuggestionClick(item)}
                            >
                                <Text style={styles.suggestionText}>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item.id.toString()}
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    inputView: {
        width: '100%',
        alignItems: 'center',
        marginTop: '5%'
    },
    input: {
        width: '80%',
        padding: '2%',
        borderWidth: 1,
        borderColor: colors.theme,
        borderRadius: 20,
        color: colors.background
    },
    suggestionsContainer: {
        width: '80%',
        maxHeight: 200,
        position: 'absolute',
        top: 60,
        backgroundColor: colors.whiteText,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.theme,
        zIndex: 1,
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
