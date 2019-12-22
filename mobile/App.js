

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';

import api from './api';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';

export default function App() {

  async function handleSubmit() {
    const response = await api.get('/pdf');        


    //var path = RNFetchBlob.fs.dirs['DownloadDir'] + '/test.pdf';
    const path = RNFS.DocumentDirectoryPath + '/test.txt';
    console.log("caminho: ", path);
    RNFS.writeFile(path, "olá mundo",'utf8')
      .then((success) => {
        console.log('FILE WRITTEN! ', success);
      })
      .catch((err) => {
        console.log(err.message);
      });

  }
  return (
    <SafeAreaView >
      <Text style={styles.txt}>Gerar PDF </Text>
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Gerar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  txt: {
    margin: 150,
  },
  button: {
    height: 42,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16
  },
});

