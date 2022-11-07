import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from'@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Entypo } from '@expo/vector-icons'; 

import Home from './Home'
import AddNew from './AddNew'
import ListAll from './ListAll'

const Tab = createBottomTabNavigator();

export default function App() {

  return(
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'md-home';
            } else if (route.name === 'Add new') {
              iconName = 'md-add-circle';
            } else if (route.name === 'List all') {
              iconName = 'md-list';
            }

            return <Ionicons name={ iconName } size={ 24 } color="black" />;
          },
        })}>
        <Tab.Screen name='Home' component={ Home } />
        <Tab.Screen name='Add new' component={ AddNew } />
        <Tab.Screen name='List all' component={ ListAll } />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
