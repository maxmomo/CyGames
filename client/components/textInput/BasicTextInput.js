import { View, TextInput, StyleSheet } from 'react-native';
import colors from '../../constants/colors';

export default function BasicTextInput(props) {
    return (
        <View style={styles.inputView}>
            <TextInput 
                style={styles.input}
                keyboardType={props.type}
                placeholder={props.placeholder}
                placeholderTextColor={colors.whiteText}
                value={props.value}
                onChangeText={props.onChangeText}
                secureTextEntry={props.secureTextEntry}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    inputView: {
        marginTop: '5%',
        alignItems: 'center',
        width: '100%',
    },
    input: {
        width: '80%',
        padding: '2%',
        borderWidth: 1,
        borderColor: colors.theme,
        borderRadius: 20,
        borderWidth: 2,
        color: colors.whiteText
    },
});