import * as React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';
import {RadioButton} from 'react-native-paper';
import Button from 'react-native-paper/src/components/Button';
import {RNCamera} from 'react-native-camera';

function HomeScreen(props) {
  const [type, setType] = React.useState('type');
  return (
    <View style={{flex: 1, justifyContent: 'center', padding: 16}}>
      <Text
        style={{
          fontSize: 36,
          fontWeight: 'bold',
          marginBottom: 8,
          textAlign: 'center',
        }}>
        Grape Hound
      </Text>
      <Text style={{textAlign: 'center', marginBottom: 16}}>
        Upload or Snap a Photo Classify Grape type or the Disease affected by it
      </Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <View
          style={{
            alignItems: 'center',
            borderRadius: 10,
            backgroundColor: '#ede7f6',
            marginRight: 8,
          }}>
          <TouchableOpacity
            onPress={() => props.navigation.push('Camera')}
            style={{padding: 32, borderRadius: 10}}>
            <View style={{alignItems: 'center'}}>
              <Icon name="aperture" size={42} color="#673ab7" />
              <Text style={{color: '#673ab7'}}>Capture Photo</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: 'center',
            borderRadius: 10,
            backgroundColor: '#ede7f6',
            marginLeft: 8,
          }}>
          <TouchableOpacity
            onPress={() => {}}
            style={{padding: 32, borderRadius: 10}}>
            <View style={{alignItems: 'center'}}>
              <Icon name="upload" size={42} color="#673ab7" />
              <Text style={{color: '#673ab7'}}>Upload Photo</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={{marginTop: 16, marginBottom: 8}}>DETECTION TYPE</Text>
      <View style={{flexDirection: 'row'}}>
        <RadioButton.Group
          onValueChange={(value) => setType(value)}
          value={type}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <RadioButton value="type" />
            <Text>Grape Type</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <RadioButton value="second" />
            <Text>Grape Disease</Text>
          </View>
        </RadioButton.Group>
      </View>
      <Button
        style={{marginTop: 16}}
        contentStyle={{paddingTop: 6, paddingBottom: 6}}
        mode="contained"
        onPress={() => props.navigation.push('Results')}>
        Process
      </Button>
    </View>
  );
}

function ResultsScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Results Screen</Text>
    </View>
  );
}

const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Text>Waiting</Text>
  </View>
);

function CameraScreen(props) {
  const takePicture = async function (camera) {
    const options = {quality: 0.5, base64: true};
    const data = await camera.takePictureAsync(options);
    props.navigation.goBack();
    console.log(data.uri);
  };
  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.off}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}>
        {({camera, status, recordAudioPermissionStatus}) => {
          if (status !== 'READY') return <PendingView />;
          return (
            <View
              style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
              <TouchableOpacity
                onPress={() => takePicture(camera)}
                style={styles.capture}>
                <Text style={{fontSize: 14}}> SNAP </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      </RNCamera>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Results" component={ResultsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default App;
