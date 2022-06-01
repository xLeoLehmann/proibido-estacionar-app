import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center', 
      alignItems: 'center'
    },
    text: {
        color: 'black'
    }
});

export default function Report() {
    return (
        <View style={styles.container}>
        <Text style={styles.text}>Caralho funcionou!</Text>
        </View>
    );
}