
import React, { useState } from 'react';
import { Text, View, Picker } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const Registration = () => {
    let initialData = {username: "", password: "", name: "", gender: "female", pet: "", petName: ""}
    let [data, setData] = useState(initialData)
    return (
        <View>
            <Text style={{fontSize: 30}}> Registration</Text>
            <TextInput placeholder="Username" />
            <TextInput placeholder="Password" />
            <TextInput placeholder="Your name..." />
            <Text children="Gender" />
            <Picker
                selectedValue={data.gender}
                style={{ height: 50, width: 100 }}
                onValueChange={(gender, itemIndex) => setData({...data, gender})}
                >
                <Picker.Item label="Female" value="female" />
                <Picker.Item label="Male" value="male" />
            </Picker>
            <TextInput placeholder="Choose pet:" />
            <TextInput placeholder="pets name:" />

        </View>
    );
}

export default Registration;