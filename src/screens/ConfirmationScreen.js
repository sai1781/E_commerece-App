import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,Dimensions
} from 'react-native';
import React, {useState, useCallback, useEffect, useContext} from 'react';
import {product_url} from '../utils';
import {UserType} from '../context/Context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {cleanCart} from '../redux/slice/CartReducer';
import axios from 'axios';
import RazorpayCheckout from 'react-native-razorpay';
const windowWidth = Dimensions.get('window').width;

const ConfirmationScreen = () => {
  const steps = [
    {title: 'Address', content: 'Address Form'},
    {title: 'Delivery', content: 'Delivery Options'},
    {title: 'Payment', content: 'Payment Details'},
    {title: 'Place Order', content: 'Order Summary'},
  ];
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const cart = useSelector(state => state.cart.cart);

  const total = cart
    ?.map(item => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);
  console.log(total);

  const [currentStep, setCurrentStep] = useState(0);
  const [address, setAddresses] = useState([]);
  const {userId, setuserId} = useContext(UserType);
  const [selectAddress, setSelectedAddress] = useState('');
  const [option, setOption] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingValue, setLoadingValue] = useState(false);
  const [upi, setUpi] = useState(false);
  useEffect(() => {
    fetchAddresses();
  }, []);
  const fetchAddresses = async () => {
    try {
      const response = await product_url.get(`/addresses/${userId}`);

      const data = response.data;
      console.log('address @@@@ => ', data);
      setAddresses(data);
      setLoading(false);
      if(data.length === 0){
        Alert.alert(
          'No Address is Added',
          'Add the Address to Continue',
        );
        setLoadingValue(true)
      }else{
        setLoadingValue(false);
      }
    } catch (error) {
      console.log('data is not coming here');
      console.log('Error', error);
      Alert.alert("Error while retriving the data","Try after some time");
      setLoading(false);
      setLoadingValue(false);
    }
  };
  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        userId: userId,
        cartItems: cart,
        totalPrice: total,
        shippingAddress: selectAddress,
        paymentMethod: selectedOption,
      };
      const response = await product_url.post(`/orders`, orderData);
      console.log(response);
      if (response.status === 200) {
        navigation.navigate('OrderScreen');
        dispatch(cleanCart());
        console.log('order created successfully');
      } else {
        console.log('error creating the data', response.data);
      }
    } catch (error) {
      console.log('trigerring the error');
      console.log('Error', error);
    }
  };
  console.log(userId);
  console.log(address);
  //pay function is used to pay throught debit/credit card by using the Razor's Pay
  const Pay = async () => {
    try {
      const options = {
        description: 'Adding To Wallet',
        currency: 'INR',
        name: 'Amazon',
        key: 'rzp_test_4I1sMefkTtlwvj',
        amount: total * 100,
        prefill: {
          email: 'void@razorpay.com',
          contact: '9494634452',
          name: 'RazorPay Software',
        },
        theme: {color: '#F37254'},
      };
      const data = await RazorpayCheckout.open(options);
      const orderData = {
        userId: userId,
        cartItems: cart,
        totalPrice: total,
        shippingAddress: selectAddress,
        paymentMethod: selectedOption,
      };
      const response = await product_url.post(`/orders`, orderData);
      console.log(response);
      if (response.status === 200) {
        navigation.navigate('OrderScreen');
        dispatch(cleanCart());
        console.log('order created successfully');
        setCurrentStep(3);
      } else {
        console.log('error creating the data', response.data);
      }
    } catch (error) {
      console.log('Getting Error while making the payment', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchAddresses();
    }, []),
  );
  console.log(" loading => ", loading);
  console.log("loadingValue " , loadingValue);

  useEffect(() => {
    const timeId = setTimeout(() => {
      console.log(address.length);
      console.log(loading);
      console.log(loadingValue);
      if (loading === true) {
        console.log('it is calling ');
        setLoadingValue(true);
        setLoading(false);

        Alert.alert(
          'No address is added',
          'please add the address to Continue',
        );
      }
    }, 6000);
    return () => {
      clearTimeout(timeId);
    };
  }, [address,loading,setLoading]);

  return (
    <ScrollView style={styles.container}>
      <View>
        <View style={styles.headerContainer}>
          {steps?.map((item, index) => (
            <View key={index} style={styles.mapContainer}>
              {index > 0 && (
                <View
                  style={[
                    styles.lines,
                    index <= currentStep && {backgroundColor: 'green'},
                  ]}
                />
              )}

              <View
                style={[
                  styles.numbers,
                  index < currentStep && {backgroundColor: 'green'},
                ]}>
                {index < currentStep ? (
                  <Text style={styles.checkIcon}>&#10003;</Text>
                ) : (
                  <Text style={styles.Text5}>{index + 1}</Text>
                )}
              </View>
              <Text style={styles.Text2}>{item.title}</Text>
            </View>
          ))}
        </View>
      </View>

      {currentStep === 0 && (
        <View style={styles.DeliveryAddressContainer}>
          <Text style={styles.Text3}>Select Delivery Address</Text>

          {loading === true ? (
            <ActivityIndicator size="large" style={styles.LoadingIcon} />
          ) : loadingValue === true ? (
            <>
              <View style={styles.warnContainer}>
                <Text style={[styles.Text, styles.warn]}>
                  Address is not added{' '}
                </Text>
              </View>

              <Pressable
                onPress={() => navigation.navigate('AddAddressScreen')}
                style={styles.deliveryButton}>
                <Text style={styles.delivertText}>
                  Click here to Add New Address
                </Text>
              </Pressable>
            </>
          ) : (
            <Pressable style={styles.mainContainer}>
              {address?.map((e, idx) => (
                <Pressable key={idx} style={styles.mapContainer2}>
                  {selectAddress && selectAddress._id === e?._id ? (
                    <FontAwesome5
                      onPress={() => setSelectedAddress(e)}
                      name="dot-circle"
                      style={[styles.Icons, styles.dotCircle]}
                    />
                  ) : (
                    <FontAwesome
                      onPress={() => setSelectedAddress(e)}
                      name="circle-thin"
                      style={styles.Icons}
                    />
                  )}
                  <Pressable style={styles.individualAddressContainer}>
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
                    <Text style={styles.Text}>Phone No : {e?.mobile}</Text>
                    <Text style={styles.Text}>Pin Code : {e?.pincode}</Text>
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
                    <View>
                      {selectAddress && selectAddress._id === e?._id && (
                        <Pressable
                          onPress={() => setCurrentStep(1)}
                          style={styles.deliveryButton}>
                          <Text style={styles.delivertText}>
                            Delivery to this Address
                          </Text>
                        </Pressable>
                      )}
                    </View>
                  </Pressable>
                </Pressable>
              ))}
            </Pressable>
          )}
        </View>
      )}
      {currentStep === 1 && (
        <View style={styles.step2Container}>
          <Text style={styles.Text3}>Choose your Delivery options</Text>

          <View style={styles.step2DetailsContainer}>
            {option === false ? (
              <FontAwesome
                onPress={() => {
                  setOption(!option);
                }}
                name="circle-thin"
                style={styles.Icons}
              />
            ) : (
              <FontAwesome5
                onPress={() => {
                  setOption(option);
                }}
                name="dot-circle"
                style={[styles.Icons, styles.dotCircle]}
              />
            )}

            <Text style={styles.Text7}>
              <Text style={styles.greenText}>Tomorrow by 10pm</Text>
              -Free delivery with Your Prime MemberShip
            </Text>
          </View>
          <Pressable
            style={styles.step2ContainerButton}
            onPress={() => setCurrentStep(2)}>
            <Text style={styles.Text3}>Continue</Text>
          </Pressable>
        </View>
      )}

      {currentStep === 2 && (
        <View style={styles.paymentContainer}>
          <Text style={styles.Text3}>Select Your payment Method</Text>

          <View style={styles.separatePayments}>
            {selectedOption !== 'cash' ? (
              <FontAwesome
                name="circle-thin"
                onPress={() => {
                  setSelectedOption('cash');
                }}
                style={styles.Icons}
              />
            ) : (
              <FontAwesome5
                onPress={() => {
                  setSelectedOption('');
                }}
                name="dot-circle"
                style={[styles.Icons, styles.dotCircle]}
              />
            )}
            <Text style={styles.Text}>Cash on Delivery</Text>
          </View>
          <View style={styles.separatePayments}>
            {selectedOption !== 'card' ? (
              <FontAwesome
                onPress={() => {
                  setSelectedOption('card');
                  setUpi(true);
                }}
                name="circle-thin"
                style={styles.Icons}
              />
            ) : (
              <FontAwesome5
                onPress={() => {
                  setSelectedOption('');
                }}
                name="dot-circle"
                style={[styles.Icons, styles.dotCircle]}
              />
            )}
            <Text style={styles.Text}>UPI / Credit or debit Card</Text>
          </View>
          <View style={styles.separatePayments}>
            {selectedOption !== 'E-Wallet' ? (
              <FontAwesome
                onPress={() => {
                  setSelectedOption('E-Wallet');
                }}
                name="circle-thin"
                style={styles.Icons}
              />
            ) : (
              <FontAwesome5
                onPress={() => {
                  setSelectedOption('');
                }}
                name="dot-circle"
                style={[styles.Icons, styles.dotCircle]}
              />
            )}
            <Text style={styles.Text}>E-Wallets</Text>
          </View>
          <View style={styles.separatePayments}>
            {selectedOption !== 'others' ? (
              <FontAwesome
                onPress={() => {
                  setSelectedOption('others');
                }}
                name="circle-thin"
                style={styles.Icons}
              />
            ) : (
              <FontAwesome5
                onPress={() => {
                  setSelectedOption('');
                }}
                name="dot-circle"
                style={[styles.Icons, styles.dotCircle]}
              />
            )}
            <Text style={styles.Text}>Others</Text>
          </View>
          <Pressable
            style={styles.step2ContainerButton}
            onPress={() => {
              if (upi) {
                Alert.alert('UPI/Debit Card', 'Pay Online', [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('cancel is pressed'),
                  },
                  {
                    text: 'OK',
                    onPress: () => Pay(),
                  },
                ]);
              } else setCurrentStep(3);
            }}>
            <Text style={styles.Text3}>Continue</Text>
          </Pressable>
        </View>
      )}

      {currentStep === 3 && selectedOption === 'cash' && (
        <View style={styles.step3Container}>
          <Text style={{fontSize: 20, fontWeight: '800', color: 'black'}}>
            Order Now
          </Text>
          <View style={styles.step3DetailsContainer}>
            <View>
              <Text style={styles.step3DetailsText1}>
                Save 5% and never run out
              </Text>
              <Text>Turn On auto deliveries</Text>
            </View>
            <Feather name="chevron-right" style={styles.Icons} />
          </View>
          <View style={styles.shippingDetailsContainer}>
            <Text style={styles.Text9}>
              shippingAddress to {selectAddress?.name}
            </Text>
            <View style={styles.listContainers}>
              <Text style={styles.Text9}>Items</Text>
              <Text style={styles.Text9}>₹ {total}</Text>
            </View>
            <View style={styles.listContainers}>
              <Text style={styles.Text9}>Delivery</Text>
              <Text style={styles.Text9}>₹ 0</Text>
            </View>
            <View style={styles.listContainers}>
              <Text style={styles.OrderTotal}>Order Total</Text>
              <Text style={styles.finalPrice}>₹ {total}</Text>
            </View>
          </View>
          <View style={styles.step3DetailsContainer}>
            <View>
              <Text>Pay With</Text>
              <Text style={styles.step3DetailsText1}>
                Pay on delivery(cash)
              </Text>
            </View>
          </View>
          <Pressable
            onPressIn={() => handlePlaceOrder()}
            style={styles.step2ContainerButton}
            onPress={() => setCurrentStep(3)}>
            <Text style={styles.Text3}>Place Your order</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
};
export default ConfirmationScreen;
const styles = StyleSheet.create({
  lines: {
    flex: 1,
    height: 2,
    backgroundColor: 'green',
  },
  numbers: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-around',
    paddingTop: 20,
  },
  mapContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  Text2: {
    color: 'black',
    fontWeight: '500',
  },
  Text3: {
    color: 'black',
    fontWeight: '600',
    fontSize: 18,
  },
  DeliveryAddressContainer: {
    flex:1,
    paddingHorizontal: 10,
  },
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
    justifyContent:'center',
    alignContent:'center',

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
    fontWeight: '500',
    color: 'black',
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
  mapContainer2: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#D0D0D0',
    gap: 5,
    width:"90%"
  },
  mainContainer: {
    flex:1,
    width:windowWidth,
    // gap: 15,
    marginTop: 5,
    // borderWidth:2,
    // borderColor:'red',

  },
  dotCircle: {
    color: 'blue',
    width:"10%",
    // borderWidth:1,
    // borderColor:'green',
    textAlign:'center',
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
  checkIcon: {
    fontWeight: '900',
    color: 'white',
    textAlign: 'center',
  },
  Text5: {
    color: 'white',
    fontWeight: '500',
  },
  step2Container: {
    fontSize: 16,
    fontWeight: '500',
    paddingHorizontal: 15,
  },
  greenText: {
    color: 'green',
  },
  step2ContainerButton: {
    backgroundColor: '#FFC72C',
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  step2DetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 8,
    gap: 10,
    borderWidth: 1,
    borderColor: '#D0D0D0',
  },
  Text7: {
    width: '90%',
    color: 'black',
    fontWeight: '600',
  },
  paymentContainer: {
    marginHorizontal: 15,
    gap: 15,
  },
  separatePayments: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 2,
  },
  step3Container: {
    paddingHorizontal: 15,
    gap: 5,
  },
  step3DetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 10,
    borderRadius: 2,
    marginTop: 5,
    marginBottom: 5,
    borderWidth: 0.7,
    borderColor: '#D0D0D0',
  },
  step3DetailsText1: {
    fontSize: 18,
    fontWeight: '700',
    color: 'black',
  },
  shippingDetailsContainer: {
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderWidth: 0.7,
    borderColor: '#D0D0D0',
    borderRadius: 2,
    padding: 5,
    gap: 7,
  },
  listContainers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  OrderTotal: {
    fontSize: 23,
    fontWeight: '900',
    color: 'black',
  },
  finalPrice: {
    color: 'red',
    fontSize: 17,
    fontWeight: '700',
  },
  Text9: {
    fontSize: 16,
    fontWeight: 'medium',
    color: 'rgb(0,0,0)',
  },
  LoadingIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'red',
    height: 500,
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
