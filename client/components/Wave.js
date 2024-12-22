import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import colors from '../constants/colors';

export default function Wave() {
    const { width, height } = Dimensions.get('window');

    // Génère dynamiquement le chemin de la vague
    const wavePath = `M0,${height * 0.15} 
                      C${width * 0.25},${height * 0.2} 
                      ${width * 0.75},0 
                      ${width},${height * 0.15} 
                      L${width},${height * 0.2} 
                      L0,${height * 0.2}Z`;

    return (
        <Svg height={height * 0.199} width={width} style={styles.wave}>
            <Path fill={colors.background} d={wavePath} />
        </Svg>
    );
}

const styles = StyleSheet.create({
    wave: {
        position: 'absolute',
        bottom: 0,
    },
});