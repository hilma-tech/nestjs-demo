
import React, { useContext } from 'react';
import { Text, Button, View } from 'react-native';
import { AuthContext } from '../Authentication/AuthProvider';

const AdminMain = ({navigation}) => {
    const { Logout, user } = useContext(AuthContext)
    console.log("navigation",navigation)
    return (
        <View>
            <Text> AdminMain </Text>
            <Text> name: {user.name}</Text>
            <Text> gender: {user.gender}</Text>
            <Button title="Manage Shop" onPress={()=> navigation.push('AdminShop')} />
            <Button title="Logout" onPress={Logout} />
        </View>
    );
}

export default AdminMain;