import * as React from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Text, View, TextInput, TextArea, Button, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { create } from 'apisauce';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as  ImagePicker from 'expo-image-picker';
import { auth } from '../../../../firebase';
// import { useNavigation } from '@react-navigation/core';


const firebaseConfig = {
    apiKey: "AIzaSyANgYOG_UtpcKUPlMFQQttWEjJ0N4nynN8",
    authDomain: "uam-tcc-project.firebaseapp.com",
    databaseURL: "https://uam-tcc-project-default-rtdb.firebaseio.com",
    projectId: "uam-tcc-project",
    storageBucket: "uam-tcc-project.appspot.com",
    messagingSenderId: "47979866010",
    appId: "1:47979866010:web:ac92553f1337a68b087c23"
};

const api = create({ baseURL: 'https://viacep.com.br/ws' });
const api2 = create({ baseURL: 'https://uam-tcc-project-default-rtdb.firebaseio.com/' });
// const navigation = useNavigation();

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingVertical: 50,
      paddingHorizontal: 20,
      color: 'black'
    },
    input: {
        height: 40,
        borderWidth: 1,
        padding: 10,
        borderRadius: 15
    },
    inputDesc: {
        height: 100,
        borderWidth: 1,
        paddingHorizontal: 10,
        textAlign: 'left',
        borderRadius: 15
    },
    fields: {
        alignItems: 'flex-end',
        flexDirection: 'row',
        marginVertical: 10
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5
    },
    importButton: {
        borderRadius: 15
    },
    button: {
        backgroundColor: '#004AAD',
        width: '100%',
        padding: 10,
        borderRadius: 15,
        alignItems: 'center',
		color: 'white'
    },
    removeButton: {
        backgroundColor: '#DE350B',
        width: '100%',
        padding: 10,
        borderRadius: 15,
        alignItems: 'center',
		color: 'white'
    },
    buttonText: {
		color: 'white',
        fontWeight: '700'
    },
    photoContainer: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        flexWrap : 'wrap'
    },
    photo: {
        fontWeight: '700',
        width: '25%'
    }
});

export default function Report() {

    const [cep, setCep] = React.useState('');
    const [info, setInfo] = React.useState('');
    const [number, setNumber] = React.useState('');
    const [complement, setComplement] = React.useState('');
    const [request, setRequest] = React.useState('');
    const [images, setImages] = React.useState('');

    const imagePickerCall = async () => {
        if(Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

            if(status != 'granted') {
                alert("É necessário permissão");
                return;
            }
        }

        const data = await ImagePicker.launchImageLibraryAsync({});

        if(!data.cancelled) {

            let list = images || [];

            await setImages([...list, {
                title : `Foto ${list.length + 1}`,
                uri : data.uri,
                id : `Foto ${list.length + 1}`
            }]);
        }
    }

    const getCEP = async () => {
        try {

            setInfo({});
            const response = await api.get(`/${cep}/json`);

            if(response.data.uf != 'SP' || response.data.localidade != 'São Paulo') {
                Alert.alert('Erro', 'O CEP deve ser da cidade de São Paulo');
            } else {
                setInfo(response.data);
            }            
        } catch (response) {
            console.log('response lose -', response);
        } finally {
        }
    }

    const removeImages = () => {
        setImages([]);
    }

    const save = async () => {

        const obj = {
            uid : auth.currentUser.uid,
            localInfo : {
                ...info,
                number : number,
                complemento : complement
            },
            request : request,
            images : [
                ...images
            ]
        };

        const response = await api2.post(`Requests/${auth.currentUser.uid}.json`, JSON.stringify(obj));

        console.log('response -', response);

        if(response.ok) {
            setCep('');
            setInfo('');
            setNumber('');
            setComplement('');
            setRequest('');
            setImages([]);
            Alert.alert('Sua requisição foi enviada com sucesso');
        }
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior="height" enabled>
            <Text style={styles.title}>Reportar incidente</Text>
            <ScrollView>
                <View style={styles.fields}>
                    <View style={{width: '50%', marginRight: 10}}>
                            <Text>CEP</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={setCep}
                                value={cep}
                                keyboardType="numeric"
                                placeholder="Digite o CEP"
                            />
                    </View>
                    <View style={{width: '50%', paddingRight: 10}}>
                        <TouchableOpacity
                            onPress={getCEP}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Consultar CEP</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.fields}>
                    <View style={{width: '100%'}}>
                            <Text>Logradouro</Text>
                            <TextInput
                                style={styles.input}
                                keyboardType="numeric"
                                placeholder="Digite o logradouro"
                                value={info.logradouro}
                                editable={!!info ? true : false}
                            />
                    </View>
                </View>
                <View style={styles.fields}>
                    <View style={{width: '50%', marginRight: 10}}>
                        <Text>Número</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            placeholder="Digite o número"
                            value={number}
                            onChangeText={setNumber}
                        />
                    </View>
                    <View style={{width: '50%', paddingRight: 10}}>
                        <Text>Complemento</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Digite o complemento"
                            value={complement}
                            onChangeText={setComplement}
                        />
                    </View>
                </View>
                <View style={styles.fields}>
                    <View style={{width: '50%', marginRight: 10}}>
                        <Text>Bairro</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Digite o bairro"
                            value={info.bairro}
                        />
                    </View>
                    <View style={{width: '50%', paddingRight: 10}}>
                        <Text>Cidade</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Digite a cidade"
                            value={info.localidade}
                        />
                    </View>
                </View>
                <View style={styles.fields}>
                    <View style={{width: '100%'}}>
                            <Text>Estado</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Digite o estado"
                                value={info.uf}
                            />
                    </View>
                </View>
                <View style={styles.fields}>
                    <View style={{width: '100%'}}>
                            <Text>Descreva o incidente</Text>
                            <TextInput
                                style={styles.inputDesc}
                                multiline={true}
                                numberOfLines={5}
                                value={request}
                                onChangeText={setRequest}
                            />
                    </View>
                </View>
                {
                    images ? (
                        <View style={styles.photoContainer}>
                            {
                                images.map((item) => {
                                    return (
                                        <Text key={item.id} style={styles.photo}>{item.title}</Text>
                                    );
                                })
                            }
                        </View>
                    ) : <View></View>
                }
                <View style={styles.fields}>
                    <View style={{width: '50%', marginRight: 10}}>
                        <TouchableOpacity
                            onPress={imagePickerCall}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Importar foto</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{width: '50%', paddingRight: 10}}>
                        <TouchableOpacity
                            onPress={removeImages}
                            style={styles.removeButton}
                        >
                            <Text style={styles.buttonText}>Remover fotos</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <View style={{width: '100%', paddingRight: 10, bottom:5, position:'absolute', left: '7%'}}>
                <TouchableOpacity
                    onPress={save}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
            </View>            
        </KeyboardAvoidingView>
    );
}