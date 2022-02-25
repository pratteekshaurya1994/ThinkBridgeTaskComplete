import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import StartupScreen from '../screens/StartupScreen';
import TabNavigator from './TabNavigator';
import {NativeBaseProvider} from 'native-base';

const MainStack = createNativeStackNavigator();
const MainNavigator = () => {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <MainStack.Navigator initialRouteName="Startup">
          <MainStack.Screen
            name="Startup"
            component={StartupScreen}
            options={{headerShown: false}}
          />
          <MainStack.Screen
            name="TabNavigator"
            component={TabNavigator}
            options={{headerShown: false}}
          />
        </MainStack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

export default MainNavigator;
