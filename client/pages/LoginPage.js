import { useState, useCallback } from 'react';
import { View, SafeAreaView, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useMyContext } from '../context/MyContext';

import { BasicButton, BasicTextInput, LogoMain } from '../components';

import { loginUser } from '../api/user/api';

import { commonStyles } from '../styles/GlobalStyles';

export default function LoginPage() {
    
    const { state, dispatch } = useMyContext();
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    /**
     * Déclenché lors de l'appuie sur le bouton se connecter 
     ** Si pas d'email ni de mot de passe saisi => Message d'alerte
     ** Si identifiants incorrects => Message d'alerte
     ** Si identifiants existent => Navigation vers Home 
    **/
    const onPressLogin = useCallback(async () => {
        if (!email || !password) {
            Alert.alert('Erreur', 'Veuillez entrer un email et un mot de passe.');
            return;
        }

        try {
            const data = await loginUser(state['ip_adress'], email, password);
            if (data === false) {
                Alert.alert('Erreur de connexion', 'Identifiants incorrects');
            } else {
                dispatch({ type: 'SET_USERNAME', payload: data });
                setEmail('')
                setPassword('')
                navigation.navigate('Home');
            }
        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }
    }, [email, password]);

    /**
     * Déclenché lors de l'appuie sur le bouton créer un compte
     ** Navigation vers Signin 
    **/
    const onPressSignin = useCallback(() => {
        navigation.navigate('Signin');
    }, [navigation]);

    return (
        <SafeAreaView style={[commonStyles.container]}>
            <View style={styles.logoView}>
                <LogoMain />
            </View>
            <View style={styles.inputsView}>
                <BasicTextInput 
                    value={email} 
                    onChangeText={setEmail} 
                    placeholder={'Email'} 
                    type={'email-address'} 
                />
                <BasicTextInput 
                    value={password} 
                    onChangeText={setPassword} 
                    placeholder={'Mot de passe'} 
                    secureTextEntry={true} 
                />
            </View>
            <View style={styles.buttonsView}>
                <BasicButton 
                    text={'Se connecter'} 
                    onPress={onPressLogin} 
                />
                <BasicButton 
                    text={'Créer un compte'} 
                    onPress={onPressSignin} 
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    logoView: {
        marginTop: '25%',
        alignItems: 'center',
    },
    inputsView: {
        marginTop: '10%',
        alignItems: 'center',
    },
    buttonsView: {
        marginTop: '15%',
        alignItems: 'center',
    }
});