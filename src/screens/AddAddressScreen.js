import {
  StyleSheet,
  Pressable,
  Text,
  View,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import {UserType} from '../context/Context';
import {useNavigation} from '@react-navigation/native';
import {product_url} from '../utils';

const AddAddressScreen = () => {
  const [name, setName] = useState('sample');
  const [mobile, setMobile] = useState('999999');
  const [houseNo, setHouseNo] = useState('1-26');
  const [street, setStreet] = useState('fish Market');
  const [landmark, setLandMark] = useState('MAIN_ROAD');
  const [pincode, setPincode] = useState('00000');
  const {userId, setUserId} = useContext(UserType);
  const navigation = useNavigation();
  console.log(landmark);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('authToken');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId; //Here we are decoding the jwt_token
      setUserId(userId);
    };
    fetchUser();
  }, []);
  console.log(userId);
  const handleAddAddress = async () => {
    console.log('adding address function is triggering ');
    const address = {
      name,
      mobile,
      houseNo,
      street,
      landmark,
      pincode,
    };
    console.log('landMark => ', address.landmark);
    try {
      const response = await product_url.post(`/addresses`, {
        userId, // Assuming userId is defined somewhere in your code
        address,
      });
      console.log('landmark - checking => ', response);

      Alert.alert('Success', 'Address added successfully');
      setName('sample');
      setMobile('999999');
      setHouseNo('1-26');
      setStreet('fish Market');
      setLandMark('MAIN_ROAD');
      setPincode('00000');

      setTimeout(() => {
        navigation.goBack();
      }, 3000);
    } catch (error) {
      // Handle errors here
      console.error('Error adding address:', error);

      // You can display an error message using Alert or any other error handling mechanism
      Alert.alert('Error', 'An error occurred while adding the address');
    }
  };

  return (
    <ScrollView style={styles.addressContainer}>
      <View style={styles.header} />
      <View style={styles.inputContainer}>
        <Text style={styles.Text}>Add a New Address</Text>
        <TextInput
          placeholder="India"
          style={[styles.input]}
          placeholderTextColor="black"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.Text}>Full Name (First & Last Name)</Text>
        <TextInput
          value={name}
          onChangeText={text => setName(text)}
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor="black"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.Text}>Mobile Number</Text>
        <TextInput
          value={mobile}
          onChangeText={text => setMobile(text)}
          style={styles.input}
          placeholder="Enter your Mobile Number"
          placeholderTextColor="black"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.Text}>Flat, House No, Building No</Text>
        <TextInput
          value={houseNo}
          onChangeText={text => setHouseNo(text)}
          style={styles.input}
          placeholderTextColor="black"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.Text}>Area,Street,Sector village</Text>
        <TextInput
          value={street}
          onChangeText={text => setStreet(text)}
          style={styles.input}
          placeholderTextColor="black"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.Text}>LandMark</Text>
        <TextInput
          value={landmark}
          onChangeText={text => setLandMark(text)}
          style={styles.input}
          placeholder="Eg: near Fish market"
          placeholderTextColor="black"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.Text}>Pincode</Text>
        <TextInput
          value={pincode}
          onChangeText={text => setPincode(text)}
          style={styles.input}
          placeholder="Enter Pincode"
          placeholderTextColor="black"
        />
      </View>

      <Pressable
        onPress={() => handleAddAddress()}
        style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Add Address</Text>
      </Pressable>
    </ScrollView>
  );
};

export default AddAddressScreen;

const styles = StyleSheet.create({
  addressContainer: {},
  header: {
    height: 50,
    backgroundColor: '#00CED1',
    display: 'block',
  },
  inputContainer: {
    padding: 10,
  },
  Text: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderColor: '#D0D0D0',
    marginTop: 5,
    borderRadius: 5,
    color: 'black',
  },
  buttonContainer: {
    backgroundColor: '#FFC72C',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 15,
    marginHorizontal: 20,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 17,
  },
});
