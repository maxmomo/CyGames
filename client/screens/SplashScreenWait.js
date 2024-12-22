import React from 'react';
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native';

export default function SplashScreenWait() {

  return (
    <View style={styles.container}>
      {/* Logo de l'application */}
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      {/* Vous pouvez ajouter ici une animation de chargement si vous le souhaitez */}
      <ActivityIndicator size="" color="#F2C238" />
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