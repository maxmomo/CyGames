import React from 'react';
import { TouchableOpacity, Text, StyleSheet, FlatList, View} from 'react-native';
import RaceLogo from './Basic/RaceLogo';
import { commonStyles } from '../styles/GlobalStyles';
import colors from '../constants/colors';
const logo_vuelta = require('../assets/logo-vuelta.png');
const logo_tdf = require('../assets/logo-tdf.png');
const logo_giro = require('../assets/logo-giro.png');
const logo_pr = require('../assets/logo-pr.png');

export default function NextEvent(props) {

    let source = null

    const getSource = (item) => {
        if (item.name === 'Tour de France') {
            source = logo_tdf
        } else if (item.name === 'La Vuelta ciclista a España') {
            source = logo_vuelta
        } else if (item.name === 'Giro d\'Italia') {
            source = logo_giro
        } else if (item.name === 'Paris - Roubaix') {
            source = logo_pr
        } else {
            source = logo_tdf
        }

        return source
    };

    const onPressItem = (item) => {
        props.onPress(item)
    }

    const ListItem = ({ item, index }) => (
        <TouchableOpacity style={commonStyles.center} onPress={() => onPressItem(item)}>
            <RaceLogo width={150} height={150} source={getSource(item)} />
            <Text style={[commonStyles.text18, {color: colors.theme}]}>{item.name}</Text>
        </TouchableOpacity>
    )

    return (
        <View>
            <FlatList
                data={props.races}
                renderItem={({ item, index }) => <ListItem item={item} index={index} />}
                keyExtractor={item => item.url.toString()}
            />
        </View>
    );
}