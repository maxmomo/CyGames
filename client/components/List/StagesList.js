import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useMyContext } from '../../context/MyContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import RaceLogo from '../Basic/RaceLogo';

import { commonStyles } from '../../styles/GlobalStyles';
import colors from '../../constants/colors';

const logo_montain = require('../../assets/montain.png');
const logo_flat = require('../../assets/flat.png');
const logo_hilly = require('../../assets/hilly.png');

export default function StagesList(props) {

    const { state, dispatch } = useMyContext();

    const goStage = (item) => {
        dispatch({ type: 'SET_STAGE', payload: item });
        if (props.onItemPress) {
            props.onItemPress();
        }
    }

    const ListItem = ({ item, index }) => (
        <View style={commonStyles.listView}>
            <View style={[commonStyles.flex1]}>
                <Text style={commonStyles.text14}>{index + 1}</Text>
            </View>
            <View style={[commonStyles.flex5]}>
                <Text style={commonStyles.text14}>{item.departure}</Text>
            </View>
            <View style={[commonStyles.flex5]}>
                <Text style={commonStyles.text14}>{item.arrival}</Text>
            </View>
            <View style={[commonStyles.flex2]}>
               {item.profile_icone === 'p1' && <RaceLogo source={logo_flat} height={30} width={30} />}
               {(item.profile_icone === 'p2' || item.profile_icone === 'p3') && <RaceLogo source={logo_hilly} height={30} width={30} />}
               {(item.profile_icone === 'p4' || item.profile_icone === 'p5') && <RaceLogo source={logo_montain} height={30} width={30} />}
            </View>
            <TouchableOpacity onPress={() => goStage(item)}>
                <MaterialCommunityIcons name='arrow-right' size={24} color={colors.theme} />
            </TouchableOpacity>
        </View>
    )

    return (
        <View>
            <FlatList
                data={props.stages}
                renderItem={({ item, index }) => <ListItem item={item} index={index} />}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
}
