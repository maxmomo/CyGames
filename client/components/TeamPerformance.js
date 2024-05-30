import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMyContext } from '../context/MyContext';
const logo_vuelta = require('../assets/logo-vuelta.png');
const logo_tdf = require('../assets/logo-tdf.png');
const logo_giro = require('../assets/logo-giro.png');
const screenWidth = Dimensions.get('window').width;
const imageWidth = screenWidth / 4;

export default function TeamPerformance() {

    const navigation = useNavigation();
    const { state, dispatch } = useMyContext();

    const goGiro = () => {
        dispatch({ type: "SET_RACE_STATISTIC", payload: 'Giro' });
        navigation.navigate("TeamGTStat")
    }

    const goTDF = () => {
        dispatch({ type: "SET_RACE_STATISTIC", payload: 'Tour de France' });
        navigation.navigate("TeamGTStat")
    }

    const goVuelta = () => {
        dispatch({ type: "SET_RACE_STATISTIC", payload: 'Vuelta' });
        navigation.navigate("TeamGTStat")
    }

    return (
        <View style={styles.racesView}>
            <TouchableOpacity
                style={[
                    styles.pickerButton,
                ]}
                onPress={() => goGiro()}
            >
                <Image source={logo_giro} style={styles.image} />
            </TouchableOpacity>
            <TouchableOpacity
                style={[
                    styles.pickerButton,
                ]}
                onPress={() => goTDF()}
            >
                <Image source={logo_tdf} style={styles.image} />
            </TouchableOpacity>
            <TouchableOpacity
                style={[
                    styles.pickerButton,
                ]}
                onPress={() => goVuelta()}
            >
                <Image source={logo_vuelta} style={styles.image} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    racesView: {
        marginVertical: '2%',
        marginLeft: '3%',
        flexDirection: 'row',
        justifyContent: 'center',  // Centrer horizontalement
        alignItems: 'center',     // Centrer verticalement
    },
    image: {
        height: imageWidth, // Pour conserver le ratio d'aspect, utilisez la même valeur pour la hauteur et la largeur
        width: imageWidth,
        marginHorizontal: '3%',
        resizeMode: 'contain'
    },
});