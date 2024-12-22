import { SafeAreaView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import MenuCard from '../components/MenuCard';

import { commonStyles } from '../styles/GlobalStyles';

export default function CardsChooseTypePage() {

    const navigation = useNavigation();

    const onPressCategory = () => {
        navigation.navigate('CategoryCards');
    };

    const onPressCrossWords = () => {
        navigation.navigate('CrossWords');
    };
    
    return (
        <SafeAreaView style={commonStyles.container}>
            <View style={[commonStyles.row, commonStyles.flex1]}>
                <View style={commonStyles.flex1}>
                    <MenuCard name="Catégories" onPress={onPressCategory} />
                </View>
                <View style={commonStyles.flex1}>
                    <MenuCard name="Equipes" onPress={onPressCategory} />
                </View>
            </View>
        </SafeAreaView>
    );
}