import {Platform, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import StackNavigator from './navigation/StackNavigator';
import {Provider} from 'react-redux';
import Store from './redux/store/store';
import {ModalPortal} from 'react-native-modals';
import {UserContext} from './context/Context';
import SplashScreen from 'react-native-splash-screen';


const APP = () => {
  useEffect(()=>{
    if(Platform.OS === 'android')
    SplashScreen.hide();
  <>
  </>
  },[])
  return (
    <Provider store={Store}>
      <UserContext>
        <StackNavigator />
        <ModalPortal />
      </UserContext>
    </Provider>
  );
};

export default APP;

const styles = StyleSheet.create({});
