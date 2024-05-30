import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import Flag from 'react-native-flags';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../../constants/colors';
import { commonStyles } from '../../styles/GlobalStyles';
import { deleteOffer } from '../../api/mercato/api';

export default function RidersOfferList(props) {

    const toggleModalList = (item) => {
        if (!props.isLoading) {
            if (item.offer) {
                props.setOffer(item.offer.toString()) 
            } else {
                props.setOffer(item.cost.toString())
            }
            props.setRider(item)
            props.toggleModal();
        }
    };

    const onPressDelete = async (item) => {
        try {
            await deleteOffer(props.state['ip_adress'], props.user_id, props.league_id, item.rider_id);
            props.onPressDelete();
        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }
    };

    const ListItem = ({ item, index }) => (
        <View style={[commonStyles.row, commonStyles.margin2]}>
            <View style={[commonStyles.flex2, commonStyles.center]}>
                <Flag code={item.nationality} size={24} type={'flat'}/>
            </View>
            <View style={[commonStyles.flex10, commonStyles.center]}>
                <Text style={commonStyles.text14}>{item.rider_name}</Text>
            </View>
            <View style={[commonStyles.flex4, commonStyles.center]}>
                <Text style={commonStyles.text14}>{item.team_abbreviation}</Text>
            </View>
            <View style={[commonStyles.flex3, commonStyles.center]}>
                <Text style={commonStyles.text14}>{item.cost}</Text>
            </View>
            {!props.mercato &&  <View style={[commonStyles.flex3, commonStyles.center]}>
                <Text style={commonStyles.text14}>{item.offer}</Text>
            </View>}
            {props.mercato && <TouchableOpacity onPress={() => toggleModalList(item)} disabled={props.isLoading}>
                <MaterialCommunityIcons name='plus' size={30} color={colors.theme} /> 
            </TouchableOpacity>}
            {!props.mercato && <TouchableOpacity onPress={() => onPressDelete(item)} disabled={props.isLoading}>
                <MaterialCommunityIcons name='delete-circle' size={30} color={colors.red} /> 
            </TouchableOpacity>}
        </View>
    )

    return (
        <View>
            <View style={styles.riderItem}>
                <View style={commonStyles.flex2} />
                <View style={commonStyles.flex10} />
                <View style={commonStyles.flex4} />
                <View style={[commonStyles.flex3, commonStyles.center]}>
                    <Text style={commonStyles.text14}>Coût</Text>
                </View>
                {!props.mercato && <View style={[commonStyles.flex3, commonStyles.center]}>
                    <Text style={commonStyles.text14}>Offre</Text>
                </View>}
                {props.mercato && <MaterialCommunityIcons name='plus' size={30} color={colors.backgroundLight} />}
                {!props.mercato && <MaterialCommunityIcons name='plus' size={30} color={colors.backgroundLight} />}
            </View>
            <FlatList
                data={props.offers}
                renderItem={({ item, index }) => <ListItem item={item} index={index} />}
                keyExtractor={item => item.rider_id.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    riderItem: {
        padding: '1%',
        borderBottomColor: colors.whiteText,
        borderBottomWidth: 1,
        flexDirection: 'row',
        marginHorizontal: '2%',
    }
});