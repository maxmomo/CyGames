import React from 'react';
import { TouchableOpacity, FlatList, StyleSheet, Text, Image, View } from 'react-native';
import colors from '../../constants/colors';
import { commonStyles } from '../../styles/GlobalStyles';


export default function CardTeams(props) {

    const filteredTeams = props.teams.filter(team => team.name.toLowerCase().includes(props.searchQuery.toLowerCase()) && team.status === props.selectedStatus);
    const displayTeams = [...filteredTeams];

    if (displayTeams.length % 2 !== 0) {
        displayTeams.push({ id: 'dummy', isDummy: true });
    }

    const renderItem = ({ item }) => {
        if (item.isDummy) {
            return <View style={styles.cardEmpty} />
        }
    
        return (
            <TouchableOpacity style={styles.card} onPress={() => props.onPress(item)}>
                <Image source={{ uri: item.jersey }} style={styles.image} />
                <Text style={commonStyles.text13}>{item.name}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <FlatList
            data={displayTeams}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            numColumns={2}
            showsVerticalScrollIndicator={false}
        />
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.backgroundLight,
        width: '47%',
        padding: '3%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.theme,
        alignItems: 'center',
        margin: '1%',
        flex: 1
    },
    cardEmpty: {
        backgroundColor: colors.background,
        width: '47%',
        padding: '3%',
        alignItems: 'center',
        margin: '1%',
        flex: 1
    },
    image: {
        width: 100,
        height: 100,
    },
});