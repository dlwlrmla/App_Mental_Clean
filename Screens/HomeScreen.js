import React, {useEffect, useState} from "react";
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Image, ScrollView, Dimensions} from 'react-native';
import { Input, Button,Card } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {db} from "../firebase";
import {useNavigation} from "@react-navigation/native";
export default function HomeScreen() {
    const [datos, setDatos] = useState([])
    const navigation = useNavigation()
     //obtener datos de la base de datos

    const obtenerDatos = async () =>{
        const lista = []
        db.collection('Inventario').get().then((querySnapshot)=>{
            querySnapshot.forEach(doc=>{
                //Hay que deconstruir el objeto
                const {name, description, tags, nickname} = doc.data()
                lista.push({
                        id: doc.id, name, description, tags, nickname
                    }
                )
            })
            setDatos(lista)
        })
    }
    console.log(datos)
    useEffect(()=>{
        obtenerDatos()
    },[])
    return (
        <View>
            <ScrollView showsVerticalScrollIndicator={false}
            >
            {datos.map((item,index)=>{
                return (
                    <View key={index}>
                        <Card containerStyle={{marginLeft:0, marginRight:0, marginTop:10}} wrapperStyle={{}}>
                            <Card.Title onPress={()=>{navigation.navigate('PostScreen',{userId: item.id})}}>{item.name}</Card.Title>
                            <Card.Divider />
                            <View
                                style={{
                                    position: "relative",
                                    alignItems: "center"
                                }}
                            >
                                <Image
                                    style={{ width: "100%", height: 100 }}
                                    resizeMode="contain"
                                    source={{
                                        uri:
                                            "https://avatars0.githubusercontent.com/u/32242596?s=460&u=1ea285743fc4b083f95d6ee0be2e7bb8dcfc676e&v=4"
                                    }}
                                />
                                <Text>{item.nickname}</Text>
                            </View>
                        </Card>

                    </View>

                )
            })}
                    </ScrollView>
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
