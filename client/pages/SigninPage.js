import React, { useState, useCallback } from 'react';
import { View, SafeAreaView, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMyContext } from '../context/MyContext';

import BasicButton from '../components/Basic/BasicButton';
import BasicTextInput from '../components/Basic/BasicTextInput';
import Logo from '../components/Basic/Logo';

import { createUser } from '../api/user/api';

import { commonStyles } from '../styles/GlobalStyles';

export default function SigninPage() {
    
    const { state, dispatch } = useMyContext();
    const navigation = useNavigation();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUsername] = useState('');

    const onPressCreate = useCallback(async () => {
        try {
            const data = await createUser(state['ip_adress'], email, userName, password);
            if (data === false) {
                Alert.alert('Erreur de connexion', 'Identifiants incorrects', [{ text: 'OK' }]);
            } else {
                dispatch({ type: 'SET_USERNAME', payload: data });
                navigation.navigate('Home');
            }
        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }
    }, [email, password, state, dispatch, navigation]);

    return (
        <SafeAreaView style={[commonStyles.container, {alignItems: 'center'}]}>
            <View style={styles.logoView}>
                <Logo width={250} height={200} />
            </View>
            <View style={styles.inputsView}>
                <View style={styles.inputView}>
                    <BasicTextInput type={'email-address'} value={email} onChangeText={setEmail} placeholder={'Email'} secureTextEntry={false} />
                </View>
                <View style={styles.inputView}>
                    <BasicTextInput value={userName} onChangeText={setUsername} placeholder={'Nom d\'utilisateur'} secureTextEntry={false} />
                </View>
                <View style={styles.inputView}>
                    <BasicTextInput type={'visible-password'} value={password} onChangeText={setPassword} placeholder={'Mot de passe'} secureTextEntry={true} />
                </View>
            </View>
            <View style={styles.buttonsView}>
                <View>
                    <BasicButton text={'Créer'} onPress={onPressCreate} />
                </View>
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