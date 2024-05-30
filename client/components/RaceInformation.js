import React from 'react';
import { View, Text } from 'react-native';

import { commonStyles } from '../styles/GlobalStyles';

export default function TeamInformation(props) {

    return (
        <View style={[commonStyles.row, commonStyles.margin2Left]}>
            <View style={commonStyles.flex1}>
                <View style={[commonStyles.row]}>
                    <Text style={commonStyles.text14}>Date de départ : </Text>
                    <Text style={[commonStyles.text14, commonStyles.bold]}>{props.race.start_date}</Text>
                </View>
                <View style={[commonStyles.row]}>
                    <Text style={commonStyles.text14}>Date d'arrivée : </Text>
                    <Text style={[commonStyles.text14, commonStyles.bold]}>{props.race.end_date}</Text>
                </View>
            </View>
        </View>
    );
}