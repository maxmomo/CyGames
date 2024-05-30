import React from 'react';
import { View, Text, Modal } from 'react-native';

import BasicTextInput from '../components/Basic/BasicTextInput';
import BasicButton from '../components/Basic/BasicButton';

import { commonStyles, modalStyles } from '../styles/GlobalStyles';

export default function CreateLeagueModal(props) {
    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={props.visible}
            onRequestClose={props.toggleModal}>
            <View style={modalStyles.modalView}>
                <View style={[commonStyles.margin2Top, {alignItems: 'center'}]}>
                    <Text style={[commonStyles.text24, commonStyles.bold]}>Créer une ligue</Text>
                </View>
                <View style={commonStyles.margin2Top}>
                    <BasicTextInput value={props.name} onChangeText={props.setName} placeholder={'Nom'} secureTextEntry={false} />
                </View>
                <View style={[commonStyles.margin5Top, commonStyles.center, commonStyles.row]}>
                    <BasicButton text={'Annuler'} onPress={props.toggleModal}/>
                    <BasicButton text={'Créer'} onPress={props.onPressCreate} />
                </View>
            </View>
        </Modal>
    );
}