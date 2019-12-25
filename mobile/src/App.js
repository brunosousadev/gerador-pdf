

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

  async function handleSave() {
    try {
      const response = await api.get('/pdf');
      const { data, status  } = response;
      if(status ==  200){

        const { DownloadDir } = RNFetchBlob.fs.dirs;
        
        const path = DownloadDir + '/test.pdf';
        
        RNFS.writeFile(path, data, 'base64')
        .then((success) => {
          console.log('FILE WRITTEN!');
        })
        .catch((err) => {
          console.log(err.message);
        });
      }
    } catch (error) {
      console.log("error: ", error);
    }

  }
  return (
    <SafeAreaView >
      <TouchableOpacity onPress={handleSave} style={styles.button}>
        <Text style={styles.buttonText}>Gerar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  button: {
    margin: 150,
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

