import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Basic/Header';
import axios from 'axios';
import { useMyContext } from '../context/MyContext';
import Flag from 'react-native-flags';
import {Picker} from '@react-native-picker/picker';

export default function RidersScreen() {

    const navigation = useNavigation();
    const { state, dispatch } = useMyContext();
    const [riders, setRiders] = React.useState([]);

    const [selectedAge, setSelectedAge] = useState(null);
    const [isPickerVisible, setPickerVisible] = useState(false);

    const sort = [
        {id: 1, name: 'age', action: 'sort_age'},
        {id: 2, name: 'country', action: 'country'}
    ]
    
    useEffect(() => {
        getRiders()
    }, []);

    const renderButton = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.pickerButton,
            ]}
            onPress={() => {
                if (item.action === 'sort_age') {
                    setPickerVisible(true); // Afficher le Picker
                } else {
                    changeStatus(item);
                }
            }}
        >
            <Text style={styles.pickerButtonText}>{item.name}</Text>
        </TouchableOpacity>
    );

    const getRiders = async () => {
        team_id = state["team"]["id"]
        await axios({
            method: "get",
            url: "http://192.168.1.125:3000/team/riders",
            params: {
                team_id: team_id
            }
        })
            .then(response => {
                setRiders(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const renderRider = ({ item }) => (
        <TouchableOpacity style={styles.item}>
            <View style={styles.line}>
                <Text style={styles.text}>{item.name}</Text>
                <Flag code={item.nationality} size={32} style={styles.flag}/>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Header is_navigation={true} />
            <View style={styles.selectView}>
                <FlatList
                    data={sort}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderButton}
                    numColumns={6}
                    scrollEnabled={false}
                />
            </View>
            <View style={styles.flatlist}>   
                <FlatList
                    data={riders}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderRider}
                />
            </View>   
            {isPickerVisible && (
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={selectedAge}
                        onValueChange={(itemValue) => setSelectedAge(itemValue)}
                    >
                        <Picker.Item label="Sélectionnez un âge" value={null} />
                        <Picker.Item label="18" value={18} />
                        <Picker.Item label="19" value={19} />
                        {/* ... autres âges ... */}
                    </Picker>
                </View>
            )}
        </View>      
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#14181D',
        flex: 1
    },
    image: {
        width: 100,
        height: 130,
    },
    item: {
        backgroundColor: '#21222D',
        padding: '5%',
        marginBottom: '5%',
        borderRadius: 8,
        shadowColor: '#F2C238',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.6,
        shadowRadius: 4,
    },
    line :{
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        color: '#E4E9F2',
        fontSize: 18
    },
    flatlist: {
        flex: 10,
        marginTop: '2%',
        marginBottom: '4%',
        width: '90%',
    },
    selectView: {
        alignItems: 'center',
        marginVertical: 10,
        flexDirection: 'row',
        flex: 1,
        width: '100%'
    },
    pickerButton: {
        backgroundColor: '#21222D',
        padding: '3%',
        marginVertical: '1%', // Réduisez la marge verticale pour créer un espacement équitable
        marginHorizontal: '1%',
        borderRadius: 8,
        borderWidth: 1,
        flex: 1,
        alignItems: 'center', // Alignez le texte au centre
        justifyContent: 'center'
    },
    pickerButtonText: {
        color: '#E4E9F2',
        fontSize: 12
    },
    pickerContainer: {
        backgroundColor: '#21222D',
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#F2C238',
        alignItems: 'center',
    },
});

