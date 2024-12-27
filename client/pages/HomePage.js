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

    const onPressExchange = () => {
        navigation.navigate('ExchangeChoose');
    };
    
    return (
        <SafeAreaView style={commonStyles.container}>
            <View style={[commonStyles.row, commonStyles.margin2Top]}>
                <View style={commonStyles.flex1}>
                    <MenuCard name="Mini jeux" onPress={onPressGames} />
                    <MenuCard name="Echanges" onPress={onPressExchange} />
                </View>
                <View style={commonStyles.flex1}>
                    <MenuCard name="Cartes" onPress={onPressCards} />
                    <MenuCard name="Packs" onPress={onPressExchange} />
                </View>
            </View>
        </SafeAreaView>
    );
}