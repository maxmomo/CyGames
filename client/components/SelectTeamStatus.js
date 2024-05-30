import React from 'react';
import { TouchableOpacity, FlatList, StyleSheet, Text } from 'react-native';
import colors from '../constants/colors';
import { commonStyles } from '../styles/GlobalStyles';


export default function SelectTeamStatus(props) {

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.pickerButton,
                { borderColor: props.selectedStatus === item ? colors.theme : colors.backgroundLight }
            ]}
            onPress={() => props.setSelectedStatus(item)}
        >
            <Text style={commonStyles.text12}>{item}</Text>
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={props.data}
            keyExtractor={(item) => item}
            renderItem={renderItem}
            numColumns={6}
            scrollEnabled={false}
        />
    );
}

const styles = StyleSheet.create({
    pickerButton: {
        backgroundColor: colors.backgroundLight,
        padding: '3%',
        marginHorizontal: '1%',
        borderRadius: 10,
        borderWidth: 1,
        flex: 1,
        alignItems: 'center'
    },
});