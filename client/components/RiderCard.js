import React, { memo } from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import colors from '../constants/colors';
import Flag from 'react-native-flags';

const { width, height } = Dimensions.get('window');

const RiderCard = ({ item, isDummy, reward }) => {
    
    if (isDummy) {
        return <View style={[styles.card, styles.dummyCard]} />;
    }

    const badgeStyle = 
        item.category === 1 ? styles.goldBadge :
        item.category === 2 ? styles.silverBadge :
        item.category === 3 ? styles.bronzeBadge :
        styles.specialBadge;

    
    return (
        <View 
            style={[
                styles.card, 
                styles[item.category === 1 ? 'gold' : item.category === 2 ? 'silver' : item.category === 3 ? 'bronze': 'special'],
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
                source={{ uri: item.jersey }} 
                resizeMode="contain"
            />
            </View>
            <View style={styles.textContainer}>
                <Text 
                    style={[
                        styles.text, 
                        { fontSize: 20, color: item.category === 4 ? colors.whiteText : colors.black }
                    ]}
                >
                    {item.name}
                </Text>
            </View>
            {item.count !== null && (
                <View style={styles.countContainer}>
                    {reward && item.count === 1 ? (
                        <Image 
                            source={require('../assets/new.png')} 
                            style={styles.newIcon} 
                            resizeMode="contain" 
                        />
                    ) : (
                        <Text style={styles.countText}>x {item.count}</Text>
                    )}
                </View>
            )}
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
    countContainer: {
        position: 'absolute',
        top: '2%',
        left: '2%',
        width: '18%',
        height: '13%',
        borderRadius: 20,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center'
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
    special: {
        backgroundColor: '#2a2525',
        borderWidth: 2,
        borderColor: '#090505',
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
    specialBadge: {
        backgroundColor: '#2a2525', 
    },
    newIcon: {
    width: '100%',
    height: '100%',
},
});
