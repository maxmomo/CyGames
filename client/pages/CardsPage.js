import React, { memo, useMemo } from 'react';
import { FlatList, StyleSheet, Text, SafeAreaView, View, Image, TouchableOpacity } from 'react-native';
import { useMyContext } from '../context/MyContext';
import { commonStyles } from '../styles/GlobalStyles';
import Header from '../components/Header';
import colors from '../constants/colors';
import Flag from 'react-native-flags';

const RiderCard = memo(({ item, onPress, isDummy }) => {
    if (isDummy) {
        return <View style={[styles.card, styles.dummyCard]} />;
    }

    const rarity = item.category === 1 ? 'gold' : item.category === 2 ? 'silver' : 'bronze';

    return (
        <TouchableOpacity style={[styles.card, styles[rarity]]} onPress={() => onPress(item)}>
            <View style={styles.imageContainer}>
                <Image 
                    source={{ uri: item.picture }} 
                    style={styles.image} 
                    resizeMode="cover"
                />
            </View>
            <Text style={[commonStyles.text14, styles.text]}>{item.name}</Text>
            <Flag code={item.nationality} size={24} />
        </TouchableOpacity>
    );
});

const ListFooter = () => <View style={{ height: 100 }} />;

export default function CardsPage({ route }) {
    const { state } = useMyContext();
    const { category } = route.params;

    let riders = useMemo(() => state.user_riders.filter(rider => rider.category === category), [state.user_riders, category]);

    if (riders.length % 2 !== 0) {
        riders = [...riders, { id: 'dummy', isDummy: true }];
    }

    const renderItem = ({ item }) => <RiderCard item={item} isDummy={item.isDummy} />;

    return (
        <SafeAreaView style={commonStyles.container}>
            <Header is_navigation={true} />
            <FlatList
                data={riders}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={ListFooter}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                windowSize={21}
                getItemLayout={(data, index) => ({ length: 160, offset: 160 * index, index })}
                removeClippedSubviews={true}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: '5%',
        borderRadius: 20,
        alignItems: 'center',
        margin: '2%',
        flex: 1,
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
        opacity: 1,
    },
    dummyCard: {
        backgroundColor: 'transparent',
        borderWidth: 0,
    },
    imageContainer: {
        width: 120,
        height: 200,
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 10,
        borderWidth: 2,
        borderColor: '#fff',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    text: {
        color: colors.dark,
        fontWeight: 'bold',
    },
    gold: {
        backgroundColor: '#ccb557', // Jaune doré
        borderWidth: 2,
        borderColor: '#937829', // Teinte de bordure dorée
    },
    silver: {
        backgroundColor: '#bdbdbd', // Gris argenté
        borderWidth: 2,
        borderColor: '#878787', // Teinte de bordure argentée
    },
    bronze: {
        backgroundColor: '#d7a87e', // Brun bronze
        borderWidth: 2,
        borderColor: '#5e3819', // Teinte de bordure bronze
    },
});