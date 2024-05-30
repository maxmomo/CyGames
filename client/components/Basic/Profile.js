import React from 'react';
import { Image, View, Dimensions } from 'react-native';
import { commonStyles } from '../../styles/GlobalStyles';

const screenWidth = Dimensions.get('window').width;

export default function Profile(props) {
    return (
        props.profile ? 
        (
            <View style={[commonStyles.flex1, {alignItems: 'center'}]}>
                <Image 
                    style={{
                        resizeMode: 'contain',
                        width: screenWidth - 20,
                        height: 200
                    }} 
                    source={{uri: props.profile}}
                />
            </View>
        ) 
        : 
        <View/>
    );
}