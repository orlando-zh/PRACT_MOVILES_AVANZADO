import { StyleSheet, View, Text } from 'react-native';
import React from "react";


export default function index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora</Text>

      {/*DISPLAY*/}
      <View style={styles.display}>
        <Text style={styles.displayText}>0</Text>
      </View>

      {/*KEYBOARD*/}
      <View style={styles.keyboard}>
        {/*ROW*/}
        <Text style={styles.button}> 7 </Text>
        <Text style={styles.button}> 8 </Text>
        <Text style={styles.button}> 9 </Text>
        <Text style={styles.button}> / </Text>
      </View>

      <View style={styles.row}>
        {/*ROW*/}
        <Text style={styles.button}> 4 </Text>
        <Text style={styles.button}> 5 </Text>
        <Text style={styles.button}> 6 </Text>
        <Text style={styles.button}> x </Text>
      </View>

      <View style={styles.row}>
        {/*ROW*/}
        <Text style={styles.button}> 1 </Text>
        <Text style={styles.button}> 2 </Text>
        <Text style={styles.button}> 3 </Text>
        <Text style={styles.button}> - </Text>
      </View>

      <View style={styles.row}>
        {/*ROW*/}
        <Text style={styles.button}> 0 </Text>
        <Text style={styles.button}> C </Text>
        <Text style={styles.button}> = </Text>
        <Text style={styles.button}> + </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
    },
    display: {
      height: 100,
      justifyContent: 'center',
      alignItems: 'flex-end',
      padding: 20,
      backgroundColor: '#eeeeee',
      marginBottom: 20,
    },
    displayText: {
      fontSize: 40,
    },
    keyboard: {
      gap: 10,
    },
    row: {
      flexDirection: 'row',
      gap: 10,
    },
    button: {
      flex: 1,
      height: 70,
      textAlign: 'center',
      textAlignVertical: 'center',
      fontSize: 28,
      backgroundColor: '#dddddd',
    }
});