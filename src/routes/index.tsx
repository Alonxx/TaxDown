import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Dashboard, AddSubmissions, Submissions} from '../screens';
import {Text} from 'react-native';

const Tab = createBottomTabNavigator();
const DashboardStack = createNativeStackNavigator();

type ScreenComponentType = React.FC<{}>;

const DashboardStackScreen = () => (
  <DashboardStack.Navigator>
    <DashboardStack.Screen
      name="Dashboard"
      component={Dashboard}
      options={{headerShown: false}}
    />
    <DashboardStack.Screen
      name="Add Submissions"
      component={AddSubmissions as ScreenComponentType}
    />
  </DashboardStack.Navigator>
);

export const Routes = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{headerShown: false, tabBarIcon: _ => <Text>📋</Text>}}
        name="Taxes"
        component={DashboardStackScreen}
      />
      <Tab.Screen
        options={{headerShown: false, tabBarIcon: _ => <Text>📤</Text>}}
        name="Submissions"
        component={Submissions}
      />
    </Tab.Navigator>
  );
};
