import React, { memo, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import colors from '../constants/colors';
import Flag from 'react-native-flags';

const RiderCard = ({ item, onPress, isDummy }) => {
    const [viewDimensions, setViewDimensions] = useState({ width: 0, height: 0 });

    if (isDummy) {
        return <View style={[styles.card, styles.dummyCard]} />;
    }

    const rarity = item.category === 1 ? 'gold' : item.category === 2 ? 'silver' : 'bronze';

    const getFontSize = () => Math.min(viewDimensions.width, viewDimensions.height) * 0.1;

    return (
        <TouchableOpacity 
            style={[styles.card, styles[rarity]]}
            onLayout={(event) => {
                const { width, height } = event.nativeEvent.layout;
                setViewDimensions({ width, height });
            }}
        >
            <View style={styles.imageContainer}>
                {/* Cercle avec chiffre en haut à gauche */}
                <View style={styles.badge}>
                    <Text style={[styles.badgeText, { fontSize: getFontSize() }]}>{item.average_points}</Text>
                </View>
                <Image 
                    style={styles.image} 
                    source={require('../assets/riders/enric-mas.png')} 
                    resizeMode='contain'
                />
            </View>
            <View style={styles.textContainer}>
                <Text style={[styles.text, { fontSize: getFontSize() }]}>{item.name}</Text>
                <View style={styles.infoContainer}>
                    <Flag code={item.nationality} size={24} />
                    <Text style={[styles.ageText, { fontSize: getFontSize() }]}>{item.age} ans</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default memo(RiderCard);

const styles = StyleSheet.create({
    card: {
        aspectRatio: 3/5,
        margin: '2%',
        borderRadius: 20,
        backgroundColor: colors.whiteText,
        flex: 1,
    },
    dummyCard: {
        backgroundColor: 'transparent',
        borderWidth: 0,
    },
    imageContainer: {
        width: '100%',
        height: '70%',
        paddingTop: '2%',
        position: 'relative',
    },
    textContainer: {
        height: '30%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: colors.dark,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    badge: {
        position: 'absolute',
        top: '3%',            
        left: '75%',   
        width: '20%',
        height: '20%',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    badgeText: {
        fontWeight: 'bold',
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '2%',
        padding: '1%',
    },
    ageText: {
        color: colors.dark,
        marginLeft: 8,           // Ajoute un espace entre le drapeau et l'âge
    },
    gold: {
        backgroundColor: '#ccb557',
        borderWidth: 2,
        borderColor: '#937829',
    },
    silver: {
        backgroundColor: '#bdbdbd',
        borderWidth: 2,
        borderColor: '#878787',
    },
    bronze: {
        backgroundColor: '#d7a87e',
        borderWidth: 2,
        borderColor: '#5e3819',
    },
});
