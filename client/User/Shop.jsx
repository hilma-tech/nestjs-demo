
import React, { useContext, useState, useCallback, useEffect } from 'react';
import { Text, FlatList, View, Image, Button } from 'react-native';
import { AuthContext } from '../Authentication/AuthProvider';

const Shop = () => {
    const { updateUserInfo, user, superAuthFetch } = useContext(AuthContext)
    let [items, setItems] = useState(null)

    useEffect(() => {
        (async () => {
            let [res, err] = await superAuthFetch('/api/items');
            setItems(res);
        })()
    }, [])

    let buyItem = useCallback(async (item) => {
        let bought = true;
        await updateUserInfo(user => {
            if (user.money - item.price < 0) { bought = false; return user.item; };
            return { money: user.money - item.price }
        })
        if (!bought) return alert("You don't have enough money for that.");
        setItems(items => {
            let i = items.indexOf(item);
            items[i].stock--;
            return items;
        })
    }, [user]);

    return (
        <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 30 }}> ~~Shop~~ (your money: {user.money})</Text>
            {items ? <FlatList
                data={items}
                extraData={setItems}
                renderItem={({ item }) =>
                    <View style={{ padding: 20, marginVertical: 10, marginHorizontal: 10, display: 'flex', flexDirection: 'row' }}>
                        <Text> {item.name} || {item.price}$ || onStock: {item.stock} </Text>
                        <Image style={{ width: 150, height: 150 }} source={{ uri: item.image }} />
                        <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: "center" }}>
                            <Button style={{ marginBottom: 5 }} title="BUY" onPress={() => buyItem(item)} />
                        </View>
                    </View>}
                keyExtractor={item => JSON.stringify(item.id)}
            /> : <Text> Loading...</Text>}

        </View>
    );
}

export default Shop;