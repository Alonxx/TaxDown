import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {RouteProp, ParamListBase} from '@react-navigation/native';

interface Props {
  tabs: {
    name: string;
    component: React.FC<{
      route: RouteProp<ParamListBase, string>;
      navigation: any;
    }>;
  }[];
}

const Tab = createMaterialTopTabNavigator();

export const TabsNavigator: React.FC<Props> = ({tabs}) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarPressColor: 'transparent',
        tabBarActiveTintColor: '#2f2e46',

        tabBarIndicatorStyle: {
          backgroundColor: '#397451',
        },
        tabBarStyle: {
          backgroundColor: 'transparent',
        },
      }}>
      {tabs.map(tab => (
        <Tab.Screen key={tab.name} name={tab.name} component={tab.component} />
      ))}
    </Tab.Navigator>
  );
};
