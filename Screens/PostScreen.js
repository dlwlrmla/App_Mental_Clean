import React, {useEffect, useState} from "react";
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Image, ScrollView, Dimensions} from 'react-native';
import { Input, Button,Card } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {db} from "../firebase";
export default function postScreen(props) {
    const [datos, setDatos] = useState([])
    //obtener datos de la base de datos
    console.log(props.route.params.userId)
    const obtenerPorId = async (id) =>{
        const user = await db.collection('Inventario').doc(id).get()
        const data = user.data()
        setDatos(data)
    }

    useEffect(()=>{
        obtenerPorId(props.route.params.userId)
    },[])
    return (
        <View style={styles.container}>
            <Text>{datos.nickname}</Text>
            <Text>{datos.description}</Text>
            <Text>{datos.tags}</Text>
            <Text>{datos.tags}</Text>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
