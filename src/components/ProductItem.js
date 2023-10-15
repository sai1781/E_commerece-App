import {StyleSheet, Text,Modal, View, Pressable, Image} from 'react-native';
import React, {useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {useDispatch} from 'react-redux';
import {addToCart} from '../redux/slice/CartReducer';
import { useNavigation } from '@react-navigation/native';

const ProductItem = ({item}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [addedToCart, setAddedToCart] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const addItemToCart = item => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  return (
    <Pressable 
    style={styles.container} key={item.idx}>
      <Image
        style={styles.image}
        source={{
          uri: item?.image,
        }}
      />
      <Text numberOfLines={2} style={[styles.productText]}>
        {item.title}
      </Text>
      <View style={styles.priceContainer}>
        <Text style={styles.text}>₹{item?.price}</Text>
        <Text style={styles.rating}>
          <MaterialIcons name="star-rate" />
          {item?.rating?.rate}ratings
        </Text>
      </View>
      <Pressable
        style={styles.productButton}
        onPress={() => {
          addItemToCart(item);
        }}>
        {addedToCart ? (
          <Text style={styles.buttonText}>Added to Cart</Text>
        ) : (
          <View style={styles.addingToCart}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </View>
        )}
      </Pressable>
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 20,
    flexDirection: 'column',
    gap: 3,
    width:'45%',
  },
  image: {
    height: 180,
    width: 150,
    resizeMode: 'contain',
  },
  productText: {
    width: 150,
    textAlign: 'center',
    fontWeight: '500',
    color: 'black',
  },
  text: {
    color: 'black',
    fontWeight: '800',
  },
  priceContainer: {
    flexDirection: 'row',
    gap: 25,
  },
  rating: {
    color: '#FFC72C',
    fontWeight: 'bold',
  },
  productButton: {
    backgroundColor: '#FFC72C',
    textAlign: 'center',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 7,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'medium',
    paddingHorizontal:5,
  },
});
