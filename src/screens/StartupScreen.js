import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const StartupScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('TabNavigator');
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thinkbridge</Text>
      <Text style={styles.title}>Programming Assignment</Text>
    </View>
  );
};

export default StartupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 26,
    color: 'white',
  },
});
