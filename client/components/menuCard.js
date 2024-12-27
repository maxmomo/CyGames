import { TouchableOpacity, StyleSheet, View, Text, Dimensions } from 'react-native';
import colors from '../constants/colors';

const windowWidth = Dimensions.get('window').width;

export default function MenuCard(props) {
    return (
        <TouchableOpacity 
            style={[
                styles.card, 
                props.full ? styles.fullCard : styles.halfCard,
                props.noMargin && styles.noMargin, // Annule la marge si `noMargin` est vrai
            ]}
            onPress={props.onPress}
        >
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
        borderRadius: 20,
        backgroundColor: colors.card,
    },
    noMargin: {
        margin: '1%',
    },
    fullCard: {
        width: '96%',
        height: windowWidth * 0.30,
    },
    halfCard: {
        width: windowWidth * 0.48,
        height: windowWidth * 0.60,
    },
    textView: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    text: {
        color: colors.backgroundLight,
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        flexWrap: 'wrap',
    },
});