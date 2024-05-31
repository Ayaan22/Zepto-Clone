import {View, Text, StatusBar, Image} from 'react-native';
import React, {useEffect} from 'react';
import AppWrapper from '../../components/AppWrapper';
import {myColors} from '../../utils/Themes/Colors';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      AsyncStorage.getItem('key')
        .then(result => {
          if (result) {
            navigation.replace('Home');
          } else {
            navigation.replace('Login');
          }
        })
        .catch(err => {
          console.log(err);
        });
    }, 2000);
  }, []);

  return (
    <AppWrapper>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: myColors.violet,
        }}>
        <StatusBar hidden />
        <Image
          style={{width: responsiveWidth(100), height: 100}}
          source={{
            uri: 'https://resize.indiatvnews.com/en/centered/newbucket/1200_675/2021/12/zepto-1640066094.jpg',
          }}
        />
      </View>
    </AppWrapper>
  );
};

export default Splash;
