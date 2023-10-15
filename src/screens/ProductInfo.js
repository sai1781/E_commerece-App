import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Pressable,
  Dimensions,
  ActivityIndicator,
  Modal,
} from 'react-native';
import React, {useRef, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign'; // Import AntDesign
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation, useRoute} from '@react-navigation/native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {addToCart} from '../redux/slice/CartReducer';
import {useDispatch, useSelector} from 'react-redux';

const ProductInfo = () => {
  const [addedToCart, setAddedToCart] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const route = useRoute();
  const dispatch = useDispatch();
  const {width} = Dimensions.get('window');
  const navigation = useNavigation();
  const height = (width * 100) / 100;

  const addItemToCart = item => {
    setTimeout(() => {
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
      }, 1000);
    }, 3100);
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
      console.log(ref);
    }, 3000);
  };
  const cart = useSelector(state => state.cart.cart);
  console.log(cart);
  const ref = useRef();
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
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
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {route.params.carouselImages.map((item, index) => (
            <ImageBackground
              style={{width, height, marginTop: 5, resizeMode: 'contain'}}
              source={{uri: item}}
              key={index}>
              <View style={styles.backgroundImageDetails}>
                <View style={styles.Icon}>
                  <Text style={styles.offerText}>20% off</Text>
                </View>
                <Pressable style={styles.shareIconContainer}>
                  <MaterialCommunityIcons
                    name="share-variant"
                    style={styles.shareIcon}
                  />
                </Pressable>
              </View>
              <View style={[styles.heartContainer, styles.Icons]}>
                <AntDesign name="hearto" size={24} color="black" />
              </View>
            </ImageBackground>
          ))}
        </ScrollView>
        <View style={styles.productDetailsContainer}>
          <Text style={styles.productDetails}>{route?.params?.title}</Text>
          <Text style={styles.productPrice}>₹{route?.params?.price}</Text>
        </View>
        <Text style={{height: 1, borderColor: '#D0D0D0', borderWidth: 1}} />
        <View style={styles.colorContainer}>
          <Text>Color:</Text>
          <Text style={styles.color}>{route?.params?.color}</Text>
        </View>
        <View style={styles.colorContainer}>
          <Text>Size:</Text>
          <Text style={styles.color}>{route?.params?.size}</Text>
        </View>
        <Text style={{height: 1, borderColor: '#D0D0D0', borderWidth: 1}} />
        <View style={styles.totalPriceContainer}>
          <Text style={styles.totalPrice}>
            ₹ Total : {route?.params?.price}
          </Text>
          <Text style={styles.deliveryInfo}>
            FREE delivery Tomorrow by 3PM.Order within 10hrs 30 min
          </Text>
          <View>
            <Ionicons name="location" style={styles.locationIcon} />
            <Text style={styles.deliveryAddress}>
              Deliver To Sujan - Banglore 560019
            </Text>
          </View>
        </View>
        <Text style={styles.inStock}>IN Stock</Text>
        {addedToCart ? (
          <>
            <ActivityIndicator size="large" color="#00ff00" />
          </>
        ) : (
          <></>
        )}
        <Pressable
          style={[styles.addToCart, styles.Button]}
          onPress={() => addItemToCart(route?.params?.item)}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </Pressable>

        <Pressable
        onPress={()=> navigation.navigate('ConfirmationScreen')}
        style={[styles.buyNow, styles.Button]}>
          <Text style={styles.buttonText}>Buy Now</Text>
        </Pressable>
      </ScrollView>

      <View style={styles.centeredView}>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Pressable style={styles.checkContainer}>
                <AntDesign name="checkcircle" style={styles.checkIcon} />

                <Text style={styles.textStyle}>Item Added to Cart</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

export default ProductInfo;

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
  slideShowImage: {
    resizeMode: 'contain',
    height: 500,
    width: 400,
  },
  backgroundImageDetails: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  Icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#C60C30',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  offerText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 12,
  },
  shareIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  shareIcon: {
    fontSize: 24,
    color: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
  },
  heartContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 'auto',
    marginLeft: 20,
    marginBottom: 20,
  },
  productDetailsContainer: {
    padding: 10,
  },
  productDetails: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
  productPrice: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 6,
    color: 'black',
  },
  colorContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  color: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  totalPriceContainer: {
    marginHorizontal: 5,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
    color: 'black',
  },
  deliveryInfo: {
    color: '#00CED1',
  },
  locationIcon: {
    fontSize: 24,
    color: 'black',
  },
  inStock: {
    color: 'green',
    marginHorizontal: 10,
    fontWeight: '500',
  },
  deliveryAddress: {
    fontSize: 15,
    fontWeight: '500',
  },
  Button: {
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  addToCart: {
    backgroundColor: '#FFC72C',
  },
  buyNow: {
    backgroundColor: '#50C878',
  },
  buttonText: {
    fontWeight: '600',
    color: 'white',
    fontSize: 14,
  },
  addingToCart: {
    display: 'block',
  },
  centeredView: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  checkContainer: {
    flexDirection: 'row',
    gap: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 2,
    height: 30,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    width: '100%',
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    color: 'green',
    textAlign: 'center',
  },
  checkIcon: {
    color: 'green',
    fontSize: 20,
  },
});
