
import React, { useContext } from 'react';
import { Text, Button, Image, View } from 'react-native';
import { AuthContext } from '../Authentication/AuthProvider';

const UserInfo = ({navigation}) => {
    const { Logout, user } = useContext(AuthContext)
    return (
        <View style={{display: 'flex', justifyContent: 'center'}}>
            <Text style={{fontSize: 25}}> User Info </Text>
            <Text> UserName: {user.name}</Text>
            <Text> Gender: {user.gender}</Text>

            <Text style={{fontSize: 25}}> User Pet </Text>
            <Text> Pet Name: {user.pet.name}</Text>
            <Text> Pet Gender: {user.pet.gender}</Text>
            <Image style={{width: 300, height: 300}} source={{uri: user.pet.image}} />

            <Text style={{fontSize: 25}}> Pet Items </Text>
            {user.pet && user.pet.items ? user.pet.items.map((item) => {
                <View>
                    <Text> {item.name} </Text>
                    <Text> {item.image} </Text>
                </View>
            }) : <Text> Pet Doesnt have any items! </Text>}
            <Button color="darkblue" title="Go Shopping!" onPress={()=> navigation.push('Shop')} />

            <Button title="Logout" onPress={Logout} />
        </View>
    );
}

export default UserInfo;