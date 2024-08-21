import { useRef } from 'react';
import { TouchableOpacity, StyleSheet, Animated } from 'react-native';

export default function MenuCard(props) {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.9,
            speed: 20,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            speed: 100,
            useNativeDriver: true,
        }).start(() => {
            if (props.onPress) {
                props.onPress();
            }
        });
    };

    return (
        <TouchableOpacity
            style={styles.card}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
        >
            <Animated.Image
                style={[
                    styles.image,
                    {
                        transform: [{ scale: scaleAnim }]
                    }
                ]}
                source={require('../assets/Grilles.png')}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        margin: '9%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        resizeMode: 'contain',
        width: 250,
        height: 250
    }
});