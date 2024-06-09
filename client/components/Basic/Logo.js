import React from 'react';
import { View, Text, Image } from 'react-native';
import { commonStyles } from '../../styles/GlobalStyles';

export default function Logo(props) {
    const parts = props.additional.split('/');
    const top = parts[0]
    const since = parts[1]

    if (props.race === 'Tour') {
        return (
            <View style={commonStyles.alignCenter}>
                <Image 
                    style={{
                        resizeMode: 'contain',
                        height: 50,
                        width: 50
                    }} 
                    source={require('../../assets/Tour.png')} 
                />
                <Text style={commonStyles.text14}>Top {top}</Text>
            </View>
        );
    }
    if (props.race === 'Giro') {
        return (
            <View style={commonStyles.alignCenter}>
                <Image 
                    style={{
                        resizeMode: 'contain',
                        height: 50,
                        width: 50
                    }} 
                    source={require('../../assets/Giro.png')} 
                />
                <Text style={commonStyles.text14}>Top {top}</Text>
            </View>
        );
    }
    if (props.race === 'Vuelta') {
        return (
            <View style={commonStyles.alignCenter}>
                <Image 
                    style={{
                        resizeMode: 'contain',
                        height: 50,
                        width: 50
                    }} 
                    source={require('../../assets/Vuelta.png')} 
                />
                <Text style={commonStyles.text14}>Top {top}</Text>
            </View>
        );
    }
    if (props.race === 'Paris Roubaix') {
        return (
            <View style={commonStyles.alignCenter}>
                <Image 
                    style={{
                        resizeMode: 'contain',
                        height: 50,
                        width: 50
                    }} 
                    source={require('../../assets/Roubaix.png')} 
                />
                <Text style={commonStyles.text14}>Top {top}</Text>
            </View>
        );
    }
    if (props.race === 'Liège Bastogne Liège') {
        return (
            <View style={commonStyles.alignCenter}>
                <Image 
                    style={{
                        resizeMode: 'contain',
                        height: 50,
                        width: 50
                    }} 
                    source={require('../../assets/LBL.png')} 
                />
                <Text style={commonStyles.text14}>Top {top}</Text>
            </View>
        );
    }
    if (props.race === 'Milan San Remo') {
        return (
            <View style={commonStyles.alignCenter}>
                <Image 
                    style={{
                        resizeMode: 'contain',
                        height: 50,
                        width: 50
                    }} 
                    source={require('../../assets/MSR.png')} 
                />
                <Text style={commonStyles.text14}>Top {top}</Text>
            </View>
        );
    }
}