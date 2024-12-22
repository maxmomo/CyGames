import { TouchableOpacity, StyleSheet, View, Text, Dimensions } from 'react-native';

import colors from '../constants/colors';

const windowWidth = Dimensions.get('window').width;

export default function MenuCard(props) {

    return (
        <TouchableOpacity style={styles.card} onPress={props.onPress}>
            <View style={styles.textView}>
                <Text style={styles.text}>{props.name}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: '2%',
        width: windowWidth * 0.48, 
        height: windowWidth * 0.60,
        borderRadius: 20,
        backgroundColor: colors.card
    },
    textView: {
        position: 'absolute',
        alignItems: 'center',
    },
    text: {
        color: colors.backgroundLight,
        fontSize: 28,
        fontWeight: 'bold',
    }
});