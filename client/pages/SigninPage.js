import { useState } from 'react';
import { View, SafeAreaView, Alert, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMyContext } from '../context/MyContext';

import { BasicButton, BasicTextInput, Wave } from '../components';

import { createUser } from '../api/user/api';

import colors from '../constants/colors';

export default function SigninPage() {
    
    const { state, dispatch } = useMyContext();
    const navigation = useNavigation();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUsername] = useState('');

    const onPressCreate = async () => {
        try {
            if (!email || !password || !userName) {
                Alert.alert('Erreur', 'Veuillez entrer un email un nom d\'utilisateur et un mot de passe.');
                return;
            }

            const data = await createUser(state['ip_adress'], email, userName, password);
            if (data === false) {
                Alert.alert('Erreur de connexion', 'L\'utilisateur existe déjà');
            } else {
                dispatch({ type: 'SET_USER', payload: data });
                navigation.navigate('Home');
            }
        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }
    };

    const onPressLogin = () => {
        navigation.navigate('Login');
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Section supérieure avec la vague */}
            <View style={styles.topSection}>
                <Wave />
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
                    value={userName} 
                    onChangeText={setUsername} 
                    placeholder={'Nom d\'utilisateur'} 
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
                <BasicButton text="Créer utilisateur" onPress={onPressCreate} />
                <BasicButton text="Se connecter" onPress={onPressLogin} />
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