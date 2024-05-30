import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import colors from '../../constants/colors';
import { commonStyles } from '../../styles/GlobalStyles';

export default function TeamResultList(props) {
    const ListItem = ({ item }) => (
        <View style={styles.listView}>
            <View style={[commonStyles.flex1, commonStyles.centerVertical, commonStyles.padding1]}>
                <Text style={commonStyles.text13}>{item.season}</Text>
            </View>
            <View style={[commonStyles.flex4, commonStyles.centerVertical, commonStyles.padding1]}>
                <Text style={commonStyles.text13}>{item.stage_name}</Text>
            </View>
            <View style={[commonStyles.flex2, commonStyles.centerVertical, commonStyles.padding1]}>
                <Text style={commonStyles.text13}>{item.rider_name}</Text>
            </View>
        </View>
    )

    return (
        <FlatList
            data={props.statistics}
            renderItem={({ item }) => <ListItem item={item} />}
            keyExtractor={item => item.stage_id}
        />
    );
}

const styles = StyleSheet.create({
    listView: {
        padding: '2%',
        borderBottomColor: colors.whiteText,
        borderBottomWidth: 1,
        flexDirection: 'row',
        flex: 1,
    },
});