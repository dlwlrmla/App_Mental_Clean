import React, {useEffect, useState} from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {db, auth} from "../firebase";
import {useNavigation} from "@react-navigation/native";
export default function RegisterScreen() {
    const [email, setEmail  ] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation()
    //Confirmar que existe la sesión en la base de datos
    const handleSignUp = () => {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
            })
            .catch(error => alert(error.message))
    }
    //Se verifica si es que el usuario está logueado
    useEffect(() => {
        return auth.onAuthStateChanged(user => {
            if (user) {
                navigation.replace("Home")
            }
        })
    }, [])
    //Se redirecciona al usuario a la pantalla de registro
    const handleRegister = () => {
        navigation.goBack()
    }
    return (
        <View>
            <Text style={styles.logoText}>Todo inicia y termina por ti</Text>
            <Input
                disabledInputStyle={{ background: "#ddd" }}
                value={email}
                onChangeText={(email) => setEmail(email)}
                leftIcon={<Icon name="account-outline" size={20} />}
                placeholder="Correo electrónico"
            />
            <Input
                disabledInputStyle={{ background: "#ddd" }}
                value={password}
                onChangeText={(password) => setPassword(password)}
                leftIcon={<Icon name="lock" size={20} />}
                placeholder="Contraseña"
            />
            <View style={{flexDirection:"row"}}>
                <Button
                    buttonStyle={{ width: 180 }}
                    containerStyle={{ margin: 5 }}
                    disabledStyle={{
                        borderWidth: 2,
                        borderColor: "#00F"
                    }}
                    disabledTitleStyle={{ color: "#00F" }}
                    linearGradientProps={null}
                    iconContainerStyle={{ background: "#000" }}
                    loadingProps={{ animating: true }}
                    loadingStyle={{}}
                    onPress={handleLogin}
                    title="Iniciar sesión"
                    titleStyle={{ marginHorizontal: 5 }}
                />
                <Button
                    buttonStyle={{ width: 180 }}
                    containerStyle={{ margin: 5 }}
                    disabledStyle={{
                        borderWidth: 2,
                        borderColor: "#00F"
                    }}
                    disabledTitleStyle={{ color: "#00F" }}
                    linearGradientProps={null}
                    iconContainerStyle={{ background: "#000" }}
                    loadingProps={{ animating: true }}
                    loadingStyle={{}}
                    onPress={handleSignUp}
                    title="Registrarse"
                    titleStyle={{ marginHorizontal: 5 }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }, logoText: {
        fontSize: 40,
        fontWeight: "800",
        marginTop: 150,
        marginBottom: 30,
        textAlign: "center",
    },
});
