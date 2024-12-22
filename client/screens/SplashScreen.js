import React, { useEffect } from 'react';
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { LogoMain } from '../components';
import colors from '../constants/colors';

export default function SplashScreen({ navigation }) {
  // Après un délai de 3 secondes, redirigez l'utilisateur vers l'écran de connexion
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Login");
    }, 1500);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <LogoMain />
      <ActivityIndicator color={colors.theme} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#14181D',
  },
  logo: {
    width: 300, // Ajustez selon vos besoins
    height: 300, // Ajustez selon vos besoins
    resizeMode: 'contain',
  },
});