import React, { memo } from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import colors from '../constants/colors';
import Flag from 'react-native-flags';

const { width, height } = Dimensions.get('window');


const RiderCard = ({ item, isDummy, reward }) => {
    
    const jerseyImages = {
        arkea: require('../assets/teams/arkea.png'),
        demare: require('../assets/teams/demare.png'),
        senechal: require('../assets/teams/senechal.png'),
        astana: require('../assets/teams/astana.png'),
        bettiol: require('../assets/teams/bettiol.png'),
        gate: require('../assets/teams/gate.png'),
        mulubrhan: require('../assets/teams/mulubrhan.png'),
        bahrain: require('../assets/teams/bahrain.png'),
        cofidis: require('../assets/teams/cofidis.png'),
        aniolkowski: require('../assets/teams/aniolkowski.png'),
        aranburu: require('../assets/teams/aranburu.png'),
        buchmann: require('../assets/teams/buchmann.png'),
        herrada: require('../assets/teams/herrada.png'),
        decathlon: require('../assets/teams/decathlon.png'),
        bennett: require('../assets/teams/bennett.png'),
        de_bondt: require('../assets/teams/de_bondt.png'),
        lapeira: require('../assets/teams/lapeira.png'),
        naesen: require('../assets/teams/naesen.png'),
        sojberg_pedersen: require('../assets/teams/sojberg_pedersen.png'),
        dsm: require('../assets/teams/dsm.png'),
        groupama: require('../assets/teams/groupama.png'),
        bystrom: require('../assets/teams/bystrom.png'),
        geniets: require('../assets/teams/geniets.png'),
        kung: require('../assets/teams/kung.png'),
        madouas: require('../assets/teams/madouas.png'),
        ineos: require('../assets/teams/ineos.png'),
        b_swift: require('../assets/teams/b_swift.png'),
        c_swift: require('../assets/teams/c_swift.png'),
        jungels: require('../assets/teams/jungels.png'),
        foss: require('../assets/teams/foss.png'),
        kwiatkowski: require('../assets/teams/kwiatkowski.png'),
        rodriguez: require('../assets/teams/rodriguez.png'),
        thomas: require('../assets/teams/thomas.png'),
        intermarche: require('../assets/teams/intermarche.png'),
        kamp: require('../assets/teams/kamp.png'),
        meintjes: require('../assets/teams/meintjes.png'),
        israel: require('../assets/teams/israel.png'),
        ackermann: require('../assets/teams/ackermann.png'),
        boivin: require('../assets/teams/boivin.png'),
        cote: require('../assets/teams/cote.png'),
        einhorn: require('../assets/teams/einhorn.png'),
        kogut: require('../assets/teams/kogut.png'),
        lutsenko: require('../assets/teams/lutsenko.png'),
        neilands: require('../assets/teams/neilands.png'),
        woods: require('../assets/teams/woods.png'),
        jayco: require('../assets/teams/jayco.png'),
        groenewegen: require('../assets/teams/groenewegen.png'),
        schmid: require('../assets/teams/schmid.png'),
        lidl: require('../assets/teams/lidl.png'),
        pedersen: require('../assets/teams/pedersen.png'),
        movistar: require('../assets/teams/movistar.png'),
        tesfatsion: require('../assets/teams/tesfatsion.png'),
        redbull: require('../assets/teams/redbull.png'),
        hajek: require('../assets/teams/hajek.png'),
        roglic: require('../assets/teams/roglic.png'),
        soudal: require('../assets/teams/soudal.png'),
        evenepoel: require('../assets/teams/evenepoel.png'),
        hayter: require('../assets/teams/hayter.png'),
        lampaert: require('../assets/teams/lampaert.png'),
        merlier: require('../assets/teams/merlier.png'),
        schachmann: require('../assets/teams/schachmann.png'),
        tudor: require('../assets/teams/tudor.png'),
        alaphilippe: require('../assets/teams/alaphilippe.png'),
        brenner: require('../assets/teams/brenner.png'),
        froidevaux: require('../assets/teams/froidevaux.png'),
        j_eriksson: require('../assets/teams/j_eriksson.png'),
        haller: require('../assets/teams/haller.png'),
        hirschi: require('../assets/teams/hirschi.png'),
        l_eriksson: require('../assets/teams/l_eriksson.png'),
        trentin: require('../assets/teams/trentin.png'),
        warbasse: require('../assets/teams/warbasse.png'),
        uae: require('../assets/teams/uae.png'),
        almeida: require('../assets/teams/almeida.png'),
        grossschartner: require('../assets/teams/grossschartner.png'),
        laengen: require('../assets/teams/laengen.png'), 
        majka: require('../assets/teams/majka.png'), 
        narvaez: require('../assets/teams/narvaez.png'), 
        novak: require('../assets/teams/novak.png'),
        oliveira: require('../assets/teams/oliveira.png'),
        pogacar: require('../assets/teams/pogacar.png'),
        politt: require('../assets/teams/politt.png'),
        visma: require('../assets/teams/visma.png'),
        laporte: require('../assets/teams/laporte.png'),
        valter: require('../assets/teams/valter.png'),
        van_aert: require('../assets/teams/van_aert.png'),
        van_baarle: require('../assets/teams/van_baarle.png'),
    };
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
                    source={jerseyImages[item.jersey]} 
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
