import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
    textInput: {
        height: 40,
        width: "100%",
        paddingHorizontal: 40,
        textAlignVertical: "bottom",
        borderColor: 'gray',
        borderWidth: 3,
        margin: 20,
        ...Platform.select({
            ios: {
                borderRadius: 15,
                backgroundColor: "rgba(166, 170, 172, 0.9)"
            },
            android: {}
        })
    },
});