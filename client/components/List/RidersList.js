import React from 'react';
import { View, Text, FlatList } from 'react-native';

import Flag from 'react-native-flags';
import { commonStyles } from '../../styles/GlobalStyles';

export default function RidersList(props) {

    const getPointsStyle = (points) => {
        if (points >= 70 && points < 80) {
            return [commonStyles.text13, commonStyles.greenText];
        } else if (points >= 80 && points < 90) {
            return [commonStyles.text13, commonStyles.orangeText];
        } else if (points >= 90) {
            return [commonStyles.text13, commonStyles.redText];
        } else {
            return commonStyles.text13;
        }
    };

    const ListItem = ({ item }) => (
        <View style={commonStyles.listView}>
            <View style={[commonStyles.flex1, commonStyles.center]}>
                <Flag code={item.nationality} size={24} type={'flat'}/>
            </View>
            <View style={[commonStyles.flex4, commonStyles.centerVertical]}>
                <Text style={commonStyles.text13}>{item.fullName}</Text>
            </View>
            <View style={[commonStyles.flex1, commonStyles.center]}>
                <Text style={getPointsStyle(item.odr_points)}>{item.odr_points}</Text>
            </View>
            <View style={[commonStyles.flex1, commonStyles.center]}>
                <Text style={getPointsStyle(item.gc_points)}>{item.gc_points}</Text>
            </View>
            <View style={[commonStyles.flex1, commonStyles.center]}>
                <Text style={getPointsStyle(item.tt_points)}>{item.tt_points}</Text>
            </View>
            <View style={[commonStyles.flex1, commonStyles.center]}>
                <Text style={getPointsStyle(item.sprint_points)}>{item.sprint_points}</Text>
            </View>
            <View style={[commonStyles.flex1, commonStyles.center]}>
                <Text style={getPointsStyle(item.climb_points)}>{item.climb_points}</Text>
            </View>
        </View>
    )

    return (
        <View style={commonStyles.flex1}>
            <View style={commonStyles.row}>
                <View style={[commonStyles.flex5, commonStyles.center]} />
                <View style={[commonStyles.flex1, commonStyles.center]} >
                    <Text style={commonStyles.text13}>ODR</Text>
                </View>
                <View style={[commonStyles.flex1, commonStyles.center]} >
                    <Text style={commonStyles.text13}>GC</Text>
                </View>
                <View style={[commonStyles.flex1, commonStyles.center]} >
                    <Text style={commonStyles.text13}>CLM</Text>
                </View>
                <View style={[commonStyles.flex1, commonStyles.center]} >
                    <Text style={commonStyles.text13}>SPR</Text>
                </View>
                <View style={[commonStyles.flex1, commonStyles.center]} >
                    <Text style={commonStyles.text13}>MON</Text>
                </View>
            </View>
            <FlatList
                data={props.riders}
                renderItem={({ item }) => <ListItem item={item} />}
                keyExtractor={item => item.id.toString()}
            />

        </View>
    );
}