import { View, Image } from 'react-native';

export default function LogoMain() {
    return (
        <View>
            <Image 
                style={{
                    resizeMode: 'cover',
                }} 
                source={require('../../assets/logo.png')} 
            />
        </View>
    );
}