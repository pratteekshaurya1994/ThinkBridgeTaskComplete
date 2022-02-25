import React, {useCallback, useState} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
  ImageBackground,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const CircularButtonComponent = ({textColor}) => {
  const navigation = useNavigation();
  const fallBack = () => {
    navigation.navigate('Camera');
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={fallBack}
      style={[styles.holder]}>
      <View style={[styles.headWrapper]}>
        <View
          style={[
            {
              borderRadius: 100,
              backgroundColor: '#fff',
              borderWidth: 1,
              borderColor: textColor,
              marginBottom: 20,
              elevation: 8,
            },
          ]}>
          <View style={styles.wrapper}>
            <Text
              style={{
                color: textColor,
                fontSize: 10,
              }}>
              home
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  holder: {
    marginBottom: 10,
    paddingBottom: 15,
    height: 80,
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 10,
    alignItems: 'center',
  },
  headWrapper: {
    width: 57,
    height: 57,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    shadowOffset: {width: 0, height: 0.5 * 8},
    shadowOpacity: 0.3,
    shadowRadius: 0.8 * 8,
    shadowColor: '#0000000F',
  },
  wrapper: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  textHolder: {
    marginBottom: 5,
    paddingTop: 3,
    position: 'relative',
  },
  text: {
    fontSize: 12,
    color: 'white',
  },
});

export default CircularButtonComponent;
