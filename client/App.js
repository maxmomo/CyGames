import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import { MyContextProvider } from './context/MyContext';

import LoginPage from './pages/LoginPage';
import SigninPage from './pages/SigninPage';
import HomePage from './pages/HomePage';
import SplashScreen from './screens/SplashScreen';
import SplashScreenWait from './screens/SplashScreenWait';
import GridsPage from './pages/GridsPage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <MyContextProvider>
      <NavigationContainer style={styles.container}>
        <Stack.Navigator>
          <Stack.Screen 
            name='SplashScreen' 
            component={SplashScreen}
            options={() => ({
              title: 'SplashScreen',
              headerShown: false
            })}
          />
          <Stack.Screen 
            name='SplashScreenWait' 
            component={SplashScreenWait}
            options={() => ({
              title: 'SplashScreenWait',
              headerShown: false
            })}
          />
          <Stack.Screen 
            name='Login' 
            component={LoginPage}
            options={() => ({
              title: 'Login',
              headerShown: false
            })}
          />
          <Stack.Screen 
            name='Signin' 
            component={SigninPage}
            options={() => ({
              title: 'Signin',
              headerShown: false
            })}
          />
          <Stack.Screen 
            name='Home' 
            component={HomePage}
            options={() => ({
              title: 'Home',
              headerShown: false
            })}
          />
          <Stack.Screen 
            name='Grids' 
            component={GridsPage}
            options={() => ({
              title: 'Grids',
              headerShown: false
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </MyContextProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
