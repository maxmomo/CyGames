import React from 'react';
import { Image } from 'react-native';

export default function Logo(props) {

    const file = '../../assets/logo.png'
    return (
        <Image 
            style={{
                resizeMode: 'contain',
                width: props.width,
                height: props.height
            }} 
            source={require(file)} 
        />
    );
}