import React from 'react';
import { View, Text } from 'react-native';

import { commonStyles } from '../styles/GlobalStyles';

export default function TeamInformation(props) {

    return (
        <View style={[commonStyles.row, commonStyles.margin2Left]}>
            <View style={commonStyles.flex1}>
                <View style={[commonStyles.row, commonStyles.margin3Bottom]}>
                    <Text style={commonStyles.text14}>Date : </Text>
                    <Text style={[commonStyles.text14, commonStyles.bold]}>{props.stage.date}</Text>
                </View>
                <View style={[commonStyles.row, commonStyles.margin3Bottom]}>
                    <Text style={commonStyles.text14}>Denivelé : </Text>
                    <Text style={[commonStyles.text14, commonStyles.bold]}>{props.stage.vertical_meter} m</Text>
                </View>
            </View>
        </View>
    );
}