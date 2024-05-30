import React from 'react';
import { TouchableOpacity, FlatList, Text, StyleSheet, View } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../../constants/colors';
import { commonStyles } from '../../styles/GlobalStyles';

export default function CardLeagues(props) {

    const onPressInfo = (item) => {
        props.onPressInfo(item)
        props.setLeague(item)
    };

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.card} onPress={() => props.onPress(item)}>
                <View style={[commonStyles.flex1, commonStyles.row]}>
                    <View style={commonStyles.flex10}>
                        <Text style={[commonStyles.text20, commonStyles.bold]}>{item.name}</Text>
                    </View>
                    <TouchableOpacity style={commonStyles.flex1} onPress={() => onPressInfo(item)}>
                        <MaterialCommunityIcons name='dots-horizontal' size={25} color={props.active ? colors.theme : colors.inactive} />
                    </TouchableOpacity>
                </View>
                <View style={[commonStyles.flex1, commonStyles.margin2Top]}>
                    <Text style={commonStyles.text14}>Classement : {item.ranking} / {item.nb_users}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <FlatList
            data={props.leagues}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            numColumns={1}
            showsVerticalScrollIndicator={false}
        />
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1, 
        padding: '5%', 
        backgroundColor: colors.card, 
        margin: '3%', 
        borderRadius: 10,
    }
});