import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

import { commonStyles } from '../styles/GlobalStyles';
import Flag from 'react-native-flags';
import colors from '../constants/colors';

export default function Podium(props) {

    let bets = []

    if (props.betTypeId === 2) {
        bets = props.bets.filter(bet => bet.type_id === 2);
    } else if (props.betTypeId === 3) {
        bets = props.bets.filter(bet => bet.type_id === 3);
    } else if (props.betTypeId === 4) {
        bets = props.bets.filter(bet => bet.type_id === 4);
    }

    const firstPlace = bets.find(bet => bet.position === 1);
    const secondPlace = bets.find(bet => bet.position === 2);
    const thirdPlace = bets.find(bet => bet.position === 3);

    return (
        <TouchableOpacity style={[commonStyles.flex1, commonStyles.padding1, commonStyles.roundyellow, commonStyles.margin1]} onPress={props.onPress}>
            <View style={[commonStyles.center, commonStyles.margin1Bottom]}>
                <Text style={[commonStyles.text16, commonStyles.bold]}>{props.type}</Text>
            </View>
            <View style={[commonStyles.row, commonStyles.flex1, commonStyles.margin2]}>
                <View style={[commonStyles.column, commonStyles.flex1]}>
                    {secondPlace && <View style={[commonStyles.flex1, commonStyles.center, commonStyles.padding1, secondPlace.is_boost ? { color: colors.theme } : {}]}>
                        <Text numberOfLines={1} adjustsFontSizeToFit  minimumFontScale={0.5} style={[commonStyles.text13, secondPlace.is_boost ? { color: colors.theme } : {}]}>{secondPlace ? secondPlace.firstName : ''}</Text>
                        <Text numberOfLines={1} adjustsFontSizeToFit  minimumFontScale={0.5} style={[commonStyles.text13, secondPlace.is_boost ? { color: colors.theme } : {}]}>{secondPlace ? secondPlace.name : ''}</Text>
                    </View> || <View style={commonStyles.flex1} />}
                    <View style={[commonStyles.flex1, commonStyles.colorWhite, commonStyles.center]}>
                        {secondPlace && <Flag code={secondPlace.nationality} size={24} type={'flat'}/>}
                        <Text style={[commonStyles.text20Inv, commonStyles.bold]}>2</Text>
                    </View>
                </View>
                <View style={[commonStyles.column, commonStyles.flex1]}>
                    {firstPlace && <View style={[commonStyles.flex2, commonStyles.center, commonStyles.padding1]}>
                        <Text numberOfLines={1} adjustsFontSizeToFit  minimumFontScale={0.5} style={[commonStyles.text13, firstPlace.is_boost ? { color: colors.theme } : {}]}>{firstPlace ? firstPlace.firstName : ''}</Text>
                        <Text numberOfLines={1} adjustsFontSizeToFit  minimumFontScale={0.5} style={[commonStyles.text13, firstPlace.is_boost ? { color: colors.theme } : {}]}>{firstPlace ? firstPlace.name : ''}</Text>
                    </View> || <View style={commonStyles.flex2} />}
                    <View style={[commonStyles.flex3, commonStyles.colorWhite, commonStyles.center]}>
                        {firstPlace && <Flag code={firstPlace.nationality} size={24} type={'flat'}/>}
                        <Text style={[commonStyles.text20Inv, commonStyles.bold]}>1</Text>
                    </View> 
                </View>
                <View style={[commonStyles.column, commonStyles.flex1]}>
                    {thirdPlace && <View style={[commonStyles.flex3, commonStyles.center, commonStyles.padding1, thirdPlace.is_boost ? { color: colors.theme } : {}]}>
                        <Text numberOfLines={1} adjustsFontSizeToFit  minimumFontScale={0.5}  style={[commonStyles.text13, thirdPlace.is_boost ? { color: colors.theme } : {}]}>{thirdPlace ? thirdPlace.firstName : ''}</Text>
                        <Text numberOfLines={1} adjustsFontSizeToFit  minimumFontScale={0.5}  style={[commonStyles.text13, thirdPlace.is_boost ? { color: colors.theme } : {}]}>{thirdPlace ? thirdPlace.name : ''}</Text>
                    </View> || <View style={commonStyles.flex3} />}
                    <View style={[commonStyles.flex3, commonStyles.colorWhite, commonStyles.center]}>
                        {thirdPlace && <Flag code={thirdPlace.nationality} size={24} type={'flat'}/>}
                        <Text style={[commonStyles.text20Inv, commonStyles.bold]}>3</Text>
                    </View>
                </View>

            </View>
        </TouchableOpacity>
    );
}