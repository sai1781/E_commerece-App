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
import React, {useState} from 'react';
import Snackbar from 'react-native-snackbar';
import {product_url} from '../utils';
import axios from 'axios';

const SignUp = ({navigation}) => {
  console.log('It is calling the signUp component');
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [isPressed, setIsPressed] = useState(false);
  const handleSignUp = async () => {
    if (
      name.length < 1 ||
      email.length < 1 ||
      password.length < 1 ||
      repeatPassword.length < 1
    ) {
      setError('All fields are required');
    } else if (password != repeatPassword) {
      setError('password do not match');
    } else {
      const user = {
        name,
        email,
        password,
      };
      console.log(user);
      console.log(user.name);
      //Send a post request to the backend
      try {
        const response = await product_url.post('/register', user);
        console.log(response);
        Alert.alert(
          'Registration Successfully',
          'You have registered successfully',
        );
        navigation.navigate('Login');
        reset();
      } catch (error) {
        Alert.alert(
          'Registration Error',
          'An error occurred while registering',
        );
        console.error('Registration failed', error);
      }
    }
  };

  const reset = () => {
    setEmail('');
    setName('');
    setPassword('');
    setRepeatPassword('');
    setError('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Image
            style={styles.image}
            source={{
              uri: 'https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png',
            }}
          />
          <View style={styles.formContainer}>
            <Text style={styles.appName}>Register to your Account</Text>
            {/* Name */}
            <TextInput
              value={name}
              onChangeText={text => {
                setError('');
                setName(text);
              }}
              placeholderTextColor={'#AEAEAE'}
              placeholder="Name"
              style={styles.input}
            />
            {/* Email */}
            <TextInput
              value={email}
              keyboardType="email-address"
              onChangeText={text => {
                setError('');
                setEmail(text);
              }}
              placeholderTextColor={'#AEAEAE'}
              placeholder="Email"
              style={styles.input}
            />
            {/* Password */}
            <TextInput
              value={password}
              onChangeText={text => {
                setError('');
                setPassword(text);
              }}
              placeholderTextColor={'#AEAEAE'}
              placeholder="Password"
              secureTextEntry
              style={styles.input}
            />
            {/* Repeat password */}
            <TextInput
              secureTextEntry
              value={repeatPassword}
              onChangeText={text => {
                setError('');
                setRepeatPassword(text);
              }}
              placeholderTextColor={'#AEAEAE'}
              placeholder="Repeat Password"
              style={styles.input}
            />
            {/* Validation error */}
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            {/* Signup button */}
            <Pressable
              onPressIn={() => setIsPressed(true)}
              onPressOut={() => setIsPressed(false)}
              onPress={handleSignUp}
              style={[
                styles.btn,
                {marginTop: error ? 10 : 20},
                isPressed ? styles.btnPressed : {},
              ]}>
              <Text
                style={[styles.btnText, isPressed ? styles.textPressed : {}]}>
                Sign Up
              </Text>
            </Pressable>
            {/* Login navigation */}
            <Pressable
              onPress={() => navigation.navigate('Login')}
              style={styles.loginContainer}>
              <Text style={styles.haveAccountLabel}>
                Already have an account?{' '}
                <Text style={styles.loginLabel}>Login</Text>
              </Text>
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  formContainer: {
    //   justifyContent: 'center',
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
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 3,
  },
  btnText: {
    color: '#484848',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  loginContainer: {
    marginTop: 60,
  },
  haveAccountLabel: {
    color: '#484848',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
  loginLabel: {
    color: '#1d9bf0',
  },
  btnPressed: {
    backgroundColor: '#66FF99',
    color: 'white',
  },
  textPressed: {
    color: 'black',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default SignUp;
