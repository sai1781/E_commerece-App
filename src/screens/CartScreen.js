import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  Image,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from '../redux/slice/CartReducer';

const CartScreen = () => {
  const cart = useSelector(state => state.cart.cart);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const total = cart
    ?.map(item => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);
  console.log(total);
  const increaseQuantity = item => {
    dispatch(incrementQuantity(item));
  };
  const decreaseQuantity = item => {
    dispatch(decrementQuantity(item));
  };
  const deleteItem = item => {
    console.log('delete button is triggering here ');
    dispatch(removeFromCart(item));
  };
  const handleProceed = () => {
    if (cart.length === 0) {
      Alert.alert('Add the order to proceed', '0 Products in Cart');
    } else {
      navigation.navigate('ConfirmationScreen');
    }
  };

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <View style={styles.searchContainer}>
          <Pressable style={styles.searchContainer1}>
            <AntDesign
              name="search1"
              style={[styles.searchIcon, styles.Icons]}
            />
            <TextInput placeholder="Search here anything " />
          </Pressable>
          <Feather name="mic" style={[styles.featherIcon, styles.Icons]} />
        </View>

        <View style={styles.totalContainer}>
          <View style={styles.total}>
            <Text style={styles.Text}>subtotal : </Text>
            <Text style={styles.priceText}>{total}</Text>
          </View>
          <Text style={{fontSize: 13, color: 'black'}}>
            Emi details Available
          </Text>

          <Pressable style={styles.button} onPress={() => handleProceed()}>
            <Text style={styles.priceText}>
              Proceed to buy ({cart.length}) items
            </Text>
          </Pressable>
        </View>

        <Text style={styles.line}></Text>
        <View>
          {cart?.map((e, idx) => (
            <View key={idx} style={styles.mapContainer}>
              <Pressable style={styles.cartItems}>
                <Image
                  style={styles.cartImage}
                  source={{
                    uri: e?.image,
                  }}
                />
                <View>
                  <Text style={styles.cartText} numberOfLines={2}>
                    {e?.title}
                  </Text>
                  <Text style={styles.priceText}>{total}</Text>
                  <Image
                    style={styles.cartImage2}
                    source={{
                      uri: 'https://assets.stickpng.com/thumbs/5f4924cc68ecc70004ae7065.png',
                    }}
                  />
                  <Text style={styles.inStock}>In Stock</Text>
                </View>
              </Pressable>

              <Pressable>
                <View style={styles.functionsContainer}>
                  {e?.quantity > 1 ? (
                    <Pressable
                      style={styles.deleteContainer}
                      onPress={() => decreaseQuantity(e)}>
                      <AntDesign name="minus" style={styles.Icons} />
                    </Pressable>
                  ) : (
                    <Pressable
                      style={styles.deleteContainer}
                      onPress={() => decreaseQuantity(e)}>
                      <AntDesign name="delete" style={styles.Icons} />
                    </Pressable>
                  )}
                  <Pressable style={styles.itemContainer}>
                    <Text style={styles.Text}>{e?.quantity}</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => increaseQuantity(e)}
                    style={styles.plusContainer}>
                    <AntDesign name="plus" style={styles.Icons} />
                  </Pressable>

                  <Pressable
                    onPress={() => deleteItem(e)}
                    style={styles.deleteContainer2}>
                    <Text style={styles.Text}>Delete</Text>
                  </Pressable>
                </View>
              </Pressable>
              <Pressable style={styles.saveMoreContainer}>
                <Pressable style={styles.deleteContainer2}>
                  <Text style={styles.Text}>Save For later</Text>
                </Pressable>
                <Pressable style={styles.deleteContainer2}>
                  <Text style={styles.Text}>See More Like this</Text>
                </Pressable>
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CartScreen;

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
    fontWeight: '300',
  },
  totalContainer: {
    flexDirection: 'column',
    padding: 10,
    gap: 4,
  },
  total: {
    flexDirection: 'row',
  },
  cartImage: {
    height: 140,
    width: 140,
    resizeMode: 'contain',
  },
  Text: {
    fontSize: 16,
    fontWeight: '400',
    color: 'black',
  },
  priceText: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
  },
  button: {
    backgroundColor: '#FFC72C',
    padding: 5,
    borderRadius: 5,
    textAlign: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  line: {
    height: 1,
    borderColor: '#D0D0D0',
    borderWidth: 1,
    marginTop: 10,
  },
  mapContainer: {
    backgroundColor: 'white',
    // marginVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: 'black',
  },
  cartItems: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  cartText: {
    width: 180,
    color: 'black',
    fontWeight: '300',
  },
  cartImage2: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  inStock: {
    color: 'green',
    fontWeight: '500',
  },
  functionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 7,
    marginBottom: 10,
  },
  deleteContainer: {
    backgroundColor: '#D8D8D8',
    padding: 7,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  itemContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  plusContainer: {
    backgroundColor: '#D8D8D8',
    padding: 7,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },
  deleteContainer2: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 5,
    borderColor: '#C0C0C0',
    borderWidth: 0.6,
  },
  saveMoreContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
});
