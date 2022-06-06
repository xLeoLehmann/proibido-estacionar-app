import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { auth } from '../../../firebase';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    button: {
        backgroundColor: '#0782F9',
        width: '90%',
        paddingHorizontal: 100,
        paddingVertical: 15,
        borderRadius: 15,
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 10
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2,
    },
    buttonText: {
        color: 'white', 
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,
    },
})



export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation()

    useEffect(() => {
       const unsubscribe = auth.onAuthStateChanged(user => {
            if (user){
                 navigation.navigate("Tabs")
                 console.log('Usuário logado : ', user.email);
            }else{
                console.log('Sem usuário logado');
            }
        })
        return unsubscribe
    },
    [])

    const handleSignUp = () => {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log(user.email);
            })
            .catch(error => alert(error.message))
    }
    const handleLogin = () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Logado como: ', user.email);
            })
            .catch(error => alert(error.message))
    }
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding">

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                >
                </TextInput>
                <TextInput
                    placeholder="Senha"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                >
                </TextInput>
            </View>
            <View styles={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleLogin}
                    style={styles.button}
                >
                    <Text styles={styles.buttonText}>Entre na sua conta</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleSignUp}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text styles={styles.buttonOutlineText}>Registre-se agora!!</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}