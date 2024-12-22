import { SafeAreaView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import MenuCard from '../components/MenuCard';

import { commonStyles } from '../styles/GlobalStyles';

export default function GamesPage() {

    const navigation = useNavigation();

    const onPressGrids = () => {
        navigation.navigate('Grids');
    };

    const onPressCrossWords = () => {
        navigation.navigate('CrossWords');
    };
    
    return (
        <SafeAreaView style={commonStyles.container}>
            <View style={[commonStyles.row, commonStyles.flex1]}>
                <View style={commonStyles.flex1}>
                    <MenuCard name="Grille" onPress={onPressGrids} />
                </View>
                <View style={commonStyles.flex1}>
                <MenuCard name="Mot croisé" onPress={onPressCrossWords} />
                </View>
            </View>
        </SafeAreaView>
    );
}