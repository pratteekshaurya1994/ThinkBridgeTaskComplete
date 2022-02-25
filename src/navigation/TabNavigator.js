import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/dashboard/Home';
import Gallery from '../screens/dashboard/Gallery';
import Favourite from '../screens/dashboard/Favourite';
import CircularButtonComponent from '../components/circularButton';

const HomeStack = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{headerShown: true}}
      />
      <HomeStack.Screen
        name="Gallery"
        component={Gallery}
        options={{headerShown: true, title: 'Gallery'}}
      />
      <HomeStack.Screen
        name="Favourite"
        component={Favourite}
        options={{headerShown: true, title: 'Favourite'}}
      />
    </HomeStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#0C80E3',
        tabBarInactiveTintColor: '#0C80E3',
        tabBarShowLabel: true,
      }}>
      <Tab.Screen
        name="MainHome"
        component={HomeNavigator}
        options={{
          tabBarShowLabel: false,
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({color, size}) => {
            return <CircularButtonComponent textColor={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
