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
import TeamsCardsPage from './pages/TeamsCardsPage';
import ExchangeChoosePage from './pages/ExchangeChoosePage';
import ExchangePage from './pages/ExchangePage';
import ExchangeRiderSelectionPage from './pages/ExchangeRiderSelectionPage';
import PackChoosePage from './pages/PackChoosePage';

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
              name="ExchangeChoose" 
              component={ExchangeChoosePage}  
            />
            <Stack.Screen 
              name="Exchange" 
              component={ExchangePage}  
            />
            <Stack.Screen 
              name="ExchangeRiderSelection" 
              component={ExchangeRiderSelectionPage}  
            />
            <Stack.Screen 
              name="Grids" 
              component={GridsPage}
            />
            <Stack.Screen 
              name="Grid" 
              component={GridPage} 
            />
            <Stack.Screen 
              name="Cards" 
              component={CardsPage} 
            />
            <Stack.Screen 
              name="CardsReward" 
              component={CardsRewardPage} 
            />
            <Stack.Screen 
              name="CategoryCards" 
              component={CategoryCardsPage} 
            />
            <Stack.Screen 
              name="TeamCards" 
              component={TeamsCardsPage} 
            />
            <Stack.Screen 
              name="CrossWords" 
              component={CrossWordsPage} 
            />
            <Stack.Screen 
              name="CrossWord" 
              component={CrossWordPage} 
            />
            <Stack.Screen 
              name="PackChoose" 
              component={PackChoosePage} 
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </MyContextProvider>
  );
}

export default App;