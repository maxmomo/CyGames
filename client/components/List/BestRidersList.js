import React from 'react';
import { View, Text, FlatList } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../../constants/colors';
import { commonStyles } from '../../styles/GlobalStyles';

export default function BestRidersList(props) {

    const ListItem = ({ item }) => (
        <View style={commonStyles.row}>
            {item.result_rank === 1 && <View style={[commonStyles.center, commonStyles.flex1]}>
                <MaterialCommunityIcons name='trophy' size={24} color={colors.gold} />
            </View>}
            {item.result_rank === 2 && <View style={[commonStyles.center, commonStyles.flex1]}>
                <MaterialCommunityIcons name='trophy' size={24} color={colors.silver} />
            </View>}
            {item.result_rank === 3 && <View style={[commonStyles.center, commonStyles.flex1]}>
                <MaterialCommunityIcons name='trophy' size={24} color={colors.bronze} />
            </View>}
            {item.result_rank > 3 && <View style={[commonStyles.center, commonStyles.flex1]}>
                <Text style={commonStyles.text13}>{item.result_rank}</Text>
            </View>}
            <View style={[commonStyles.flex4, commonStyles.centerVertical]}>
                <Text style={commonStyles.text13}>{item.rider_name}</Text>
            </View>
            <View style={[commonStyles.flex1, commonStyles.centerVertical]}>
                <Text style={commonStyles.text13}>{item.season}</Text>
            </View>
        </View>
    )

    return (
        <FlatList
            data={props.statistics}
            renderItem={({ item }) => <ListItem item={item} />}
            keyExtractor={item => item.id.toString()}
        />
    );
}