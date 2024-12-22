import React, { useState, useCallback } from 'react';
import { View, SafeAreaView, Alert, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMyContext } from '../context/MyContext';

import { BasicButton, BasicTextInput, LogoMain, Wave } from '../components';

import { loginUser } from '../api/user/api';

import colors from '../constants/colors';

export default function LoginPage() {

    const { state, dispatch } = useMyContext();
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onPressLogin = useCallback(async () => {
        if (!email || !password) {
            Alert.alert('Erreur', 'Veuillez entrer un email et un mot de passe.');
            return;
        }

        try {
            const data = await loginUser(state['ip_adress'], email, password);
            if (!data) {
                Alert.alert('Erreur de connexion', 'Identifiants incorrects');
            } else {
                dispatch({ type: 'SET_USERNAME', payload: data });
                setEmail('');
                setPassword('');
                navigation.navigate('Home');
            }
        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }
    }, [email, password]);

    const onPressSignin = useCallback(() => {
        navigation.navigate('Signin');
    }, [navigation]);

    return (
        <SafeAreaView style={styles.container}>
            {/* Section supérieure avec la vague */}
            <View style={styles.topSection}>
                <Wave />
                <View style={styles.logo}>
                    <LogoMain />
                </View>
            </View>

            {/* Section de formulaire avec gestion du clavier */}
            <KeyboardAvoidingView
                style={styles.formSection}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <BasicTextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email"
                    type="email-address"
                />
                <BasicTextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Mot de passe"
                    secureTextEntry
                />
            </KeyboardAvoidingView>

            {/* Section de bouton */}
            <View style={styles.buttonSection}>
                <BasicButton text="Se connecter" onPress={onPressLogin} />
                <BasicButton text="Créer un compte" onPress={onPressSignin} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    topSection: {
        backgroundColor: colors.top, 
        flex: 1
    },
    wave: {
        position: 'absolute',
        bottom: 0,
    },
    logo:{
        flex: 1,
        alignItems: 'center',
        marginTop: '15%',
    },
    formSection: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonSection: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});