import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useMyContext } from '../../context/MyContext';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../../constants/colors';
import { commonStyles } from '../../styles/GlobalStyles';

export default function HistoryTeamList(props) {

    const { state, dispatch } = useMyContext();

    const goTeam = (item) => {
        dispatch({ type: 'SET_TEAM', payload: item });
        if (props.onItemPress) {
            props.onItemPress();
        }
    }

    const ListItem = ({ item }) => (
        <View style={[commonStyles.row, commonStyles.padding1]}>
            <View style={commonStyles.flex2}>
                <Text style={commonStyles.text13}>{item.year}</Text>
            </View>
            <View style={commonStyles.flex5}>
                <Text style={commonStyles.text13}>{item.name}</Text>
            </View>
            <TouchableOpacity style={commonStyles.flex1} onPress={() => goTeam(item)}>
                <MaterialCommunityIcons name='arrow-right' size={16} color={colors.theme} />
            </TouchableOpacity>
        </View>
    )

    return (
        <FlatList
            data={props.history}
            renderItem={({ item }) => <ListItem item={item} />}
            keyExtractor={item => item.url}
        />
    );
}