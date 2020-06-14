
import React, { useState } from 'react';
import { Text, View, Picker, TouchableOpacity, TextInput, Button } from 'react-native';

const Registration = () => {
    let initialData = { username: "", password: "", name: "", gender: "female", pet: "", petName: "" }
    let [data, setData] = useState(initialData)
    const images = ["https://www.howrse.co.il/media/equideo/image/chevaux/adulte/americain/normal/300/pie-tb-bai.png", "https://www.howrse.co.il/media/equideo/image/chevaux/adulte/iberique/normal/300/gr-c.png"];

    const register = () => {
        console.log("data", data)
    }
    return (
        <View>
            <Text style={{ fontSize: 30 }}> Registration</Text>
            <TextInput onChangeText={(username) => setData({ ...data, username })} placeholder="Username" />
            <TextInput onChangeText={(password) => setData({ ...data, password })} placeholder="Password" />
            <TextInput onChangeText={(name) => setData({ ...data, name })} placeholder="Your name..." />
            <Text children="Gender" />
            <Picker
                selectedValue={data.gender}
                style={{ height: 50, width: 100 }}
                onValueChange={(gender, itemIndex) => setData({ ...data, gender })}
            >
                <Picker.Item label="Female" value="female" />
                <Picker.Item label="Male" value="male" />
            </Picker>
            <TextInput placeholder="Choose pet:" />
            <Picker
                selectedValue={data.pet}
                style={{ height: 50, width: 100 }}
                onValueChange={(pet) => setData({ ...data, pet })}
            >
                {images.map((image)=> 
                      <Picker.Item key={image} label={image} value={image} />
                )}
            </Picker>
            <TextInput onChangeText={(petName) => setData({ ...data, petName })} placeholder="pets name:" />
            <Button title="REGISTER" onPress={register} />
        </View>
    );
}

export default Registration;