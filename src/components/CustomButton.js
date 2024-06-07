import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {myColors} from '../utils/Themes/Colors';

const CustomButton = ({title, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: myColors.violet,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        borderRadius: 10,
      }}>
      <Text style={{color: myColors.white, fontSize: 16, fontWeight: '600'}}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
