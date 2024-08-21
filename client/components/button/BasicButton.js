import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../../constants/colors';

export default function BasicButton(props) {
    return (
        <TouchableOpacity 
            style={styles.button} 
            onPress={props.onPress}
        >
            <Text 
                style={styles.buttonText}
            >
                {props.text}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: '60%',
        padding: '2%',
        borderRadius: 30,
        margin: '2%',
        backgroundColor: colors.theme,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.background,
    },
});