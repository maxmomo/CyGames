import React, { useState, useEffect, useRef, useMemo } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { VictoryPie } from 'victory-native';
import { useNavigation } from '@react-navigation/native';

import { commonStyles } from '../../styles/GlobalStyles';
import colors from '../../constants/colors';

export default function GtDiagram(props) {

    const navigation = useNavigation();
    const initialRender = useRef(true);

    const [tourDeFranceWins, setTourDeFranceWins] = useState(0);
    const [giroDItaliaWins, setGiroDItaliaWins] = useState(0);
    const [vueltaWins, setVueltaWins] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    
    const totalWins = tourDeFranceWins + giroDItaliaWins + vueltaWins;
    
    const data = [
      { x: 'Giro d\'Italia', y: giroDItaliaWins, color: 'pink' },
      { x: 'Tour de France', y: tourDeFranceWins, color: 'yellow' },
      { x: 'Vuelta', y: vueltaWins, color: 'red' }
    ];

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }

        if (props.statistics.length !== 0 && props.statistics[0].length !== 0) {
            setTourDeFranceWins(props.statistics[0].filter(item => item.race_name === 'Tour de France').length);
            setGiroDItaliaWins(props.statistics[0].filter(item => item.race_name === 'Giro d\'Italia').length);
            setVueltaWins(props.statistics[0].filter(item => item.race_name === 'La Vuelta ciclista a España').length);
        }
        setIsLoading(false);
    }, [props.statistics]);

    const goGTWins = () => {
        navigation.navigate('TeamGTWin')
    }

    return (
        <TouchableOpacity style={commonStyles.flex1} onPress={goGTWins}>
            {isLoading || initialRender.current ? null : totalWins === 0 ? (
                <Text style={commonStyles.text16}>
                    Pas de victoire en GT
                </Text>
            ) : (
                <>
                    <VictoryPie
                        data={data}
                        colorScale={['#F22973', '#F2B705', '#D91E1E']}
                        innerRadius={70}
                        labelRadius={53}
                        style={{ labels: { fill: colors.background, fontSize: 13, fontWeight: 'bold' } }}
                        labels={({ datum }) => datum.y !== 0 ? datum.y : null}
                        width={200}
                        height={200}
                    />
                    <View style={styles.diagramTitle}>
                        <Text style={commonStyles.text16}>Victoires GT</Text>
                    </View>
                </>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    diagramTitle: { 
        position: 'absolute', 
        top: '44%', 
        left: '24%', 
        width: '60%',
        justifyContent: 'center', 
        alignItems: 'center',
        textAlign: 'center'
    }
});
