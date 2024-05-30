import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import Flag from 'react-native-flags';
import { commonStyles } from '../../styles/GlobalStyles';
import colors from '../../constants/colors';

export default function Bets3List(props) {

    const bets = props.bets.filter(bet => bet.type_id === props.betTypeId);

    const renderNameForPosition = (position) => {
        const bet = bets.find(bet => bet.position === position);
        return bet ? [bet.fullName, bet.nationality, bet.is_boost, bet.point] : ['', false];
    }

    return (
        <View>
            {!props.readonly && 
            <TouchableOpacity style={[commonStyles.flex1, commonStyles.padding2, commonStyles.roundyellow, commonStyles.margin1]} onPress={props.onPress}>
                <View style={[commonStyles.center, commonStyles.margin1Bottom]}>
                    <Text style={[commonStyles.text16, commonStyles.bold]}>{props.type}</Text>
                </View>
                <View style={[commonStyles.row, commonStyles.flex1]}>
                    <View style={[commonStyles.padding1, commonStyles.spaceBetween]}>
                        {[1, 2, 3].map((position) => (
                            <Text key={position} style={commonStyles.text12}>{position}</Text>
                        ))}
                    </View>
                    <View style={[commonStyles.padding1, commonStyles.flex1]}>
                        {[1, 2, 3].map((position) => (
                            <View key={position} style={[commonStyles.row, commonStyles.flex1]} >
                                <View style={[commonStyles.row, commonStyles.flex1]}>
                                    {renderNameForPosition(position)[1] && <Flag code={renderNameForPosition(position)[1]} size={16} type={'flat'}/>}
                                    <Text style={[commonStyles.text12, commonStyles.margin2Left, renderNameForPosition(position)[2] ? { color: colors.theme } : {}]}>
                                        {renderNameForPosition(position)[0]}
                                    </Text>
                                </View>
                                <View style={commonStyles.flex1}>
                                    <Text style={[commonStyles.text12, commonStyles.margin2Left, renderNameForPosition(position)[2] ? { color: colors.theme } : {}]}>
                                        {renderNameForPosition(position)[3]}
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </TouchableOpacity> || 
            <View style={[commonStyles.flex1, commonStyles.padding2, commonStyles.roundWhite, commonStyles.margin1]}>
                <View style={[commonStyles.center, commonStyles.margin1Bottom]}>
                    <Text style={[commonStyles.text16, commonStyles.bold]}>{props.type}</Text>
                </View>
                <View style={[commonStyles.row, commonStyles.flex1]}>
                    <View style={[commonStyles.padding1, commonStyles.spaceBetween]}>
                        {[1, 2, 3].map((position) => (
                            <Text key={position} style={commonStyles.text12}>{position}</Text>
                        ))}
                    </View>
                    <View style={[commonStyles.padding1, commonStyles.flex1]}>
                        {[1, 2, 3].map((position) => (
                            <View key={position} style={[commonStyles.row, commonStyles.flex1]} >
                                <View style={[commonStyles.row, commonStyles.flex1]}>
                                    {renderNameForPosition(position)[1] && <Flag code={renderNameForPosition(position)[1]} size={16} type={'flat'}/>}
                                    <Text style={[commonStyles.text12, commonStyles.margin2Left, renderNameForPosition(position)[2] ? { color: colors.theme } : {}]}>
                                        {renderNameForPosition(position)[0]}
                                    </Text>
                                </View>
                                <View style={commonStyles.flex1}>
                                    <Text style={[commonStyles.text12, commonStyles.margin2Left, renderNameForPosition(position)[2] ? { color: colors.theme } : {}]}>
                                        {renderNameForPosition(position)[3]}
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </View>} 
        </View>
    );
}