import { View, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import MenuCard from '../components/MenuCard'

import { commonStyles } from '../styles/GlobalStyles';

export default function HomePage() {

    const navigation = useNavigation();

    const onPressGames = () => {
        navigation.navigate('Games');
    };

    const onPressCards = () => {
        navigation.navigate('CardsChooseType');
    };
    
    return (
        <SafeAreaView style={commonStyles.container}>
            <View style={[commonStyles.row, commonStyles.margin2Top]}>
                <View style={commonStyles.flex1}>
                    <MenuCard name="Mini jeux" onPress={onPressGames} />
                </View>
                <View style={commonStyles.flex1}>
                    <MenuCard name="Cartes" onPress={onPressCards} />
                    {/* <MenuCard name="A implémenter" /> */}
                </View>
            </View>
        </SafeAreaView>
    );
}