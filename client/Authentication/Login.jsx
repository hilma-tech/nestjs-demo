
import React, { useContext, useState } from 'react';
import { Text, View, Image, Button, TextInput, Platform } from 'react-native';
import styles from '../GlobalStyles';
import { AuthContext } from '../Authentication/AuthProvider';

const Login = ({ navigation }) => {
    const { Login } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>
            {Platform.select({
                web: () => <Image style={styles.Animal} source={{ uri: "https://s3.amazonaws.com/creation.howrse.com/100213159-normal.png" }} />,
                default: () => <View />
            })()}
            <View>
                {Platform.select({
                    web: () => View,
                    default: () => <Image style={styles.Animal} source={{ uri: "https://s3.amazonaws.com/creation.howrse.com/100213159-normal.png" }} />
                })()}
                <Text style={styles.headline}>MY VIRTUAL PET</Text>
                <Text style={styles.title}>Login</Text>
                <TextInput style={styles.loginInput} placeholder="Username" value={username} onChangeText={setUsername} />
                <TextInput style={styles.loginInput} secureTextEntry={true} placeholder="Password" value={password} onChangeText={setPassword} />

                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: 300, marginVertical: 30 }}>
                    <Button style={styles.loginButton} onPress={() => Login({ username, password })} title="Login" />
                    <Button style={styles.loginButton} onPress={() => navigation.navigate('Registration')} title="Register" />
                </View>
            </View>
            {Platform.select({
                web: () => <Image style={styles.Animal} source={{ uri: "https://s3.amazonaws.com/creation.howrse.com/100213159-normal.png" }} />,
                default: () => <View />
            })()}
        </View>
    );
}

const Horse = Platform.select({
    web: () => <Image style={styles.Animal} source={{ uri: "https://s3.amazonaws.com/creation.howrse.com/100213159-normal.png" }} />,
    default: () => View
})();

export default Login;