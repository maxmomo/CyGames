import React, {useState, useEffect } from 'react';
import { View, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMyContext } from '../context/MyContext';
import { Avatar } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';

import Header from '../components/Basic/Header';

import { setAvatarUser } from '../api/user/api';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { commonStyles } from '../styles/GlobalStyles';
import colors from '../constants/colors';

export default function ProfileMenuPage() {

    const navigation = useNavigation();
    const { state, dispatch } = useMyContext();

    const user_id = state['user']['id']
    const user = state['user']

    const [avatarBase64, setAvatarBase64] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need media library permissions to make this work!');
            }
        })();
        setAvatarBase64(user['avatar'])
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.1, // Réduisez la qualité pour une taille d'image plus petite
            base64: true,
        });
    
        if (!result.canceled && result.assets) {
            const firstAsset = result.assets[0];
            const base64 = firstAsset.base64;

            setAvatarBase64(base64); // Pour l'affichage dans l'UI
            user['avatar'] = base64;
            dispatch({ type: 'SET_USER', payload: user });
            await setAvatarUser(state['ip_adress'], user_id, base64); // Pour l'envoi au serveur
        }
    };


    const onPressDisconnect = () => {
        dispatch({ type: 'SET_USERNAME', payload: '' });
        dispatch({ type: 'SET_TEAM', payload: '' });
        dispatch({ type: 'SET_STATISTICS', payload: [] });
        dispatch({ type: 'SET_RACE_STATISTIC', payload: '' });
        dispatch({ type: 'SET_LEAGUE', payload: '' });
        dispatch({ type: 'SET_NEXT_RACE', payload: {} });
        dispatch({ type: 'SET_RACE', payload: {} });
        navigation.navigate('Login');
    };

    return (
        <SafeAreaView style={commonStyles.containerLight}>
            <Header is_navigation={true} is_profile={true} />
            <View>
                <View style={commonStyles.center}>
                    <Avatar
                        size="xlarge"
                        rounded
                        source={{ uri: avatarBase64 ? `data:image/jpeg;base64,${avatarBase64}` : null }}
                        onPress={pickImage}
                        showEditButton
                        overlayContainerStyle={{borderWidth: 2, borderColor: colors.theme}}
                    />
                </View>
                <TouchableOpacity style={[commonStyles.row, commonStyles.margin2, commonStyles.margin5Top]} onPress={() => {/* Handle password change */}}>
                    <Text style={commonStyles.text18}>Modifier mon mot de passe</Text>
                    <MaterialCommunityIcons name='arrow-right' size={24} color={colors.theme} />
                </TouchableOpacity>
                <TouchableOpacity style={[commonStyles.row, commonStyles.margin2]} onPress={() => {/* Handle email change */}}>
                    <Text style={commonStyles.text18}>Modifier mon adresse mail</Text>
                    <MaterialCommunityIcons name='arrow-right' size={24} color={colors.theme} />
                </TouchableOpacity>
                <TouchableOpacity style={[commonStyles.row, commonStyles.margin2]} onPress={() => {/* Handle username change */}}>
                    <Text style={commonStyles.text18}>Modifier mon nom d'utilisateur</Text>
                    <MaterialCommunityIcons name='arrow-right' size={24} color={colors.theme} />
                </TouchableOpacity>
                <TouchableOpacity style={[commonStyles.row, commonStyles.margin2]} onPress={onPressDisconnect}>
                    <Text style={[commonStyles.text18, commonStyles.colorRed]}>Déconnexion</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[commonStyles.row, commonStyles.margin2]} onPress={() => {/* Handle account deletion */}}>
                    <Text style={[commonStyles.text18, commonStyles.colorRed]}>Supprimer mon compte</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}