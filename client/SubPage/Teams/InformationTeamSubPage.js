import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { useMyContext } from '../../context/MyContext';

import Jersey from '../../components/Basic/Jersey';
import TeamInformation from '../../components/TeamInformation';

import { commonStyles } from '../../styles/GlobalStyles';

export default function InformationTeamSubPage() {

    const { state, dispatch } = useMyContext();

    const team = state['team']

    return (
        <SafeAreaView style={commonStyles.containerLight}>
            <View style={[commonStyles.margin2Top, commonStyles.flex1]}>
                <Jersey jersey={team['jersey']} height={150} width={150} />
                <TeamInformation team={team} />
            </View>
        </SafeAreaView>
    );
}