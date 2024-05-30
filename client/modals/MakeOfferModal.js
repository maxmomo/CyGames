import React from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';

import BasicTextInput from '../components/Basic/BasicTextInput';
import BasicButton from '../components/Basic/BasicButton';

import { commonStyles, modalStyles } from '../styles/GlobalStyles';
import RiderModal from '../components/Basic/RiderModal';
import TitleRider from '../components/Title/TitleRider';
import colors from '../constants/colors';

export default function MakeOfferModal(props) {

    const getPointsStyle = (points) => {
        if (points >= 70 && points < 80) {
            return {color: colors.green};
        } else if (points >= 80 && points < 90) {
            return {color: colors.orange};
        } else if (points >= 90) {
            return {color: colors.red};
        }
    };
    
    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={props.visible}
            onRequestClose={props.toggleModal}>
            <View style={[modalStyles.modalView]}>
                <View style={commonStyles.margin2Top}>
                    <TitleRider name={props.rider.rider_name + ' : ' + props.rider.cost + 'M'} nationality={props.rider.nationality} />
                </View>
                <View style={[commonStyles.row, commonStyles.margin5Top]}>
                    <RiderModal height={150} width={150} picture={props.rider.picture}/>
                    <View style={styles.statView}>
                        <Text style={commonStyles.text14}>Courses d'un jour : </Text>
                        <Text style={commonStyles.text14}>Classement général : </Text>
                        <Text style={commonStyles.text14}>Contre la montre : </Text>
                        <Text style={commonStyles.text14}>Sprint : </Text>
                        <Text style={commonStyles.text14}>Montagne : </Text>
                    </View>
                    <View style={styles.statView}>
                        <Text style={[commonStyles.text14, getPointsStyle(props.rider.odr_points)]}>{props.rider.odr_points}</Text>
                        <Text style={[commonStyles.text14, getPointsStyle(props.rider.gc_points)]}>{props.rider.gc_points}</Text>
                        <Text style={[commonStyles.text14, getPointsStyle(props.rider.tt_points)]}>{props.rider.tt_points}</Text>
                        <Text style={[commonStyles.text14, getPointsStyle(props.rider.sprint_points)]}>{props.rider.sprint_points}</Text>
                        <Text style={[commonStyles.text14, getPointsStyle(props.rider.climb_points)]}>{props.rider.climb_points}</Text>
                    </View>
                </View>
                <View style={commonStyles.margin2Top}>
                    <BasicTextInput value={props.offer} onChangeText={props.setOffer} placeholder={'Offre...'} type={'numbers-and-punctuation'} secureTextEntry={false} />
                </View>
                <View style={[commonStyles.margin2Top, {alignItems: 'center'}]}>
                    <BasicButton text={'Faire une offre'} onPress={props.onPressValidate} />
                    <BasicButton text={'Annuler'} onPress={props.toggleModal}/>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    statView: {
        justifyContent: 'space-between'
    }
});