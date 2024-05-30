import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import BasicButton from '../components/Basic/BasicButton';

import { commonStyles, modalStyles } from '../styles/GlobalStyles';
import colors from '../constants/colors';

export default function InfoLeagueModal(props) {
    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={props.visible}
            onRequestClose={props.toggleModal}>
            <View style={modalStyles.modalView}>
                <View style={[commonStyles.margin2Top, commonStyles.center]}>
                    <Text style={[commonStyles.text24, commonStyles.bold]}>{props.league.name}</Text>
                </View>
                <View style={[commonStyles.margin5Top]}>
                    <Text style={[commonStyles.text16]}>Mot de passe : {props.league.password}</Text>
                </View>
                <View style={[commonStyles.margin2Top]}>
                    <Text style={[commonStyles.text16]}>Nombre de membres : {props.league.nb_users}</Text>
                </View>
                <TouchableOpacity style={[commonStyles.margin5Top, commonStyles.row, commonStyles.center]} onPress={props.onPressQuit}>
                    <View style={commonStyles.flex1}>
                        <MaterialCommunityIcons name='logout' size={25} color={colors.theme} />
                    </View>
                    <View style={commonStyles.flex10}>
                        <Text style={[commonStyles.text16]}>Quitter la ligue</Text>
                    </View>
                </TouchableOpacity>
                <View style={[commonStyles.margin5Top, commonStyles.center, commonStyles.row]}>
                    <BasicButton text={'Fermer'} onPress={props.toggleModal}/>
                </View>
            </View>
        </Modal>
    );
}