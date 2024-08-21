import { useState, useCallback } from 'react';
import { View, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMyContext } from '../context/MyContext';

import { BasicButton, BasicTextInput, LogoMain } from '../components';

import { createUser } from '../api/user/api';

import { commonStyles } from '../styles/GlobalStyles';

export default function SigninPage() {
    
    const { state, dispatch } = useMyContext();
    const navigation = useNavigation();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUsername] = useState('');

    /**
     * Déclenché lors de l'appuie sur le bouton Créer utilisateur 
     ** Si pas d'email / mot de passe / nom d'utilisateur saisi => Message d'alerte
     ** Si identifiants existent => Message d'alerte
     ** Si identifiants n'existent pas => Navigation vers Home + création de l'utilisateur
    **/
    const onPressCreate = useCallback(async () => {
        try {
            if (!email || !password || !userName) {
                Alert.alert('Erreur', 'Veuillez entrer un email un nom d\'utilisateur et un mot de passe.');
                return;
            }

            const data = await createUser(state['ip_adress'], email, userName, password);
            if (data === false) {
                Alert.alert('Erreur de connexion', 'L\'utilisateur existe déjà');
            } else {
                dispatch({ type: 'SET_USERNAME', payload: data });
                navigation.navigate('Home');
            }
        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }
    }, [email, password, userName]);

    /**
     * Déclenché lors de l'appuie sur le bouton se connecter
     ** Navigation vers Login 
    **/
     const onPressLogin = useCallback(() => {
        navigation.navigate('Login');
    }, [navigation]);

    return (
        <SafeAreaView style={commonStyles.container}>
            <View style={commonStyles.logoView}>
                <LogoMain />
            </View>
            <View style={commonStyles.inputsView}>
                <BasicTextInput 
                    value={email} 
                    onChangeText={setEmail} 
                    placeholder={'Email'} 
                    type={'email-address'} 
                />
                <BasicTextInput 
                    value={userName} 
                    onChangeText={setUsername} 
                    placeholder={'Nom d\'utilisateur'} 
                />
                <BasicTextInput 
                    value={password} 
                    onChangeText={setPassword} 
                    placeholder={'Mot de passe'} 
                    type={'visible-password'} 
                    secureTextEntry={true} 
                />
            </View>
            <View style={commonStyles.buttonsView}>
                <BasicButton 
                    text={'Créer utilisateur'} 
                    onPress={onPressCreate} 
                />
                <BasicButton 
                    text={'Se connecter'} 
                    onPress={onPressLogin} 
                />
            </View>
        </SafeAreaView>
    );
}