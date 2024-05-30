import React from 'react';
import { View, SafeAreaView, Alert } from 'react-native';
import { useMyContext } from '../../context/MyContext';

import Profile from '../../components/Basic/Profile';

import { commonStyles } from '../../styles/GlobalStyles';

export default function ProfileStageSubPage() {

    const { state, dispatch } = useMyContext();

    const stage = state['stage']

    return (
        <SafeAreaView style={commonStyles.containerLight}>
            <View style={[commonStyles.margin2Top, commonStyles.flex1]}>
                <Profile profile={stage.profile} />
            </View>
        </SafeAreaView>
    );
}