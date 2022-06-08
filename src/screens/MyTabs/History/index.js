import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { create } from 'apisauce';
import { auth } from '../../../../firebase';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const api = create({ baseURL: 'https://uam-tcc-project-default-rtdb.firebaseio.com/' });

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingVertical: 50,
      paddingHorizontal: 20,
      color: 'black',
      position: 'relative'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10
    },
    recordsContainer: {
    },
    recordContainer: {
        borderWidth: 1, 
        marginBottom: 10,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        minHeight: 50,
        position: 'relative',
        backgroundColor: '#daa520'
    },
    recordText : {
        fontWeight: 'bold'
    },
    recordInfoContainer : {
        marginVertical: 2
    },
    refreshButton : {
        position : 'absolute',
        right: 40,
        top: 55
    }
});

class History extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        records : []
      };  
    }    

    async getHistory() {
        const response = await api.get(`Requests/${auth.currentUser.uid}.json`);

        let objs = [];

        if(response.ok) {
            Object.keys(response.data).map((id) => {

                let obj = response.data[id];
                let data = new Date(obj.data);

                obj.id = id;
                obj.data = `${data.getDate().toString().padStart(2, '0')}/${(data.getMonth() + 1).toString().padStart(2, '0')}/${data.getFullYear()}`;

                objs.push(obj);
            });
        }

        console.log('objs -', objs);

        this.setState({records: objs});
    }

    componentDidMount() {
        this.getHistory();
    }

    teste() {
        this.getHistory();
    }
  
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Histórico</Text>
                <View style={styles.refreshButton}>
                    <TouchableOpacity
                        onPress={this.teste()}
                    >
                        <MaterialCommunityIcons name="cloud-refresh" color={'black'} size={35} />
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    {
                        this.state.records ? (
                            <View style={styles.recordsContainer}>
                                {
                                    this.state.records.map((item) => {
                                        return (
                                            <View key={item.id} style={styles.recordContainer}>
                                                <Text style={styles.recordText}>Data: {item.data}</Text>
                                                <Text style={styles.recordText}>Local:</Text>
                                                <View style={styles.recordInfoContainer}>
                                                    <Text>{item.localInfo.logradouro}, {item.localInfo.number} - {item.localInfo.complemento}</Text>
                                                    <Text>{item.localInfo.bairro} / {item.localInfo.localidade} / {item.localInfo.uf}</Text>
                                                    <Text>{item.localInfo.cep}</Text>
                                                </View>
                                                <View style={styles.recordInfoContainer}>
                                                    <Text style={styles.recordText}>Descrição:</Text>
                                                    <Text>{item.request}</Text>
                                                </View>
                                            </View>  
                                        );
                                    })
                                }
                            </View>
                        ) : <View></View>
                    }
                </ScrollView>
            </View>
        );
    }
}

export default History;