import React, { useEffect } from 'react';
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native';

export default function SplashScreen({ navigation }) {
  // Après un délai de 3 secondes, redirigez l'utilisateur vers l'écran de connexion
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Login");
    }, 1500);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Logo de l'application */}
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      {/* Vous pouvez ajouter ici une animation de chargement si vous le souhaitez */}
      <ActivityIndicator size="large" color="#F2C238" />
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