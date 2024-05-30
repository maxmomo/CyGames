import React from 'react';
import { View, Text } from 'react-native';

import Flag from 'react-native-flags';
import { commonStyles } from '../../styles/GlobalStyles';
import colors from '../../constants/colors';

export default function Results3List(props) {

    let results = []

    if (props.resultTypeId === 2) {
        results = props.results.filter(result => result.type_id === 2);
    } else if (props.resultTypeId === 3) {
        results = props.results.filter(result => result.type_id === 3);
    } else if (props.resultTypeId === 4) {
        results = props.results.filter(result => result.type_id === 4);
    } else if (props.resultTypeId === 8) {
        results = props.results.filter(result => result.type_id === 8);
    }

    const renderNameForPosition = (position) => {
        const result = results.find(result => result.position === position);
        return result ? [result.fullName, result.nationality, result.is_boost] : ['', false];
    }

    return (
        <View style={[commonStyles.flex1, commonStyles.padding2, commonStyles.roundWhite, commonStyles.margin1]}>
            <View style={[commonStyles.center, commonStyles.margin1Bottom]}>
                <Text style={[commonStyles.text16, commonStyles.bold]}>{props.type}</Text>
            </View>
            <View style={[commonStyles.row, commonStyles.flex1]}>
                <View style={[commonStyles.padding1, commonStyles.spaceBetween]}>
                    {[1, 2, 3].map((position) => (
                        <Text key={position} style={commonStyles.text13}>{position}</Text>
                    ))}
                </View>
                <View style={[commonStyles.padding1, commonStyles.spaceBetween]}>
                    {[1, 2, 3].map((position) => (
                        <View key={position} style={[commonStyles.row]} >
                            {renderNameForPosition(position)[1] && <Flag code={renderNameForPosition(position)[1]} size={16} type={'flat'}/>}
                            <Text key={position} style={[commonStyles.text13, commonStyles.margin2Left, renderNameForPosition(position)[2] ? { color: colors.theme } : {}]}>
                                {renderNameForPosition(position)[0]}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
}