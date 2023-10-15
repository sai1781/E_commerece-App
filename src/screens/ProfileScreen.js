import {
  StyleSheet,
  Pressable,
  Text,
  View,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {UserType} from '../context/Context';
import {product_url} from '../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator} from '@ant-design/react-native';
import {cleanCart} from '../redux/slice/CartReducer';
import {useDispatch, useSelector} from 'react-redux';



const ProfileScreen = () => {
  const navigation = useNavigation();
  const {userId, setUserId} = useContext(UserType);
  const [user, setUser] = useState('');
  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingValue, setLoadingValue] = useState(false);
  const dispatch = useDispatch();

  

  useEffect(() => {
    if (ordersData.length === 0 || loading === true) {
      setLoadingValue(true);
    } else {
      setLoadingValue(false);
    }
  }, [ordersData, loading]);

  const logout = () => {
    clearAuthToken(); //it is used to clear the saved auth token in locall storage
    dispatch(cleanCart());

  };

  const clearAuthToken = async () => {
    await AsyncStorage.removeItem('authToken');
    console.log('authToken Cleared');
    navigation.replace('Login');
  };
  useEffect(() => {
    const getOrder = async () => {
      try {
        const response = await product_url.get(`/orders/${userId}`);
        if (response.status === 200) {
          const data = response.data.orders;
          setOrdersData(data);
          setLoading(false);
        }
      } catch (error) {
        console.log('error getting the order list', error);
        if (ordersData.length !== 0)
          Alert.alert('failed to get the iorders', 'Retry it later');
      }
    }
    getOrder()
  }, []);

  useEffect(() => {
    const timeId = setTimeout(() => {
      if (loading === true) {
        setLoadingValue(false);
        setLoading(false);
      }
    }, 5000);
    return () => {
      clearTimeout(timeId);
    };
  }, []);

  console.log('OrdersData => ', ordersData);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerStyle: {
        backgroundColor: '#00CED1',
      },
      headerLeft: () => (
        <Image
          style={styles.image}
          source={{
            uri: 'https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c518.png',
          }}
        />
      ),
      headerRight: () => (
        <View style={styles.headerRight}>
          <Ionicons name="notifications-outline" style={styles.Icons} />

          <AntDesign name="search1" style={styles.Icons} />
        </View>
      ),
    });
  }, []);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await product_url.get(`/profile/${userId}`);
        const {user} = response.data;
        setUser(user);
      } catch (error) {
        console.log('Error', error);
      }
    };
    fetchUser();
  }, []);

  const checking = () => {
    console.log('It is trggering ');
    navigation.replace('Main');
  };
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.Text}>Welcome {user?.name}</Text>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.Button}>
          <Text style={styles.buttonText}>Your Orders</Text>
        </Pressable>
        <Pressable style={styles.Button}>
          <Text style={styles.buttonText}>Your Account</Text>
        </Pressable>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.Button}>
          <Text style={styles.buttonText}>Buy Again</Text>
        </Pressable>
        <Pressable onPress={() => logout()} style={styles.Button}>
          <Text style={styles.buttonText}>Logout</Text>
        </Pressable>
      </View>
      <ScrollView>
        <Text style={styles.Text7}>Recent order</Text>
        {loading === true ? (
          <ActivityIndicator />
        ) : loadingValue === true ? (
          <>
            <View style={styles.warnContainer}>
              <Text style={[styles.Text, styles.warn]}>
                No Orders are placed{' '}
              </Text>
            </View>

            <Pressable onPress={() => checking()} style={styles.deliveryButton}>
              <Text style={styles.delivertText}>
                Click here to Place New Orders
              </Text>
            </Pressable>
          </>
        ) : (
          <View>
            <ScrollView
              horizontal
              contentContainerStyle={styles.horizontalScrollView}
              showsHorizontalScrollIndicator={false}>
              {ordersData?.map((e, idx) => (
                <Pressable key={idx} style={styles.orderMainContainer}>
                  {e?.products?.slice(0, 1)?.map((item, idx2) => (
                    <View style={styles.ordersContainer} key={idx2}>
                      <Image
                        style={styles.image2}
                        source={{
                          uri: item.image,
                        }}
                      />
                    </View>
                  ))}
                </Pressable>
              ))}
            </ScrollView>
          </View>
        )}
        <View style={styles.line} />
      </ScrollView>
    </ScrollView>
  );
};
//Fetching user Profile here by using the useEffect

export default ProfileScreen;

const styles = StyleSheet.create({
  image: {
    width: 140,
    height: 120,
    resizeMode: 'contain',
    justifyContent: 'flex-start',
    marginTop: 15,
  },
  Icons: {
    color: 'black',
    fontSize: 24,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginRight: 12,
  },
  container: {
    padding: 10,
  },
  Text: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  Button: {
    flex: 1,
    backgroundColor: '#E0E0E0',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: 'black',
    fontWeight: '600',
  },
  image2: {
    height: 120,
    width: 120,
    resizeMode: 'contain',
  },
  Text7: {
    color: 'black',
    marginTop: 20,
    fontWeight: '700',
    fontSize: 20,
  },
  horizontalScrollView: {
    flexDirection: 'row',
    alignItems: 'center', // You can adjust alignment as needed
    padding: 10, // Add any padding you need
    gap: 10,
    borderWidth: 1,
  },
  orderMainContainer: {
    backgroundColor: 'white',
    marginRight: 2,
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 5,
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: '#D0D0D0',
  },
  deliveryButton: {
    borderRadius: 30,
    backgroundColor: 'green',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  delivertText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
  warn: {
    color: 'black',
    fontWeight: '400',
    fontSize: 25,
    textAlign: 'center',
  },
  warnContainer: {
    borderWidth: 5,
    borderColor: 'red',
    borderStyle: 'dotted',
    marginVertical: 10,
  },
});
