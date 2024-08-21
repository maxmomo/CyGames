import React, { useRef } from 'react';
import { View, TextInput, StyleSheet, Animated } from 'react-native';
import colors from '../../constants/colors';

export default function AnimatedTextInput(props) {
    const borderColorAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handleFocus = () => {
        Animated.parallel([
            Animated.timing(borderColorAnim, {
                toValue: 1, 
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1.15, 
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handleBlur = () => {
        Animated.parallel([
            Animated.timing(borderColorAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1, 
                useNativeDriver: true,
            }),
        ]).start();
    };

    const borderColor = borderColorAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [colors.whiteText, colors.background, colors.theme]
    });

    return (
        <Animated.View style={[styles.inputWrapper, { borderColor, transform: [{ scale: scaleAnim }] }]}>
            <TextInput
                style={styles.input}
                keyboardType={props.type}
                placeholder={props.placeholder}
                placeholderTextColor={colors.whiteText}
                value={props.value}
                onChangeText={props.onChangeText}
                secureTextEntry={props.secureTextEntry}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    inputWrapper: {
        width: '80%',
        borderWidth: 2,
        borderRadius: 20,
        marginVertical: 10,
    },
    input: {
        padding: '3%',
        color: colors.whiteText,
        fontSize: 16,
    },
});
