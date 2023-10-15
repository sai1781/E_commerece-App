import {
  StyleSheet,
  Pressable,
  Text,
  ScrollView,
  View,
  SafeAreaView,
  Platform,
  TextInput,
  Image,
  Modal,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect, useContext, useCallback} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign'; // Import AntDesign
import Feather from 'react-native-vector-icons/Feather';
import Evillcons from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SliderBox} from 'react-native-image-slider-box';
import ProductItem from '../components/ProductItem';
import DropDownPicker from 'react-native-dropdown-picker';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {BottomModal, SlideAnimation, ModalContent} from 'react-native-modals';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {UserType} from '../context/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import {product_url} from '../utils';
import Entypo from 'react-native-vector-icons/Entypo';
import product_url2 from '../utils2';
import Swiper from 'react-native-swiper';

const windowWidth = Dimensions.get('window').width;

const Home = () => {
  console.log('producturl2 => ', product_url2);
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState('jewelery');
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const {userId, setUserId} = useContext(UserType);
  const [selectedAddress, setSelectedAddress] = useState('');
  const dispatch = useDispatch();
  //This useEffect used to fetch the userId by using the context hook...
  //If the user logged in once then it can be remove steps login again...
  //Token is saved in local storage if the token available...
  //Then automatically it logged in.....
  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('authToken');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId; //Here we are decoding the jwt_token
      setUserId(userId);
    };
    fetchUser();
  }, []);
  //this useEffect which is used to fetch the data from fake store API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await product_url2.get('/products');
        console.log(response);
        setProducts(response.data);
      } catch (error) {
        console.log('Error fetching the fakeApi', error);
      }
    };
    fetchData();
  }, []);
  const onGenderOpen = useCallback(() => {
    // setCompanyOpen(false);
  }, []);
  //THis useEffect which used to fetch the data individual addresses...
  useEffect(() => {
    if (userId) {
      console.log(userId);
      fetchAddresses();
    }
  }, [userId, modalVisible]);
  console.log(userId + 'userId');
  const fetchAddresses = async () => {
    if (userId) {
      console.log('we are getting the user id here in fetchAddress ');
    }
    console.log('fetching calling here in addresses ');

    try {
      const response = await product_url.get(`/addresses/${userId}`);
      const data = response.data;
      console.log(data, 'data is coming');
      setAddresses(data);
    } catch (error) {
      console.log('daat is not coming here');
      console.log('Error', error);
    }
  };
  console.log(addresses + 'address');

  const list = [
    {
      id: '0',
      image: 'https://m.media-amazon.com/images/I/41EcYoIZhIL._AC_SY400_.jpg',
      name: 'Home',
    },
    {
      id: '1',
      image:
        'https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/blockbuster.jpg',
      name: 'Deals',
    },
    {
      id: '3',
      image:
        'https://images-eu.ssl-images-amazon.com/images/I/31dXEvtxidL._AC_SX368_.jpg',
      name: 'Electronics',
    },
    {
      id: '4',
      image:
        'https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/All_Icons_Template_1_icons_01.jpg',
      name: 'Mobiles',
    },
    {
      id: '5',
      image:
        'https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/music.jpg',
      name: 'Music',
    },
    {
      id: '6',
      image: 'https://m.media-amazon.com/images/I/51dZ19miAbL._AC_SY350_.jpg',
      name: 'Fashion',
    },
  ];
  const images = [
    'https://img.etimg.com/thumb/msid-93051525,width-1070,height-580,imgsize-2243475,overlay-economictimes/photo.jpg',
    'https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/PD23/Launches/Updated_ingress1242x550_3.gif',
    'https://images-eu.ssl-images-amazon.com/images/G/31/img23/Books/BB/JULY/1242x550_Header-BB-Jul23.jpg',
  ];
  const deals = [
    {
      id: '20',
      title: 'OnePlus Nord CE 3 Lite 5G (Pastel Lime, 8GB RAM, 128GB Storage)',
      oldPrice: 25000,
      price: 19000,
      image:
        'https://images-eu.ssl-images-amazon.com/images/G/31/wireless_products/ssserene/weblab_wf/xcm_banners_2022_in_bau_wireless_dec_580x800_once3l_v2_580x800_in-en.jpg',
      carouselImages: [
        'https://m.media-amazon.com/images/I/61QRgOgBx0L._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61uaJPLIdML._SX679_.jpg',
        'https://m.media-amazon.com/images/I/510YZx4v3wL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61J6s1tkwpL._SX679_.jpg',
      ],
      color: 'Stellar Green',
      size: '6 GB RAM 128GB Storage',
    },
    {
      id: '30',
      title:
        'Samsung Galaxy S20 FE 5G (Cloud Navy, 8GB RAM, 128GB Storage) with No Cost EMI & Additional Exchange Offers',
      oldPrice: 74000,
      price: 26000,
      image:
        'https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/SamsungBAU/S20FE/GW/June23/BAU-27thJune/xcm_banners_2022_in_bau_wireless_dec_s20fe-rv51_580x800_in-en.jpg',
      carouselImages: [
        'https://m.media-amazon.com/images/I/81vDZyJQ-4L._SY879_.jpg',
        'https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/71yzyH-ohgL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg',
      ],
      color: 'Cloud Navy',
      size: '8 GB RAM 128GB Storage',
    },
    {
      id: '40',
      title:
        'Samsung Galaxy M14 5G (ICY Silver, 4GB, 128GB Storage) | 50MP Triple Cam | 6000 mAh Battery | 5nm Octa-Core Processor | Android 13 | Without Charger',
      oldPrice: 16000,
      price: 14000,
      image:
        'https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/CatPage/Tiles/June/xcm_banners_m14_5g_rv1_580x800_in-en.jpg',
      carouselImages: [
        'https://m.media-amazon.com/images/I/817WWpaFo1L._SX679_.jpg',
        'https://m.media-amazon.com/images/I/81KkF-GngHL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61IrdBaOhbL._SX679_.jpg',
      ],
      color: 'Icy Silver',
      size: '6 GB RAM 64GB Storage',
    },
    {
      id: '40',
      title:
        'realme narzo N55 (Prime Blue, 4GB+64GB) 33W Segment Fastest Charging | Super High-res 64MP Primary AI Camera',
      oldPrice: 12999,
      price: 10999,
      image:
        'https://images-eu.ssl-images-amazon.com/images/G/31/tiyesum/N55/June/xcm_banners_2022_in_bau_wireless_dec_580x800_v1-n55-marchv2-mayv3-v4_580x800_in-en.jpg',
      carouselImages: [
        'https://m.media-amazon.com/images/I/41Iyj5moShL._SX300_SY300_QL70_FMwebp_.jpg',
        'https://m.media-amazon.com/images/I/61og60CnGlL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61twx1OjYdL._SX679_.jpg',
      ],
    },
  ];
  const offers = [
    {
      id: '0',
      title:
        'Oppo Enco Air3 Pro True Wireless in Ear Earbuds with Industry First Composite Bamboo Fiber, 49dB ANC, 30H Playtime, 47ms Ultra Low Latency,Fast Charge,BT 5.3 (Green)',
      offer: '72% off',
      oldPrice: 7500,
      price: 4500,
      image:
        'https://m.media-amazon.com/images/I/61a2y1FCAJL._AC_UL640_FMwebp_QL65_.jpg',
      carouselImages: [
        'https://m.media-amazon.com/images/I/61a2y1FCAJL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/71DOcYgHWFL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/71LhLZGHrlL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61Rgefy4ndL._SX679_.jpg',
      ],
      color: 'Green',
      size: 'Normal',
    },
    {
      id: '1',
      title:
        'Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery',
      offer: '40%',
      oldPrice: 7955,
      price: 3495,
      image: 'https://m.media-amazon.com/images/I/41mQKmbkVWL._AC_SY400_.jpg',
      carouselImages: [
        'https://m.media-amazon.com/images/I/71h2K2OQSIL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/71BlkyWYupL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/71c1tSIZxhL._SX679_.jpg',
      ],
      color: 'black',
      size: 'Normal',
    },
    {
      id: '2',
      title: 'Aishwariya System On Ear Wireless On Ear Bluetooth Headphones',
      offer: '40%',
      oldPrice: 7955,
      price: 3495,
      image: 'https://m.media-amazon.com/images/I/41t7Wa+kxPL._AC_SY400_.jpg',
      carouselImages: ['https://m.media-amazon.com/images/I/41t7Wa+kxPL.jpg'],
      color: 'black',
      size: 'Normal',
    },
    {
      id: '3',
      title:
        'Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery',
      offer: '40%',
      oldPrice: 24999,
      price: 19999,
      image: 'https://m.media-amazon.com/images/I/71k3gOik46L._AC_SY400_.jpg',
      carouselImages: [
        'https://m.media-amazon.com/images/I/41bLD50sZSL._SX300_SY300_QL70_FMwebp_.jpg',
        'https://m.media-amazon.com/images/I/616pTr2KJEL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/71wSGO0CwQL._SX679_.jpg',
      ],
      color: 'Norway Blue',
      size: '8GB RAM, 128GB Storage',
    },
  ];
  const [items, setItems] = useState([
    {label: "Men's clothing", value: "men's clothing"},
    {label: 'jewelery', value: 'jewelery'},
    {label: 'electronics', value: 'electronics'},
    {label: "women's clothing", value: "women's clothing"},
  ]);
  console.log(selectedAddress);

  return (
    <>
      <SafeAreaView style={styles.HomeContainer}>
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
          <View style={styles.deliverContainer}>
            <Evillcons
              name="location"
              style={[styles.locationIcon, styles.Icons]}
            />
            <Pressable onPress={() => setModalVisible(!modalVisible)}>
              {selectedAddress ? (
                <Text>
                  Deliver to {selectedAddress?.name} - {selectedAddress?.street}
                </Text>
              ) : (
                <Text style={styles.Text}>click here to add Address</Text>
              )}
            </Pressable>
            <Icon name="angle-down" style={[styles.Icons]} />
          </View>

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {list?.map((e, idx) => {
              return (
                <Pressable key={e.id} style={styles.horizontalContainer}>
                  <Image
                    key={e.id}
                    horizontal={true}
                    style={styles.horizontalImage}
                    source={{
                      uri: e.image,
                    }}
                  />
                  <Text style={[styles.horizontalText, styles.text]}>
                    {e.name}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          <Swiper
            autoplay={true} // Enable autoplay
            autoplayTimeout={2} // Set autoplay interval to 3 seconds
            showsPagination={true} // Show pagination dots
            style={styles.swiper}>
            {images.map((image, index) => (
              <Image key={index} source={{uri: image}} style={styles.image} />
            ))}
          </Swiper>

          <Text style={[styles.text, styles.trendingText]}>
            Trending Deals of the week
          </Text>

          <View style={styles.trendingContainer}>
            {deals?.map((e, idx) => (
              <Pressable style={styles.trendingSubContainer} key={idx}>
                <Image source={{uri: e.image}} style={styles.trendingImages} />
              </Pressable>
            ))}
          </View>
          {/* Today's Deals */}
          <Text style={styles.horizontalLine}></Text>
          <Text style={[styles.todayDeals, styles.text]}>Today's Deals</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {offers.map((e, idx) => (
              <Pressable
                key={idx}
                style={styles.todayDealsContainer}
                onPress={() =>
                  navigation.navigate('ProductInfo', {
                    id: e.id,
                    title: e.title,
                    price: e.price,
                    carouselImages: e.carouselImages,
                    color: e?.color,
                    size: e?.size,
                    oldPrice: e?.oldPrice,
                    item: e,
                  })
                }>
                <Image
                  style={styles.todayImages}
                  source={{
                    uri: e.image,
                  }}
                />
                <View style={styles.todayDealsButton}>
                  <Text style={[styles.todayDealsText]}>
                    Upto {e.offer} Off
                  </Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
          <Text style={styles.horizontalLine}></Text>
          <View
            style={{
              marginHorizontal: 10,
              marginTop: 20,
              width: '45%',
              marginBottom: open ? 50 : 15,
            }}>
            {/* Here we are writing the dropDown menu which will show the items of categories */}

            <DropDownPicker
              style={{
                borderColor: '#B7B7B7',
                height: 30,
                marginBottom: open ? 120 : 15,
              }}
              open={open}
              value={category} //genderValue
              items={items}
              setOpen={setOpen}
              setValue={setCategory}
              setItems={setItems}
              placeholder="choose category"
              // placeholderStyle={styles.placeholderStyles}
              onOpen={onGenderOpen}
              // onChangeValue={onChange}
              zIndex={3000}
              zIndexInverse={1000}
            />
          </View>

          <View style={[styles.productItemContainer]}>
            {/* Here we are writing the filter function which filter's out the data selected.. */}
            {products
              .filter(item => item.category === category)
              .map((e, idx) => (
                <ProductItem item={e} key={idx} />
              ))}
          </View>
        </ScrollView>
      </SafeAreaView>
      <BottomModal
        onBackdropPress={() => setModalVisible(!modalVisible)}
        swipeDirection={['up', 'down']}
        swipeThreshold={200}
        modalAnimation={
          new SlideAnimation({
            slideFrom: 'bottom',
          })
        }
        onHardwareBackPress={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(!modalVisible)}>
        <ModalContent style={styles.modalContainer}>
          <View style={{marginBottom: 8}}>
            <Text style={{fontSize: 16, fontWeight: '500'}}>
              Choose your Location
            </Text>
            <Text>Select a delivery Location to see product avaliability</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {/* Here we need to add the address same */}
            {addresses?.map((e, idx) => (
              <Pressable
                key={idx}
                onPress={() => {
                  setSelectedAddress(e);
                }}
                style={{
                  width: 150,
                  height: 150,
                  borderColor: '#D0D0D0',
                  marginTop: 10,
                  borderWidth: 1,
                  borderRadius: 2,
                  padding: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: 7,
                  backgroundColor: selectedAddress === e ? '#FBCEB1' : 'white',
                }}>
                <View style={styles.nameContainer}>
                  <Text style={[styles.Text, styles.addressesText]}>
                    {e.name}
                  </Text>
                  <Entypo
                    style={[styles.Icons, styles.locationIcon]}
                    name="location-pin"
                  />
                </View>
                <Text numberOfLines={1}>{e?.houseNo}</Text>
                <Text numberOfLines={1}>{e?.street}</Text>
                <Text numberOfLines={1}>India</Text>
              </Pressable>
            ))}
            <Pressable
              style={styles.modalCard}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('AddAddress');
              }}>
              <Text style={styles.modalCardText}>
                Add an Address or pick-up point
              </Text>
            </Pressable>
          </ScrollView>
          <View style={styles.modalDetails}>
            <View style={styles.modelLocation}>
              <Ionicons style={styles.modalIcon} name="location" />
              <Text style={styles.modalText}>Enter an indian pincode</Text>
            </View>
            <View style={styles.modelLocation}>
              <MaterialCommunityIcons style={styles.modalIcon} name="target" />
              <Text style={styles.modalText}>Use my current location</Text>
            </View>
            <View style={styles.modelLocation}>
              <Ionicons style={styles.modalIcon} name="globe-outline" />
              <Text style={styles.modalText}>Deliver outside India</Text>
            </View>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  HomeContainer: {
    // paddingTop: Platform.OS === 'android' ? 20 : 0,
    flex: 1,
    backgroundColor: 'white',
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
  text: {
    color: 'black',
    fontWeight: '500',
  },
  deliverContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    padding: 10,
    gap: 10,
    color: 'black',
    backgroundColor: '#AFEEEE',
  },
  horizontalContainer: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  trendingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 5,
    width: windowWidth,
  },
  trendingImages: {
    height: 180,
    width: 180,
    resizeMode: 'contain',
  },
  trendingText: {
    marginHorizontal: 10,
    fontSize: 20,
    fontWeight: '500',
  },
  trendingSubContainer: {
    marginVertical: 5,
    marginHorizontal: 5,
    // flex:1,
    width: '45%',
  },
  horizontalLine: {
    height: 0.5,
    borderColor: '#D0D0D0',
    borderWidth: 1,
    marginTop: 10,
  },
  checking: {
    borderWidth: 1,
    borderColor: 'red',
  },
  todayDeals: {
    fontSize: 25,
    fontWeight: '500',
  },
  todayImages: {
    height: 150,
    width: 150,
    resizeMode: 'contain',
  },
  todayDealsContainer: {
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  todayDealsButton: {
    backgroundColor: 'green',
    width: 130,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 5,
    justifyContent: 'center',
  },
  todayDealsText: {
    color: 'white',
    fontWeight: '800',
  },
  productItemContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth,
  },
  dropDown: {
    borderColor: '#B7B7B7',
    height: 30,
  },
  modalContainer: {
    width: '100%',
    height: 400,
  },
  modalCard: {
    width: 150,
    height: 150,
    borderColor: '#D0D0D0',
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 2,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 7,
  },
  modalCardText: {
    textAlign: 'center',
    color: 'green',
    fontWeight: '500',
  },
  modalDetails: {
    flexDirection: 'column',
    gap: 12,
    marginBottom: 20,
  },
  modelLocation: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
  },
  modalIcon: {
    fontSize: 24,
    color: '#0066b2',
  },
  modalText: {
    color: '#0066b2',
    fontWeight: '600',
  },
  nameContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  locationIcon: {
    color: 'red',
  },
  Text: {
    fontSize: 15,
    color: '#181818',
  },
  addressesText: {
    fontSize: 20,
    fontWeight: 600,
  },
  swiper: {
    borderWidth: 1,
    borderColor: 'red',
    height: 250,
  },
  image: {
    width: windowWidth,
    height: 250,
  },
});
