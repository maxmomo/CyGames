import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';

import { FontAwesome } from '@expo/vector-icons'
import { commonStyles } from '../styles/GlobalStyles';
import colors from '../constants/colors';

export default function TeamInformation(props) {

    const openURL = (url) => {
        Linking.openURL(url).catch(err => console.error('Erreur lors du chargement', err));
    };

    return (
        <View style={[commonStyles.flex1, commonStyles.row, commonStyles.margin2Left]}>
            <View style={commonStyles.flex1}>
                <View style={[commonStyles.row, commonStyles.margin3Bottom]}>
                    <Text style={commonStyles.text13}>Année : </Text>
                    <Text style={[commonStyles.text13, commonStyles.bold]}>{props.team.year}</Text>
                </View>
                <View style={[commonStyles.row, commonStyles.margin3Bottom]}>
                    <Text style={commonStyles.text13}>Abreviation : </Text>
                    <Text style={[commonStyles.text13, commonStyles.bold]}>{props.team.abbreviation}</Text>
                </View>
                <View style={[commonStyles.row, commonStyles.margin3Bottom]}>
                    <Text style={commonStyles.text13}>Statut : </Text>
                    <Text style={[commonStyles.text13, commonStyles.bold]}>{props.team.status}</Text>
                </View>
                <View style={[commonStyles.row, commonStyles.margin3Bottom]}>
                    <Text style={commonStyles.text13}>Vélo : </Text>
                    <Text style={[commonStyles.text13, commonStyles.bold]}>{props.team.bike}</Text>
                </View>
            </View>
            <View style={commonStyles.flex1}>
                {props.team.twitter && <TouchableOpacity onPress={() => openURL(props.team.twitter)}>
                    <FontAwesome name='twitter' size={24} color={colors.whiteText} style={commonStyles.margin3Bottom} />
                </TouchableOpacity>}
                {props.team.facebook && <TouchableOpacity onPress={() => openURL(props.team.facebook)}>
                    <FontAwesome name='facebook' size={24} color={colors.whiteText} style={commonStyles.margin3Bottom} />
                </TouchableOpacity>}
                {props.team.instagram && <TouchableOpacity onPress={() => openURL(props.team.instagram)}>
                    <FontAwesome name='instagram' size={24} color={colors.whiteText} style={commonStyles.margin3Bottom} />
                </TouchableOpacity>}
            </View>
        </View>
    );
}