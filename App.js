import React from 'react';
import {useRef} from 'react';
import { Image, StyleSheet, SafeAreaView,TextInput, Text, View,Button, Dimensions,Animated,TouchableOpacity} from 'react-native';
import { NavigationContainer,useScrollToTop } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import DayScreen from './DayScreen';
import 'react-native-gesture-handler';
import { useFonts } from 'expo-font';

  const Tab = createBottomTabNavigator();
  const App = () => {

  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  const [loaded] = useFonts({
    Poppins: require('./assets/fonts/Poppins-Medium.ttf'),
  });
  
  if (!loaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <Tab.Navigator 
      tabBarOptions={{
      showLabel: false,
      style: {
        position: 'absolute',
        bottom: 25,
        left: 20,
        right: 20,
        elevation: 0,
        backgroundColor: '#ffffff',
        borderRadius: 30,
        height: 65
      }
    }}
    >
        <Tab.Screen name="Home" component={HomeScreen} options={{tabBarIcon: ({focused}) => (
          <View>
            <Image source={require('./images/icon_earth.png')} resizeMode='contain' style={{ width: 25, height: 25}} />
            <Text style={{color: focused ? '#1B264D' : '#748c94', fontWeight: '500', fontFamily: 'Poppins'}}>
              Home
            </Text>
          </View>
        ), }}
        listeners={({ navigation, route }) => ({
          // Onpress Update....
          tabPress: e => {
            Animated.spring(tabOffsetValue, {
              toValue: 0,
              useNativeDriver: true
            }).start();
          }
        })}
        />
        <Tab.Screen name="Day" component={DayScreen}  options={{tabBarIcon: ({focused}) => (
          <View>
            <Image source={require('./images/icon_day.png')} resizeMode='contain' style={{ width: 25, height: 25}} />
            <Text style={{color: focused ? '#1B264D' : '#748c94', fontWeight: '500', fontFamily: 'Poppins'}}>
              APOD
            </Text>
          </View>
        ), }}  listeners={({ navigation, route }) => ({
          // Onpress Update....
          tabPress: e => {
            Animated.spring(tabOffsetValue, {
              toValue: getWidth(),
              useNativeDriver: true
            }).start();
          }
        })}
        /> 
      </Tab.Navigator>
      <Animated.View style={{
            width: getWidth() -20,
            height: 3,
            backgroundColor: '#816CFF',
            position: 'absolute',
            bottom: 85,
            left: 45,
            borderRadius: 20,
            transform:[
              {translateX: tabOffsetValue}
            ]
      }}>

      </Animated.View>
    </NavigationContainer>
    );
  }
  function getWidth() {
    let width = Dimensions.get("window").width
  
    // Horizontal Padding = 20...
    width = width - 80
  
    // Total five Tabs...
    return width / 2
  }
  export default App;


  const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  text: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle :{
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  image2: {
    width: 250,
    height: 250
  },
  containerAll:{
    flex : 1
  },
  tabScreen: {
    
  },
  });
