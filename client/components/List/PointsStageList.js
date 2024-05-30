import React from 'react';
import { View, Text, SectionList } from 'react-native';
import Flag from 'react-native-flags';

import { commonStyles } from '../../styles/GlobalStyles';
import colors from '../../constants/colors';

export default function PointsStageList(props) {

    const renderRider = ({ item }) => (
        <View style={commonStyles.startlistView}>
            <View>
                <Flag code={item.rider_nationality} size={24} type={'flat'}/>
            </View>
            <View style={commonStyles.margin2Left}>
                <Text style={[commonStyles.text13, item.is_boost ? { color: colors.theme } : {}]}>
                    {item.rider_name}
                </Text>
            </View>
        </View>
    );

    const renderSectionHeader = ({ section }) => (
        <View style={[commonStyles.listView]}>
            <View>
                <Flag code={section.team_nationality} size={24} type={'flat'}/>
            </View>
            <View style={commonStyles.margin2Left}>
                <Text style={commonStyles.text16}>{section.title}</Text>
            </View>
        </View>
    );

    return (
        <View style={commonStyles.flex1}>
            <SectionList
                sections={props.startlist}
                keyExtractor={item => item.rider_id.toString()}
                renderItem={renderRider}
                renderSectionHeader={renderSectionHeader}
                numColumns={2}
                stickySectionHeadersEnabled={false}
            />
        </View>
    );
}
