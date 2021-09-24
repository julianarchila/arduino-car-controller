import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import AppContext from '../AppContext';

const Control = () => {
    const {timeFront, setTimeFront} = useState(true);
    const {connectedDevice, setConnectedDevice} = useContext(AppContext);

    const sendMessage = (text) => {
        connectedDevice
            .write(text)
            .then(res => {
                console.log('Send', text);
                console.log('And recieved', res);
            })
            .catch(err => {
                console.log('Error sending data');
                console.log(err);
            })
    }

    const send = (nameButton) => {
        switch (nameButton) {
            case "front":
                sendMessage("$+10$");
                setTimeFront(true);
                while (timeFront) {
                    setTimeout(sendMessage("$+10$"), 1500);
                }
                break;
            case "left":
                console.log("left")
                break;
            case "stop":
                setTimeFront(false)
                sendMessage("$stop$")
                break;
            case "right":
                console.log("right")
                break;
            case "reverse":
                sendMessage("$reverse$")
                break
            default:
                console.log("Button doesn't exist")
                break;
        }
    }

    return(
        <View style={styles.container}>
            <View
                style={styles.containerButtonsExtremes}
            >
                <TouchableOpacity
                    onPress={()=> send("front")}
                    style={styles.button}
                >
                    <Text style={styles.text}>F</Text>            
                </TouchableOpacity>
            </View>
            <View style={styles.containerButtonsCenter}>
                <TouchableOpacity
                    onPress={()=> send("left")}
                    style={styles.button}
                >
                    <Text style={styles.text}>L</Text>            
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=> send("stop")}
                    style={[styles.button, styles.stop]}
                >
                    <Text style={styles.text}>STOP</Text>            
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=> send("right")}
                    style={styles.button}
                >
                    <Text style={styles.text}>R</Text>            
                </TouchableOpacity>
            </View>
            <View
                style={styles.containerButtonsExtremes}
            >
                <TouchableOpacity
                    onPress={()=> send("reverse")}
                    style={styles.button}
                >
                    <Text style={styles.text}>B</Text>            
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Control;

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    button: {
        backgroundColor: "#007bff",
        width: 70,
        borderRadius: 10,
        alignItems: "center",
        padding: 12,
        marginTop: 40,
    },
    containerButtonsCenter: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
    },
    containerButtonsExtremes: {
        width: "100%",
        alignItems: "center"
    },
    stop: {
        backgroundColor: "#FF3D3D",
        borderRadius: 30,
    },
    text: {
        color: "#fff"
    }
})