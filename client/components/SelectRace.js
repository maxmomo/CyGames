import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

import colors from '../constants/colors';
import RaceLogo from './Basic/RaceLogo';

import { commonStyles } from '../styles/GlobalStyles';

const logo_vuelta = require('../assets/logo-vuelta.png');
const logo_tdf = require('../assets/logo-tdf.png');
const logo_giro = require('../assets/logo-giro.png');
const screenWidth = Dimensions.get('window').width;
const imageWidth = screenWidth / 4;

export default function SelectRace(props) {
    return (
        <View style={commonStyles.row}>
            <TouchableOpacity
                style={[
                    styles.pickerButton,
                    { borderColor: props.selectedRace === 'Giro' ? colors.theme : colors.backgroundLight }
                ]}
                onPress={() => props.setGiro()}
            >
                <RaceLogo source={logo_giro} height={imageWidth} width={imageWidth} />
            </TouchableOpacity>
            <TouchableOpacity
                style={[
                    styles.pickerButton,
                    { borderColor: props.selectedRace === 'TDF' ? colors.theme : colors.backgroundLight}
                ]}
                onPress={() => props.setTDF()}
            >
                <RaceLogo source={logo_tdf} height={imageWidth} width={imageWidth} />
            </TouchableOpacity>
            <TouchableOpacity
                style={[
                    styles.pickerButton,
                    { borderColor: props.selectedRace === 'Vuelta' ? colors.theme : colors.backgroundLight }
                ]}
                onPress={() => props.setVuelta()}
            >
                <RaceLogo source={logo_vuelta} height={imageWidth} width={imageWidth} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    pickerButton: {
        backgroundColor: '#21222D',
        padding: '3%',
        marginHorizontal: '1%',
        borderRadius: 8,
        borderWidth: 1
    },
});