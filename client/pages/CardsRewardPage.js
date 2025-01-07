import React from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { commonStyles } from '../styles/GlobalStyles';
import RiderCard from '../components/RiderCard';
import { BasicButton } from '../components';

export default function CardsRewardPage({ route }) {
    let { datas, from } = route.params;
    const navigation = useNavigation();

    if (datas.length % 2 !== 0) {
        datas = [...datas, { id: 'dummy', isDummy: true }];
    }

    const handleValidate = () => {
        if (from === 'exchange') {
            navigation.reset({
                index: 1, 
                routes: [
                    { name: 'Home' }, 
                    { name: 'ExchangeChoose' }
                ],
            });
        
        } else if (from === 'pack') {
            navigation.reset({
                index: 1, 
                routes: [
                    { name: 'Home' },
                    { name: 'PackChoose' }
                ],
            });
        } else {
            navigation.reset({
                index: 1, 
                routes: [
                    { name: 'Home' },
                    { name: 'Games' }, 
                    { name: 'Grids' }, 
                ],
            });
        }
    };

    const renderItem = ({ item }) => <RiderCard item={item} isDummy={item.isDummy} reward={true} />;

    return (
        <SafeAreaView style={commonStyles.container}>
            <FlatList
                data={datas}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
            />
            <View style={commonStyles.center}>
                <BasicButton text={'Valider'} onPress={handleValidate} />
            </View>
        </SafeAreaView>
    );
}