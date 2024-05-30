import React from 'react';
import { Image } from 'react-native';

export default function RaceLogo(props) {

    return (
        <Image 
            style={{
                resizeMode: 'contain',
                width: props.width,
                height: props.height
            }} 
            source={props.source} 
        />
    );
}