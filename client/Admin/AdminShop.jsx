
import React, { useState, useEffect, useContext } from 'react';
import { Text, Button, View, Image, TextInput, FlatList, Platform, Alert, Modal } from 'react-native';
import styles from './ShopStyles';
import { AuthContext } from '../Authentication/AuthProvider';
import WebModal from 'modal-react-native-web';

let MyModal = Modal;
if (Platform.OS === 'web') MyModal = WebModal;

let Confirm = (text, onPress) => Alert.alert("DELETE ITEM", text, [
    { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
    { text: "OK", onPress }
], { cancelable: false }
);
if (Platform.OS === 'web') Confirm = confirm;

const AdminShop = () => {
    const { superAuthFetch } = useContext(AuthContext)
    let [items, setItems] = useState(null)
    let [updateModalData, setUpdateModalData] = useState(false)
    let [addModalData, setAddModalData] = useState(false)

    useEffect(() => {
        (async () => {
            let [res, err] = await superAuthFetch('/api/items');
            setItems(res);
        })()
    }, [])

    const updateItemPrice = (item) => {
        let updateSuccess = async (newPrice) => {
            let [res, err] = await superAuthFetch(`/api/items/${item.id}/updatePrice`, {
                method: 'PUT',
                body: JSON.stringify({price: newPrice})        
            });
            if (!res || err) return alert("ERROR", res || err)
            setItems(oldItems => {
                let i = oldItems.indexOf(item);
                oldItems[i].price = newPrice;
                return oldItems;
            });
            alert(`Updated item ${item.id} price to ${newPrice}`)
            setUpdateModalData({ ...updateModalData, text: null })
        }
        setUpdateModalData({ text: "Enter new price", success: updateSuccess, cancle: () => setUpdateModalData({ ...updateModalData, text: null }) });
    }

    const deleteItem = (item) => {
        const onApprove = async () => {
            let [res, err] = await superAuthFetch(`/api/items/${item.id}`, {
                method: 'DELETE'        
            });
            if (!res || err) return alert("ERROR", res || err)
            setItems(oldItems => {
                let i = oldItems.indexOf(item);
                oldItems.splice(i, 1);
                return oldItems;
            })
        }
        let deleteItem = Confirm(`Are you sure you want to delete ${item.name}?`, onApprove);
        if (!deleteItem) return;
        onApprove();
    }

    const addItem = (item) => {
        let addSuccess = async (data) => {
            let [res, err] = await superAuthFetch(`/api/items`, {
                method: 'POST',
                body: JSON.stringify(data)        
            });
            if (!res || err) return alert("ERROR", res || err)
            let { name, price, image, stock } = data;
            if (!name || !price || !image || !stock) return alert("Try again. some of the data is missing.");
            setItems([{ id: Math.random(), name, price, image, stock }, ...items])
            alert(`Added Item ${name} || ${price}`)
            setAddModalData({ ...addModalData, text: null })
        }
        setAddModalData({ text: "Add new Item", success: addSuccess, cancle: () => setAddModalData({ ...addModalData, text: null }) });
    }

    return (
        <View style={{ flex: 1 }}>
            <MobileInputModal visible={updateModalData.text ? true : false} text={updateModalData.text} onSuccess={updateModalData.success} onCancle={updateModalData.cancle} />
            <AddItemModal visible={addModalData.text ? true : false} text={addModalData.text} onSuccess={addModalData.success} onCancle={addModalData.cancle} />
            <Text> AdminShop </Text>
            <Button title="Add Item" onPress={addItem} />
            {items ? <FlatList
                data={items}
                extraData={items}
                renderItem={({ item }) =>
                    <View style={{ padding: 20, marginVertical: 10, marginHorizontal: 10, display: 'flex', flexDirection: 'row' }}>
                        <Text> {item.name} || {item.price}$ || onStock: {item.stock} </Text>
                        <Image style={{ width: 150, height: 150 }} source={{ uri: item.image }} />
                        <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: "center" }}>
                            <Button style={{ marginBottom: 5 }} title="Delete" onPress={() => deleteItem(item)} />
                            <Button style={{ marginBottom: 5 }} title="Edit Price" onPress={() => updateItemPrice(item)} />
                        </View>
                    </View>}
                keyExtractor={item => JSON.stringify(item.id)}
            /> : <Text> loading...</Text>}
        </View>
    );
}

export default AdminShop;


const MobileInputModal = (props) => {
    let [text, setText] = useState("");
    return (
        <MyModal visible={props.visible} animationType="fade">
            <View>
                <TextInput keyboardType={"number-pad"} onChangeText={(text) => setText(text)} autoFocus={true} placeholder={props.text} style={styles.textInput} />
                <Button onPress={() => props.onSuccess(text)} title="Approve" />
                <Button onPress={props.onCancle} title="Cancle" />
            </View>
        </MyModal>
    );
}


const AddItemModal = (props) => {
    let [item, setItem] = useState({ name: "turnip", price: 25, stock: 4, image: "https://vignette.wikia.nocookie.net/howrse/images/2/21/Navet.png/revision/latest/window-crop/width/200/x-offset/0/y-offset/0/window-width/201/window-height/200?cb=20120822235745" });
    return (
        <MyModal visible={props.visible} animationType="fade">
            <View>
                <Text> {props.text} </Text>
                <TextInput placeholder="Name" value={item.name} onChangeText={(name) => setItem({ ...item, name })} autoFocus={true} style={styles.textInput} />
                <TextInput placeholder="Price" value={item.price} keyboardType={"number-pad"} onChangeText={(price) => setText({ ...item, price })} style={styles.textInput} />
                <TextInput placeholder="Stock" value={item.stock} keyboardType={"number-pad"} onChangeText={(stock) => setText({ ...item, stock })} style={styles.textInput} />
                <Image source={{ uri: item.image }} style={{ width: 200, height: 200 }} />
                <Button onPress={() => props.onSuccess(item)} title="Approve" />
                <Button onPress={props.onCancle} title="Cancle" />
            </View>
        </MyModal>
    );
}

