import React from 'react';
import { View, Text, SectionList } from 'react-native';
import Flag from 'react-native-flags';

import { commonStyles } from '../../styles/GlobalStyles';
import colors from '../../constants/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TitleRiders from '../Title/TitleRiders';

export default function HistoryList(props) {
    const renderUser = ({ item }) => (
        <View style={[commonStyles.flex1, commonStyles.row]}>
            <View style={[commonStyles.margin2, commonStyles.row, commonStyles.flex1]}>
                <Text style={[commonStyles.text13, commonStyles.flex5]}>
                    {item.userName}
                </Text>
                <Text style={[commonStyles.text13, commonStyles.margin2Left, commonStyles.flex1]}>
                    {item.offer}
                </Text>
                <View style={[commonStyles.flex1, commonStyles.center]}>
                    {item.state === 2 && <MaterialCommunityIcons name='close' size={16} color={colors.red} />}
                    {item.state === 1 && <MaterialCommunityIcons name='check' size={16} color={colors.green} />}
                </View>
            </View>
            <View style={commonStyles.flex1}>
            </View>
        </View>
    );

    const renderSectionHeader = ({ section }) => (
        <View style={commonStyles.flex1}>
            <TitleRiders name={section.fullName} nationality={section.nationality} />
        </View>
    );

    return (
        <View style={commonStyles.flex1}>
            <SectionList
                sections={props.history}
                keyExtractor={item => item.userName.toString()}
                renderItem={renderUser}
                renderSectionHeader={renderSectionHeader}
                numColumns={2}
                stickySectionHeadersEnabled={false}
            />
        </View>
    );
}