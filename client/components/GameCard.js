import { TouchableOpacity, StyleSheet, View, Text, Dimensions } from 'react-native';

import colors from '../constants/colors';
import { commonStyles } from '../styles/GlobalStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;

export default function GameCard(props) {

    const renderStarIcons = (score) => {
        const stars = [];
        for (let i = 0; i < 3; i++) {
            const iconName = i < score ? 'star' : 'star-outline';
            stars.push(
                <MaterialCommunityIcons key={i} name={iconName} size={24} color={colors.backgroundLight} />
            );
        }
        return stars;
    };

    return (
        <TouchableOpacity style={styles.card} onPress={() => props.onPress(props.item)}>
            <View style={styles.textView}>
                <Text style={styles.text}>Niveau {props.item.level}</Text>
                <View style={commonStyles.row}>
                    {renderStarIcons(props.item.score)}
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: '2%',
        width: windowWidth * 0.46, 
        height: windowWidth * 0.40,
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