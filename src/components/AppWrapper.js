import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';

const AppWrapper = ({children}) => {
  return (
    <SafeAreaView style={{flex: 1,backgroundColor:'#E3E3E3'}}>
      {children}
    </SafeAreaView>
  );
};

export default AppWrapper;
