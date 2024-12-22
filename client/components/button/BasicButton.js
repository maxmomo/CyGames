import React, { useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import colors from '../../constants/colors';

export default function BasicButton(props) {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const colorAnim = useRef(new Animated.Value(0)).current;

    const handlePressIn = () => {
        Animated.parallel([
            Animated.spring(scaleAnim, {
                toValue: 0.9, 
                friction: 3,   
                tension: 40,   
                useNativeDriver: true, 
            }),
            Animated.timing(colorAnim, {
                toValue: 1, 
                duration: 150, 
                useNativeDriver: true, 
            }),
        ]).start();
    };

    const handlePressOut = () => {
        Animated.parallel([
            Animated.spring(scaleAnim, {
                toValue: 1, 
                friction: 3,
                tension: 40,
                useNativeDriver: true,
            }),
            Animated.timing(colorAnim, {
                toValue: 0, 
                duration: 150, 
                useNativeDriver: true,
            }),
        ]).start(() => {
            if (props.onPress) {
                props.onPress();
            }
        });
    };

    const animatedBackgroundColor = colorAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [colors.theme, colors.theme_light], 
    });

    return (
        <TouchableOpacity
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={styles.button}
        >
            <Animated.View
                style={[
                    {
                        transform: [{ scale: scaleAnim }],
                        backgroundColor: animatedBackgroundColor,
                        borderRadius: 30,
                        padding: '5%',
                        width: '100%',
                    }
                ]}
            >
                <Text style={styles.buttonText}>
                    {props.text}
                </Text>
            </Animated.View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 30,
        padding: '2%',
        width: '80%',
    },
    buttonText: {
        color: colors.background,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});