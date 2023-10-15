import {
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import React, {useState, useContext, useEffect, useCallback} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign'; // Import AntDesign
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {UserType} from '../context/Context';
import {product_url} from '../utils';
import Entypo from 'react-native-vector-icons/Entypo';

const AddAddress = () => {
  const navigation = useNavigation();
  const [addresses, setAddresses] = useState([]);
  const {userId, setUserId} = useContext(UserType);
  console.log(userId, 'userId');
  useEffect(() => {
    fetchAddresses();
  }, []);
  const fetchAddresses = async () => {
    try {
      const response = await product_url.get(`/addresses/${userId}`);

      const data = response.data;
      setAddresses(data);
    } catch (error) {
      console.log('data is not coming here');
      console.log('Error', error);
    }
  };
  console.log(addresses);
  //Refresh the addresses when the component comes to the focus is basically
  //when we Navigate back
  useFocusEffect(
    useCallback(() => {
      fetchAddresses();
    }, []),
  );

  return (
    <ScrollView>
      <View style={styles.searchContainer}>
        <Pressable style={styles.searchContainer1}>
          <AntDesign name="search1" style={[styles.searchIcon, styles.Icons]} />
          <TextInput placeholder="Search here anything " />
        </Pressable>
        <Feather name="mic" style={[styles.featherIcon, styles.Icons]} />
      </View>
      <View style={styles.addressContainer}>
        <Text style={styles.addressText}>Your Addresses</Text>

        <Pressable
          style={styles.addNewAddressContainer}
          onPress={() => navigation.navigate('AddAddressScreen')}>
          <Text style={styles.addAddressText}>Add a new Address</Text>
          <MaterialCommunityIcons style={styles.Icons} name="greater-than" />
        </Pressable>

        <Pressable>
          {/* Here are displaying all the address of user having */}

          {addresses?.map((e, idx) => (
            <Pressable key={idx} style={styles.individualAddressContainer}>
              <View style={styles.nameContainer}>
                <Text style={styles.Text}>{e.name}</Text>
                <Entypo
                  style={[styles.Icons, styles.locationIcon]}
                  name="location-pin"
                />
              </View>
              <Text style={styles.Text}>
                {e?.houseNo}, {e?.landmark}
              </Text>
              <Text style={styles.Text}>{e?.street}</Text>
              <Text style={styles.Text}>{e?.houseNo}</Text>
              <Text style={styles.Text}>phone No:{e?.mobile}</Text>
              <Text style={styles.Text}>pin code : {e?.pincode}</Text>
              <View style={styles.buttonContainer}>
                <Pressable style={styles.Button}>
                  <Text style={styles.Text}>Edit</Text>
                </Pressable>
                <Pressable style={styles.Button}>
                  <Text style={styles.Text}>Remove</Text>
                </Pressable>
                <Pressable style={styles.Button}>
                  <Text style={styles.Text}>Set as Default</Text>
                </Pressable>
              </View>
            </Pressable>
          ))}
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddAddress;

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: '#00CED1',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    gap: 10,
    backgroundColor: 'white',
    borderRadius: 3,
    height: 40,
    flex: 1,
  },
  Icons: {
    color: 'black',
    fontSize: 24,
    fontWeight: '600',
  },
  searchIcon: {
    paddingLeft: 10,
  },
  featherIcon: {},
  text: {
    color: 'black',
    fontWeight: '500',
  },
  addressContainer: {
    padding: 5,
  },
  addressText: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
  },
  addNewAddressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    padding: 5,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    marginTop: 15,
  },
  addAddressText: {
    color: 'black',
    fontSize: 17,
  },
  individualAddressContainer: {
    borderWidth: 1.5,
    borderColor: '#D0D0D0',
    padding: 10,
    flexDirection: 'column',
    gap: 5,
    margin: 10,
    borderRadius: 5,
  },
  nameContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  locationIcon: {
    color: 'red',
  },
  Text: {
    fontSize: 16,
    color: 'black',
    fontWeight:'500'
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
  },
  Button: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
    borderWidth: 0.9,
    borderColor: '#D0D0D0',
  },
});
