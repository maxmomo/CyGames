import React from 'react';
import { View, Text, FlatList } from 'react-native';

import Portrait from '../components/Basic/Portrait';
import { commonStyles } from '../styles/GlobalStyles';

export default function Prediction(props) {

    const needsFiller = () => {
        const numItems = props.riders.length;
        const numColumns = 3;
        if ((numItems + 1) % numColumns === 0) {
            return 1
        } else if (numItems % numColumns !== 0) {
            return 2
        } else {
            return 0
        }
    };

    let dataWithFiller = needsFiller() !== 0 ? [...props.riders, { isFiller: true }] : props.riders;

    const renderRiders = ({ item }) => {
        // Rendre un élément vide pour la vue de remplissage
        if (item.isFiller) {
            if (needsFiller() === 1) {
                return <View style={[commonStyles.flex1, commonStyles.margin1]} />;
            } else {
                return <View style={[commonStyles.flex2, commonStyles.margin1]} />;
            }
        }

        // Rendu normal pour les autres éléments
        return (
            <View style={[commonStyles.flex1, commonStyles.margin2]}>   
                <Portrait picture={item.rider_picture} width={200} height={120} />
                <View style={commonStyles.center}>
                    <Text style={commonStyles.text14}>{item.rider_name}</Text>
                </View>
            </View>
        );
    };

    return (
            <View style={[commonStyles.containerLight]}>
                {props.riders && 
                <FlatList
                    data={dataWithFiller}
                    renderItem={renderRiders}
                    keyExtractor={(item, index) => item.rider_id ? item.rider_id.toString() : 'filler-' + index}
                    numColumns={3}
                />}
            </View>
    );
}