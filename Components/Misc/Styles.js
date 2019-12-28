import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
    link: {
        color: '#42bff5',
    },
    baseText: {
        fontFamily: 'Times New Roman'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    textInp: {
        height: 40,
        width: 220, 
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 20,
    },
    root_flex: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: "center"
    },
    login_btn_comp: {
        width: "60%", 
        margin: 10, 
    },
    seperator: {
        margin: 8
    },
    layoutBackground: {
        backgroundColor: "#000000",
        flex: 1
    },
    login_style: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: "center"
    },
    app: {
        flex: 1, 
        backgroundColor: "#8c8c8c"
    }
});
