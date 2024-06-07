import {View, Text, PermissionsAndroid, Modal} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppWrapper from '../../components/AppWrapper';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import {apiKey} from '../../utils/Keys/Keys';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {myColors} from '../../utils/Themes/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../../components/CustomButton';

const Home = () => {
  const [userLocation, setuserLocation] = useState([]);
  const [address, setaddress] = useState('');
  const [isLocationModal, setisLocationModal] = useState(false);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Zepto App',
          message:
            'Zepto App needs access to your location ' +
            'so you can access that location products.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getCurrentLocation();
      } else {
        setisLocationModal(true);
        console.log('Not given');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      async position => {
        if (position) {
          setisLocationModal(false);
          setuserLocation({
            latitude: position.coords?.latitude,
            longitude: position.coords?.longitude,
          });
          const {data} = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${apiKey}`,
          );
          setaddress(data.results[0].formatted_address);
        }
      },
      error => {
        setisLocationModal(true);
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000},
    );
  };

  return (
    <AppWrapper>
      <AppHeader isLocationModal={isLocationModal} address={address} />
      <AppBody />
      <AppFooter
        isLocationModal={isLocationModal}
        onPress={requestLocationPermission}
      />
    </AppWrapper>
  );
};

const AppHeader = ({address, isLocationModal}) => {
  return (
    <View
      style={{
        flex: 0.1,

        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
      }}>
      <Ionicons name="person-circle-outline" size={40} />
      <View style={{flex: 0.7}}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 18,
            fontWeight: '800',
            color: myColors.violet,
          }}>
          Delivering in 10 Min
        </Text>
        <Text
          numberOfLines={1}
          style={{fontSize: 15, fontWeight: '600', color: myColors.grey}}>
          {isLocationModal
            ? 'No Location Enabled'
            : address
            ? `Home - ${address}`
            : 'Fetching Location...'}
        </Text>
      </View>
      <MaterialCommunityIcons name="note-edit-outline" size={35} />
    </View>
  );
};

const AppBody = () => {
  return <View style={{flex: 1}}></View>;
};

const AppFooter = ({onPress, isLocationModal}) => {
  return (
    <Modal
      visible={isLocationModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => {
        console.log('Modal has been closed.');
      }}>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <View
          style={{
            flex: 0.4,
            backgroundColor: myColors.white,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingVertical: 15,
            paddingHorizontal: 15,
            gap: 10,
          }}>
          <View style={{alignItems: 'center'}}>
            <MaterialIcons name="pin-drop" size={100} color={myColors.black} />
          </View>

          <Text
            style={{
              fontSize: 18,
              fontWeight: '600',
              color: myColors.black,
              textAlign: 'center',
            }}>
            Location Permissions is Off
          </Text>
          <Text
            style={{
              textAlign: 'center',
              color: myColors.black,
              fontSize: 14,
              opacity: 0.8,
              top: -5,
              marginBottom: 10,
            }}>
            Please enable location permission for better delivery experience
          </Text>
          <CustomButton title="Continue" onPress={onPress} />
        </View>
      </View>
    </Modal>
  );
};

export default Home;
