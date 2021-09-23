import React, { useState, useEffect } from "react";
import {
    View,
    Button,
    TextInput,
} from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';

const AddButton = () => {
    const [showInputs, setShowInputs] = useState(false);
    const [titleText, setTitleText] = useState("");
    const [messageText, setMessageText] = useState("");
    const [newButton, setNewButton] = useState({});
    const [dataButtons, setDataButtons] = useState([]);
    const [send, setSend] = useState(false);
    const [error, setError] = useState(null);

    const handleCreate = () => {
        setDataButtons([
            ...dataButtons,
            newButton
        ])
        setTitleText("");
        setMessageText("");
        setSend(true)
        setShowInputs(false)
    }

    // setItem
    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('buttons', jsonValue)
        } catch (e) {
            setError(e)
        }
    }

    // getItem
    const getData = async (storageKey) => {
        try {
            const jsonValue = await AsyncStorage.getItem(storageKey)
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch(e) {
            setError(e)
        }
    }

    useEffect(() => {
        setNewButton({
            title: titleText,
            message: messageText
        })
        if(send){
            storeData(dataButtons);
            console.log(dataButtons);
            // setDataButtons(getData("buttons"))
            setSend(false)
        }
    }, [titleText, messageText])

    return(
        <View>
            <Button
                title="Add Button"
                onPress={() => setShowInputs(true)}
            />
            {showInputs && (
                <View>
                    <TextInput
                        placeholder="Title"
                        onChangeText={setTitleText}
                        value={titleText}
                    />
                    <TextInput
                        placeholder="Message"
                        onChangeText={setMessageText}
                        value={messageText}
                    />
                    <Button
                        title="Create"
                        onPress={handleCreate}
                    />
                </View>
            )}
            {dataButtons.map((button, i) => (
                <Button
                    key={i}
                    title={button.title}
                    // sendMessage={button.message}
                />
            ))}
        </View>
    )
}

export default AddButton;