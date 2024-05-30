import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';

import BasicButton from '../components/Basic/BasicButton';
import { useNavigation } from '@react-navigation/native';

import { commonStyles, modalStyles } from '../styles/GlobalStyles';
import RiderModal from '../components/Basic/RiderModal';
import TitleRider from '../components/Title/TitleRider';
import colors from '../constants/colors';

export default function RiderStatModal(props) {
    
    const navigation = useNavigation();

    const getPointsStyle = (points) => {
        if (points >= 70 && points < 80) {
            return {color: colors.green};
        } else if (points >= 80 && points < 90) {
            return {color: colors.orange};
        } else if (points >= 90) {
            return {color: colors.red};
        }
    };

    const onPress = (id) => {
        navigation.navigate("Team", {id})
        props.toggleModal();
    };

    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={props.visible}
            onRequestClose={props.toggleModal}>
            {props.rider && <View style={[modalStyles.modalView]}>
                <View style={commonStyles.margin2Top}>
                    <TitleRider name={props.rider.fullName} nationality={props.rider.nationality} />
                </View>
                <View style={[commonStyles.row, commonStyles.margin2Top]}>
                    <View style={styles.statView}>
                        <TouchableOpacity onPress={() => onPress(props.rider.team_id)} >
                            <Text style={[commonStyles.text14, commonStyles.themeText]}>Equipe : {props.rider.team_name}</Text>
                        </TouchableOpacity>
                        <Text style={commonStyles.text14}>Date de naissance : {props.rider.birthdate}</Text>
                        <Text style={commonStyles.text14}>Ville de naissance : {props.rider.place_of_birth}</Text>
                        <Text style={commonStyles.text14}>Poids : {props.rider.weight} kg</Text>
                        <Text style={commonStyles.text14}>Taille : {props.rider.height} m</Text>
                    </View>
                    <View style={styles.statView}>
                    </View>
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
                <View style={[commonStyles.margin2Top, {alignItems: 'center'}]}>
                    <BasicButton text={'Fermer'} onPress={props.toggleModal}/>
                </View>
            </View>}
        </Modal>
    );
}

const styles = StyleSheet.create({
    statView: {
        justifyContent: 'space-between'
    }
});