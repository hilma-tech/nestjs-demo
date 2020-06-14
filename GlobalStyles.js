
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightblue',
        alignItems: 'center',
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        
    },
    headline: {
        marginTop: 30,
        fontSize: 45,
        fontWeight: "bold"
    },
    title: {
        marginTop: 30,
        fontSize: 25,
        alignItems: "center"
    },
    loginButton: {
        marginTop: 40,
        // marginRight: 20
    },
    Animal: {
        alignItems: "center",
        width: 300,
        height: 300,
        alignItems: "center",
        justifyContent: "center",

    },
    loginInput: {
        height: 30,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 50,
        paddingLeft: 10,
        marginVertical: 5,
        backgroundColor: "white"
    }
});


export default styles;