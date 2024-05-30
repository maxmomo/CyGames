import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Flag from 'react-native-flags';
import colors from '../../constants/colors';
import { commonStyles } from '../../styles/GlobalStyles';

export default function CountDown(props) {

    function formatTime(milliseconds) {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const days = Math.floor(totalSeconds / 86400);  // 86400 seconds in a day
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
    
        return `${days}j ${hours}h ${minutes}m`;
    }
    
    return (
        <View style={styles.titleView}>
            <Text style={commonStyles.text16}>Fin du mercato dans : {formatTime(props.timeLeft)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    titleView: {
        marginHorizontal: '2%',
    },
    titleText: {

        fontSize: 14,
        color: colors.whiteText
    },
});