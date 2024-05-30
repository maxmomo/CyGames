import React from 'react';
import { View } from 'react-native';

import LeaguesScreen from '../screens/LeaguesScreen';

import { commonStyles } from '../styles/GlobalStyles';

export default function HomePage() {
    
    return (
        <View style={commonStyles.container}>
            <LeaguesScreen />  
        </View>
    );
}