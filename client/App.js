import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, ImageBackground } from 'react-native';
import { MyContextProvider } from './context/MyContext';

import LoginPage from './pages/LoginPage';
import SigninPage from './pages/SigninPage';
import HomePage from './pages/HomePage';
import SplashScreen from './screens/SplashScreen';
import SplashScreenWait from './screens/SplashScreenWait';
import GridsPage from './pages/GridsPage';
import GridPage from './pages/GridPage';
import CardsPage from './pages/CardsPage';
import CategoryCardsPage from './pages/CategoryCardsPage';
import CrossWordsPage from './pages/CrossWordsPage';
import CrossWordPage from './pages/CrossWordPage';

const image = require('./assets/Fond.jpg');

const Stack = createStackNavigator();

function App() {
  return (
    <MyContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name='SplashScreen' 
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name='SplashScreenWait' 
            component={SplashScreenWait}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name='Login' 
            options={{ headerShown: false }}
          >
            {({ navigation, route }) => (
              <ImageBackground source={image} style={styles.image} resizeMode="cover">
                <LoginPage navigation={navigation} route={route} />
              </ImageBackground>
            )}
          </Stack.Screen>
          <Stack.Screen 
            name='Signin' 
            options={{ headerShown: false }}
          >
            {({ navigation, route }) => (
              <ImageBackground source={image} style={styles.image} resizeMode="cover">
                <SigninPage navigation={navigation} route={route} />
              </ImageBackground>
            )}
          </Stack.Screen>
          <Stack.Screen 
            name='Home' 
            options={{ headerShown: false }}
          >
            {({ navigation, route }) => (
              <ImageBackground source={image} style={styles.image} resizeMode="cover">
                <HomePage navigation={navigation} route={route} />
              </ImageBackground>
            )}
          </Stack.Screen>
          <Stack.Screen 
            name='Grids' 
            options={{ headerShown: false }}
          >
            {({ navigation, route }) => (
              <ImageBackground source={image} style={styles.image} resizeMode="cover">
                <GridsPage navigation={navigation} route={route} />
              </ImageBackground>
            )}
          </Stack.Screen>
          <Stack.Screen 
            name='Grid' 
            options={{ headerShown: false }}
          >
            {({ navigation, route }) => (
              <ImageBackground source={image} style={styles.image} resizeMode="cover">
                <GridPage navigation={navigation} route={route} />
              </ImageBackground>
            )}
          </Stack.Screen>
          <Stack.Screen 
            name='Cards' 
            options={{ headerShown: false }}
          >
            {({ navigation, route }) => (
              <ImageBackground source={image} style={styles.image} resizeMode="cover">
                <CardsPage navigation={navigation} route={route} />
              </ImageBackground>
            )}
          </Stack.Screen>
          <Stack.Screen 
            name='CategoryCards' 
            options={{ headerShown: false }}
          >
            {({ navigation, route }) => (
              <ImageBackground source={image} style={styles.image} resizeMode="cover">
                <CategoryCardsPage navigation={navigation} route={route} />
              </ImageBackground>
            )}
          </Stack.Screen>
          <Stack.Screen 
            name='CrossWords' 
            options={{ headerShown: false }}
          >
            {({ navigation, route }) => (
              <ImageBackground source={image} style={styles.image} resizeMode="cover">
                <CrossWordsPage navigation={navigation} route={route} />
              </ImageBackground>
            )}
          </Stack.Screen>
          <Stack.Screen 
            name='CrossWord' 
            options={{ headerShown: false }}
          >
            {({ navigation, route }) => (
              <ImageBackground source={image} style={styles.image} resizeMode="cover">
                <CrossWordPage navigation={navigation} route={route} />
              </ImageBackground>
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </MyContextProvider>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
});

export default App;
