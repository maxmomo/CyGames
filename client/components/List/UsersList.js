import React, {useState}  from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useMyContext } from '../../context/MyContext';

import RankingInformationModal from '../../modals/RankingInformationModal';

import { commonStyles } from '../../styles/GlobalStyles';
import colors from '../../constants/colors';

export default function UsersList(props) {

    const { state, dispatch } = useMyContext();

    const [isModalVisible, setIsModalVisible] = useState(false);

    const toggleModalList = async (item) => {

        dispatch({ type: "SET_USER_SELECTED", payload: item });
        toggleModal();

    };

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const ListItem = ({ item, index }) => (
        <View style={[commonStyles.row, commonStyles.flex1]}>
            <View style={[commonStyles.flex1, commonStyles.row, commonStyles.alignCenter]}>
                <View style={[commonStyles.margin2]}>
                    <Avatar
                        size='medium'
                        rounded
                        source={{ uri: item.avatar ? `data:image/jpeg;base64,${item.avatar}` : null }}
                        overlayContainerStyle={{borderWidth: 2, borderColor: colors.whiteText}}
                    />
                </View>
                <Text style={commonStyles.text16}>{item.userName}</Text>
            </View>
            <View style={[commonStyles.flex1, commonStyles.row, commonStyles.alignCenter]}>
                <Text style={[commonStyles.text16, commonStyles.margin2Right]}>{item.points}</Text>
            </View>
            {(props.type === 'race' || props.type === 'stage') && <TouchableOpacity style={[commonStyles.row, commonStyles.alignCenter, commonStyles.margin2Right]} onPress={() => toggleModalList(item)}>
                <MaterialCommunityIcons name='information-outline' size={24} color={colors.theme} />
            </TouchableOpacity>}
            <RankingInformationModal visible={isModalVisible} toggleModal={toggleModal} user_id={user_id} type={props.type} />
        </View>
    )

    return (
        <View>
            <FlatList
                data={props.users}
                renderItem={({ item, index }) => <ListItem item={item} index={index} />}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
}
