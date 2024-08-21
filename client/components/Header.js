import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../constants/colors';

function Header(props) {

    const navigation = useNavigation();

    const onPressProfile = () => {
        if (navigation) {
            navigation.navigate('ProfileMenu')
        }
    };

    return (
        <View style={styles.header}>
            {props.is_navigation && <TouchableOpacity onPress={() => navigation.goBack()} style={styles.icon}>
                <MaterialCommunityIcons name='arrow-left' size={30} color={colors.theme} />
            </TouchableOpacity> ||
            <TouchableOpacity style={styles.icon}>
                <MaterialCommunityIcons name='arrow-left' size={30} color={colors.backgroundLight} />
            </TouchableOpacity>
            }
            <View style={styles.title}>
                <Image source={require('../assets/logo.png')} style={styles.logo} />
            </View>
            {!props.is_profile && <TouchableOpacity style={styles.icon} onPress={onPressProfile}>
                <MaterialCommunityIcons name='account-circle' size={30} color={props.active || typeof(props.active) == 'undefined' ? colors.theme : colors.inactive} />
            </TouchableOpacity> ||
            <TouchableOpacity style={styles.icon}>
                <MaterialCommunityIcons name='account-circle' size={30} color={colors.backgroundLight} />
            </TouchableOpacity>
            }
        </View>
    );

}
const styles = StyleSheet.create({
    header: {
        height: '10%',
        alignItems: 'center',
        backgroundColor: colors.backgroundLight,
        flexDirection: 'row'
    },
    icon: {
        color: colors.theme,
        flex: 1,
        alignItems: 'center'
    },
    title: {
        flex: 4,
        alignItems: 'center',
    },
    logo: {
        width: '60%',
        resizeMode: 'contain',
    },
});

export default Header;