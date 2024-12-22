import React from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { commonStyles } from '../styles/GlobalStyles';
import Header from '../components/Header';
import RiderCard from '../components/RiderCard';
import { BasicButton } from '../components';

export default function CardsRewardPage({ route }) {
    let { datas } = route.params;
    const navigation = useNavigation();

    if (datas.length % 2 !== 0) {
        datas = [...datas, { id: 'dummy', isDummy: true }];
    }

    const handleValidate = () => {
        navigation.reset({
            index: 1, 
            routes: [
                { name: 'Home' },
                { name: 'Games' }, 
                { name: 'Grids' }, 
            ],
        });
    };

    const renderItem = ({ item }) => <RiderCard item={item} isDummy={item.isDummy} />;

    return (
        <SafeAreaView style={commonStyles.container}>
            <Header is_navigation={true} />
            <FlatList
                data={datas}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                numColumns={2}
                showsVerticalScrollIndicator={false}
            />
            <View style={commonStyles.center}>
                <BasicButton text={'Valider'} onPress={handleValidate} />
            </View>
        </SafeAreaView>
    );
}