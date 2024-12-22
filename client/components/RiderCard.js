import React, { memo, useState } from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import colors from '../constants/colors';
import Flag from 'react-native-flags';

const { width, height } = Dimensions.get('window');


const RiderCard = ({ item, isDummy, width, height }) => {
    const [viewDimensions, setViewDimensions] = useState({ width: 0, height: 0 });
    
    const jerseyImages = {
        arkea: require('../assets/teams/arkea.png'),
        astana: require('../assets/teams/astana.png'),
        bahrain: require('../assets/teams/bahrain.png'),
        cofidis: require('../assets/teams/cofidis.png'),
        decathlon: require('../assets/teams/decathlon.png'),
        bennett: require('../assets/teams/bennett.png'),
        dsm: require('../assets/teams/dsm.png'),
        groupama: require('../assets/teams/groupama.png'),
        ineos: require('../assets/teams/ineos.png'),
        kwiatkowski: require('../assets/teams/kwiatkowski.png'),
        rodriguez: require('../assets/teams/rodriguez.png'),
        israel: require('../assets/teams/israel.png'),
        einhorn: require('../assets/teams/einhorn.png'),
        kogut: require('../assets/teams/kogut.png'),
        jayco: require('../assets/teams/jayco.png'),
        lidl: require('../assets/teams/lidl.png'),
        movistar: require('../assets/teams/movistar.png'),
        tesfatsion: require('../assets/teams/tesfatsion.png'),
        redbull: require('../assets/teams/redbull.png'),
        roglic: require('../assets/teams/roglic.png'),
        soudal: require('../assets/teams/soudal.png'),
        lampaert: require('../assets/teams/lampaert.png'),
        uae: require('../assets/teams/uae.png'),
        pogacar: require('../assets/teams/pogacar.png'),
    };
    if (isDummy) {
        return <View style={[styles.card, styles.dummyCard]} />;
    }

    const badgeStyle = 
        item.category === 1 ? styles.goldBadge :
        item.category === 2 ? styles.silverBadge :
        styles.bronzeBadge;

    
    return (
        <View 
            style={[
                styles.card, 
                styles[item.category === 1 ? 'gold' : item.category === 2 ? 'silver' : 'bronze'],
                { opacity: item.posseded ? 1 : 0.1 },
            ]}
        >
            <View style={[styles.noteBadge, badgeStyle]}>
                <Text style={styles.noteText}>{item.rank}</Text>
            </View>
            <View style={[styles.flag]}>
                <Flag code={item.nationality} size={48}/>
            </View>
            <View style={[styles.speciality, badgeStyle]}>
                <Text style={styles.noteText}>{item.speciality}</Text>
            </View>
            <View style={styles.imageContainer}>
                <Image 
                    style={styles.image} 
                    source={jerseyImages[item.jersey]} 
                    resizeMode="contain"
                />
            </View>
            <View style={styles.textContainer}>
                <Text style={[styles.text, { fontSize: 20 }]}>{item.name}</Text>
            </View>
        </View>
    );
};

export default memo(RiderCard);

const styles = StyleSheet.create({
    card: {
        width: width * 0.46,
        height: height * 0.35,
        margin: '2%',
        borderRadius: 20,
        backgroundColor: colors.whiteText,
    },
    dummyCard: {
        backgroundColor: 'transparent',
        borderWidth: 0,
    },
    imageContainer: {
        height: '75%',
        width: '80%',
    },
    textContainer: {
        alignItems: 'center',
        justifyContent: 'center', 
        position: 'absolute',
        top: '70%',
        width: '100%',
    },    
    text: {
        color: colors.dark,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        zIndex: 0,
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '2%',
    },
    noteBadge: {
        position: 'absolute',
        top: '5%',
        right: '2%',
        width: '25%',
        height: '18%',
        borderRadius: 20,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center'

    },
    flag: {
        position: 'absolute',
        top: '25%',
        right: '1%',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    speciality: {
        position: 'absolute',
        top: '48%',
        right: '2%',
        width: '25%',
        height: '18%',
        borderRadius: 20,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    noteText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
    },
    gold: {
        backgroundColor: '#ccb557',
        borderWidth: 2,
        borderColor: '#937829',
    },
    silver: {
        backgroundColor: '#bdbdbd',
        borderWidth: 2,
        borderColor: '#878787',
    },
    bronze: {
        backgroundColor: '#d7a87e',
        borderWidth: 2,
        borderColor: '#5e3819',
    },
    goldBadge: {
        backgroundColor: '#A29460',
    },
    silverBadge: {
        backgroundColor: '#4E4E4E', 
    },
    bronzeBadge: {
        backgroundColor: '#AC9582', 
    },
});
