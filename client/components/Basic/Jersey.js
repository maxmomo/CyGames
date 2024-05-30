import React from 'react';
import { Image, View } from 'react-native';
import { commonStyles } from '../../styles/GlobalStyles';

export default function Jersey(props) {
    return (
        props.jersey ? 
        (
            <View style={[commonStyles.flex1, commonStyles.center]}>
                <Image 
                    style={{
                        resizeMode: 'contain',
                        width: props.width,
                        height: props.height
                    }} 
                    source={{uri: props.jersey}}
                />
            </View>
        ) 
        : 
        <View/>
    );
}
