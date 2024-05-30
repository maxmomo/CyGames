import React from 'react';
import { Image, View } from 'react-native';
import { commonStyles } from '../../styles/GlobalStyles';

export default function RiderModal(props) {
    return (
        props.picture ? 
        (
            <View>
                <Image 
                    style={{
                        resizeMode: 'contain',
                        width: props.width,
                        height: props.height
                    }} 
                    source={{uri: props.picture}}
                />
            </View>
        ) 
        : 
        <View/>
    );
}
