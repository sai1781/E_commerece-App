import {
  StyleSheet,
  Platform,
  Text,
  View,
  KeyboardAvoidingView,
  Pressable,
  TextInput,
  Image,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Snackbar from 'react-native-snackbar';
//context API
import {NativeStackScreenProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import {product_url} from '../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Login = ({navigation}) => {
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPressed, setIsPressed] = useState(false);


  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          navigation.replace('Main');
        }
      } catch (error) {
        console.log('error message', error);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogin = async () => {
    console.log('Trigerring Login ');
    // console.log(email, password);
    if (email.length < 1 || password.length < 1) {
      setError('All fields are required');
    } else {
      const user = {
        email,
        password,
      };
      try {
        const response = await product_url.post('/login', user);
        const token = response.data.token;
        console.log(token);
        AsyncStorage.setItem('authToken', token);
        navigation.replace('Main');
      } catch (error) {
        Alert.alert('Login Error', 'Invalid Email');
        console.log(error);
      }
    }
  };
  // console.log(email);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Image
            style={styles.image}
            source={{
              uri: 'https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png',
            }}
          />
          <View style={styles.formContainer}>
            {/* <View>
            <Text style={styles.MadhuText}>Itha Madhu structural Engineer</Text>
          </View> */}
            <Text style={styles.appName}>Login In to your Account</Text>
            {/* Email */}
            <TextInput
              keyboardType="email-address"
              value={email}
              onChangeText={text => setEmail(text)}
              placeholderTextColor={'#AEAEAE'}
              placeholder="Email"
              style={styles.input}
            />
            {/* Password */}
            <TextInput
              value={password}
              onChangeText={text => setPassword(text)}
              placeholderTextColor={'#AEAEAE'}
              placeholder="Password"
              style={styles.input}
              secureTextEntry
            />
            {/* Validation error */}
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <View style={styles.forgotPasswordContainer}>
              <View>
                <Text style={styles.loggedIn}>Keep me logged in</Text>
              </View>
              <View>
                <Text style={styles.forgotPasswordText}>Forgot password</Text>
              </View>
            </View>
            {/* Login button */}
            <Pressable
              onPress={() => handleLogin()}
              onPressIn={() => setIsPressed(true)}
              onPressOut={() => setIsPressed(false)}

              style={[styles.btn, {marginTop: error ? 10 : 20},isPressed ? styles.btnPressed : {},]}>
              <Text style={[styles.btnText,isPressed ? styles.textPressed : {},]}>Login</Text>
            </Pressable>

            {/* Sign up navigation */}
            <Pressable
              onPress={() => navigation.navigate('SignUp')}
              style={styles.signUpContainer}>
              <Text style={styles.noAccountLabel}>
                Don't have an account?{'  '}
                <Text style={styles.signUpLabel}>Create an account</Text>
              </Text>
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  formContainer: {
    alignContent: 'center',
    height: '100%',
  },
  image: {
    height: 100,
    width: 250,
    alignSelf: 'center',
    borderRadius: 10,
    marginVertical: 50,
    resizeMode: 'cover',
  },
  appName: {
    color: 'blue',
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    height: 40,
    alignSelf: 'center',
    borderRadius: 5,

    width: '80%',
    color: '#000000',

    marginTop: 10,
    marginBottom: 5,
    shadowColor: '#0000FF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 2,
  },
  errorText: {
    color: 'red',
    alignSelf: 'center',
    marginTop: 10,
  },
  btn: {
    backgroundColor: '#ffffff',
    padding: 10,
    height: 45,

    alignSelf: 'center',
    borderRadius: 5,
    width: '80%',
    marginTop: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 3,
  },
  forgotPasswordContainer: {
    width: '80%',
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
  forgotPasswordText: {
    color: 'blue',
  },
  loggedIn: {
    color: 'black',
  },
  btnText: {
    color: '#484848',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  textPressed:{
    color: 'black',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  signUpContainer: {
    marginTop: 80,
  },
  noAccountLabel: {
    color: '#484848',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
  signUpLabel: {
    color: '#1d9bf0',
  },
  MadhuText: {
    color: 'red',
    fontSize: 35,
    fontWeight: '900',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 50,
    textDecorationLine: 'underline',
    width: '90%',
  },
  btnPressed:{
    backgroundColor:'#66FF99',
    color:'white'
  }
});
