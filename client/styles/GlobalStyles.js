import { StyleSheet } from 'react-native';
import colors from '../constants/colors';

const commonStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundLight
    },
    logoView: {
        marginTop: '25%',
        alignItems: 'center',
    },
    inputsView: {
        marginTop: '10%',
        alignItems: 'center',
    },
    buttonsView: {
        marginTop: '15%',
        alignItems: 'center',
    },
    containerLight: {
        flex: 1,
        backgroundColor: colors.backgroundLight
    },
    text10: {
        color: colors.whiteText,
        fontSize: 10
    },
    text11: {
        color: colors.whiteText,
        fontSize: 10
    },
    text12: {
        color: colors.whiteText,
        fontSize: 12
    },
    text13: {
        color: colors.whiteText,
        fontSize: 13
    },
    text13Inv: {
        color: colors.backgroundLight,
        fontSize: 13
    },
    text20Inv: {
        color: colors.backgroundLight,
        fontSize: 20
    },
    text24Inv: {
        color: colors.backgroundLight,
        fontSize: 24
    },
    text14: {
        color: colors.whiteText,
        fontSize: 14
    },
    text16: {
        color: colors.whiteText,
        fontSize: 16
    },
    text18: {
        color: colors.whiteText,
        fontSize: 18
    },
    text18: {
        color: colors.whiteText,
        fontSize: 18
    },
    text20: {
        color: colors.whiteText,
        fontSize: 20
    },
    text21: {
        color: colors.whiteText,
        fontSize: 21
    },
    text22: {
        color: colors.whiteText,
        fontSize: 22
    },
    text23: {
        color: colors.whiteText,
        fontSize: 23
    },
    text24: {
        color: colors.whiteText,
        fontSize: 24
    },
    greenText: {
        color: colors.green,
    },
    orangeText: {
        color: colors.orange,
    },
    redText: {
        color: colors.red,
    },
    themeText: {
        color: colors.theme,
    },
    bold: {
        fontWeight: 'bold',
    },  
    margin1: {
        margin: '1%'
    },
    margin2: {
        margin: '2%'
    },
    margin2Top: {
        marginTop: '2%'
    },
    margin5Top: {
        marginTop: '5%'
    },
    margin15Top: {
        marginTop: '15%'
    },
    marginHorizontal2: {
        marginHorizontal: '2%'
    },
    marginVertical1: {
        marginVertical: '1%'
    },
    margin2Left: {
        marginLeft: '2%'
    },
    margin2Right: {
        marginRight: '2%'
    },
    margin1Bottom: {
        marginBottom: '1%'
    },
    margin3Bottom: {
        marginBottom: '3%'
    },
    flex1: {
        flex: 1
    },
    flex2: {
        flex: 2
    },
    flex3: {
        flex: 3
    },
    flex4: {
        flex: 4
    },
    flex5: {
        flex: 5
    },
    flex10: {
        flex: 10
    },
    row: {
        flexDirection: 'row'
    },
    column: {
        flexDirection: 'column'
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    alignCenter: {
        alignItems: 'center',
    },
    centerVertical: {
        justifyContent: 'center'
    },
    spaceBetween: {
        justifyContent: 'space-between'
    },
    padding1: {
        padding: '1%'
    },
    padding2: {
        padding: '2%'
    },
    listView: {
        padding: '1%',
        borderBottomColor: '#E4E9F2',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    startlistView: {
        marginLeft: '8%',
        marginTop: '2%',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    roundyellow: {
        borderWidth: 2,
        borderColor: colors.theme,
        borderRadius: 10
    },
    roundWhite: {
        borderWidth: 2,
        borderColor: colors.whiteText,
        borderRadius: 10
    },
    colorWhite: {
        backgroundColor: colors.whiteText
    },
    colorRed: {
        color: colors.red
    }
});

const modalStyles = StyleSheet.create({
    modalView: {
        backgroundColor: colors.backgroundLight,
        borderWidth: 2,
        borderColor: colors.whiteText,
        borderRadius: 10,
        marginTop: '23%',
        padding: '5%',
    },
    titleView: {
        marginTop: '2%',
        alignItems: 'center'
    },
});


const textStyles = StyleSheet.create({
    headerText: {
        fontSize: 32,
        fontWeight: '600',
    },
    bodyText: {
        fontSize: 18,
    },
    // ... d'autres styles de texte
});

export { commonStyles, modalStyles };