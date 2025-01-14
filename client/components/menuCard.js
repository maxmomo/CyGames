import { TouchableOpacity, StyleSheet, View, Text, Dimensions } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../constants/colors';

const windowWidth = Dimensions.get('window').width;

export default function MenuCard(props) {
    return (
        <TouchableOpacity 
            style={[
                styles.card, 
                props.full ? styles.fullCard : styles.halfCard,
                props.noMargin && styles.noMargin,
            ]}
            onPress={props.onPress}
        >
            {props.onInfoPress && <TouchableOpacity 
                style={styles.infoButton} 
                onPress={props.onInfoPress} 
            >
                <MaterialCommunityIcons name="information-outline" size={26} color={colors.theme} />
            </TouchableOpacity>}
            <View style={styles.textView}>
                <Text style={styles.text}>{props.name}</Text>
                {props.price && (
                    <View style={styles.priceSection}>
                        <MaterialCommunityIcons name='cash' size={32} color={colors.theme} />
                        <Text style={styles.priceText}>{props.price.toLocaleString()}</Text>
                    </View>
                )}
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
    priceSection: {
        flexDirection: 'row',
        marginTop: '10%', 
        alignItems: 'center',
        justifyContent: 'center'
    },
    priceText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.black
    },
    infoButton: {
        position: 'absolute',
        top: '5%', 
        right: '5', 
    },
});
