import { StatusBar } from 'expo-status-bar';
import {Pressable, StyleSheet, Text, Touchable, TouchableOpacity, View} from 'react-native';
import {useState} from "react";
import FAB from "./componts/FAB";

export default function App() {
  const [count, setCount] = useState(10);


  return (
    <View style={styles.container}>
      <Text style={styles.texHuge}>{count}</Text>
      <StatusBar style="auto" />
      <FAB
          label="+1"
          position="right"
          onPress={() =>setCount(count + 1)}
          onLongPress={() =>setCount(0)}
      />

      <FAB
          label="-1"
          position="left"
          onPress={() =>setCount(count - 1)}
          onLongPress={() =>setCount(100)}
      />



      <TouchableOpacity>
        <Text>Orlando Zuniga - U20230405</Text>
      </TouchableOpacity>


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
  texHuge: {
    fontSize: 50,
    fontWeight: 'thin',
  },

});
