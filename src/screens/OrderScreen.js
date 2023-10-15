import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React, {useEffect} from 'react';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';

const OrderScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Main');
    }, 1300);
  }, []);
  return (
    <SafeAreaView style={styles.header}>
      <LottieView
        source={require('../../assets/thumbs.json')}
        // ref={animation}
        style={styles.lottieAnimation}
        autoPlay
        loop={false}
        speed={0.6}
      />
      <Text style={styles.animationText}>Your Order Has been Recieved</Text>
      <LottieView
        source={require('../../assets/sparkle.json')}
        style={styles.lottieAnimation2}
        autoPlay
        loop={false}
        speed={0.6}
      />
    </SafeAreaView>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  lottieAnimation: {
    height: 260,
    width: 300,
    alignSelf: 'center',
    marginTop: 40,
    justifyContent: 'center',
  },
  animationText: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  lottieAnimation2: {
    height: 300,
    position: 'absolute',
    top: 100,
    width: 300,
    alignSelf: 'center',
  },
});
