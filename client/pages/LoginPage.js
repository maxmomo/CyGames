import React, { useState, useCallback } from 'react';
import { View, SafeAreaView, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMyContext } from '../context/MyContext';

import BasicButton from '../components/BasicButton';
import BasicTextInput from '../components/BasicTextInput';

import { loginUser } from '../api/user/api';

import { commonStyles } from '../styles/GlobalStyles';
import colors from '../constants/colors';

export default function LoginPage() {
    
    const { state, dispatch } = useMyContext();
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onPressLogin = useCallback(async () => {
        try {
            const data = await loginUser(state['ip_adress'], email, password);
            if (data === false) {
                Alert.alert('Erreur de connexion', 'Identifiants incorrects', [{ text: 'OK' }]);
            } else {
                dispatch({ type: 'SET_USERNAME', payload: data });
                setEmail('')
                setPassword('')
                navigation.navigate('Home');
            }
        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }
    }, [email, password, state, dispatch, navigation]);

    const onPressSignin = useCallback(() => {
        navigation.navigate('Signin');
    }, [navigation]);

    return (
        <SafeAreaView style={[commonStyles.container, {alignItems: 'center', backgroundColor: colors.background}]}>
            <View style={styles.logoView}>
                {/* <Logo width={250} height={200} /> */}
            </View>
            <View style={styles.inputsView}>
                <BasicTextInput type={'email-address'} value={email} onChangeText={setEmail} placeholder={'Email'} secureTextEntry={false} />
                <BasicTextInput value={password} onChangeText={setPassword} placeholder={'Mot de passe'} secureTextEntry={true} />
            </View>
            <View style={styles.buttonsView}>
                <BasicButton text={'Se connecter'} onPress={onPressLogin} />
                <BasicButton text={'Créer un compte'} onPress={onPressSignin} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    logoView: {
        marginTop: '15%'
    },
    inputsView: {
        width: '100%',
        marginTop: '8%'
    },
    inputView: {
        width: '100%',
        alignItems: 'center',
        marginTop: '5%'
    },
    buttonsView: {
        marginTop: '8%'
    }
});