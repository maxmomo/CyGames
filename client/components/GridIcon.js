import React from 'react';
import { View, Text, Image } from 'react-native';
import { commonStyles } from '../styles/GlobalStyles';

export default function Logo(props) {
    // Valider et extraire la donnée "top"
    const parts = typeof props.additional === 'string' && props.additional.includes('/')
        ? props.additional.split('/')
        : ['N/A'];
    const top = parts[0];

    // Associer les courses aux images
    const raceLogos = {
        'Tour de France': require('../assets/Tour.png'),
        'Giro d\'Italia': require('../assets/Giro.png'),
        'La Vuelta ciclista a España': require('../assets/Vuelta.png'),
        'Paris - Roubaix': require('../assets/Roubaix.png'),
        'Liège - Bastogne - Liège': require('../assets/LBL.png'),
        'Milano-Sanremo': require('../assets/MSR.png'),
    };

    const logoSource = raceLogos[props.race];

    return (
        <View>
            {logoSource ? (
                <Image
                    style={{
                        resizeMode: 'contain',
                        height: 50,
                        width: 50,
                    }}
                    source={logoSource}
                />
            ) : (
                <Text style={commonStyles.text14}>Image non disponible</Text>
            )}
            <Text style={commonStyles.text14}>Top {top || 'N/A'}</Text>
        </View>
    );
}