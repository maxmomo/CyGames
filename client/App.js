import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import { MyContextProvider } from './context/MyContext';
import { commonStyles } from './styles/GlobalStyles';

import { Header } from './components';

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
import CardsRewardPage from './pages/CardsRewardPage';
import GamesPage from './pages/GamesPage';
import CardsChooseTypePage from './pages/CardsChooseTypePage';

const Stack = createStackNavigator();

const noBackButtonScreens = ['Home', 'SplashScreen', 'Login', 'Signin', 'CardsReward'];

function App() {
  
  return (
    <MyContextProvider>
      <View style={commonStyles.flex1}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              header: ({ navigation, route }) => (
                <Header
                    onProfilePress={() => navigation.navigate('Profile')}
                    showBackButton={!noBackButtonScreens.includes(route.name)}
                />
              ),
          }}
          >
            <Stack.Screen a
              name="SplashScreen" 
              component={SplashScreen} 
              options={{ headerShown: false }} 
            />
            <Stack.Screen 
              name="SplashScreenWait" 
              component={SplashScreenWait} 
              options={{ headerShown: false }} 
            />
            <Stack.Screen 
              name="Login" 
              component={LoginPage} 
              options={{ headerShown: false }} 
            />
            <Stack.Screen 
              name="Signin" 
              component={SigninPage} 
              options={{ headerShown: false }} 
            />
            <Stack.Screen 
              name="Home" 
              component={HomePage} 
            />
            <Stack.Screen 
              name="Games" 
              component={GamesPage} 
            />
            <Stack.Screen 
              name="CardsChooseType" 
              component={CardsChooseTypePage}  
            />
            <Stack.Screen 
              name="Grids" 
              component={GridsPage}
              options={{ headerShown: false }}  
            />
            <Stack.Screen 
              name="Grid" 
              component={GridPage} 
              options={{ headerShown: false }} 
            />
            <Stack.Screen 
              name="Cards" 
              component={CardsPage} 
              options={{ headerShown: false }} 
            />
            <Stack.Screen 
              name="CardsReward" 
              component={CardsRewardPage} 
              options={{ headerShown: false }} 
            />
            <Stack.Screen 
              name="CategoryCards" 
              component={CategoryCardsPage} 
              options={{ headerShown: false }} 
            />
            <Stack.Screen 
              name="CrossWords" 
              component={CrossWordsPage} 
              options={{ headerShown: false }} 
            />
            <Stack.Screen 
              name="CrossWord" 
              component={CrossWordPage} 
              options={{ headerShown: false }} 

            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </MyContextProvider>
  );
}

export default App;