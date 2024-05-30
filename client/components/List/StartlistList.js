import React, {useState} from 'react';
import { View, Text, SectionList, TouchableOpacity } from 'react-native';
import Flag from 'react-native-flags';

import { commonStyles } from '../../styles/GlobalStyles';
import colors from '../../constants/colors';
import RiderStatModal from '../../modals/RiderStatModal';

export default function StartlistList(props) {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [rider, setRider] = useState({})

    const toggleModal = (item) => {
        setIsModalVisible(!isModalVisible);
        setRider(item);
    };

    const renderRider = ({ item }) => (
        <View>
            <TouchableOpacity style={commonStyles.startlistView} onPress={() => toggleModal(item)}>
                <View>
                    <Flag code={item.nationality} size={24} type={'flat'}/>
                </View>
                <View style={commonStyles.margin2Left}>
                    <Text style={[commonStyles.text13, item.is_boost ? { color: colors.theme } : {}]}>
                        {item.fullName}
                    </Text>
                </View>
            </TouchableOpacity>
            <RiderStatModal visible={isModalVisible} rider={rider} toggleModal={toggleModal} />
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
                keyExtractor={item => item.id.toString()}
                renderItem={renderRider}
                renderSectionHeader={renderSectionHeader}
                numColumns={2}
                stickySectionHeadersEnabled={false}
            />
        </View>
    );
}
