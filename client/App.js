import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import LoginPage from './pages/LoginPage';
import SigninPage from './pages/SigninPage';
import HomePage from './pages/HomePage';
import TeamPage from './pages/TeamPage';

import { MyContextProvider } from './context/MyContext';
import SplashScreen from './screens/SplashScreen';
import SplashScreenWait from './screens/SplashScreenWait';
import RacePage from './pages/RacePage';
import ProfileMenuPage from './pages/ProfileMenuPage';
import StagePage from './pages/StagePage';
import LeaguePage from './pages/LeaguePage';

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
              title: 'Home',
              headerShown: false
            })}
          />
          <Stack.Screen 
            name='Signin' 
            component={SigninPage}
            options={() => ({
              title: 'Home',
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
            name='League' 
            component={LeaguePage}
            options={() => ({
              title: 'League',
              headerShown: false
            })}
          />
          <Stack.Screen 
            name='Team' 
            component={TeamPage}
            options={() => ({
              title: 'Team',
              headerShown: false
            })}
          />
          <Stack.Screen 
            name='Race' 
            component={RacePage}
            options={() => ({
              title: 'Race',
              headerShown: false
            })}
          />
          <Stack.Screen 
            name='ProfileMenu' 
            component={ProfileMenuPage}
            options={() => ({
              title: 'ProfileMenu',
              headerShown: false
            })}
          />
          <Stack.Screen 
            name='Stage' 
            component={StagePage}
            options={() => ({
              title: 'Stage',
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
