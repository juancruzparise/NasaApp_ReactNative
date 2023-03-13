import React from 'react';
import { Image,SafeAreaView, StyleSheet, Text, View, ScrollView,Dimensions,StatusBar,Platform,ImageBackground} from 'react-native';
import {useScrollToTop} from '@react-navigation/native';
import { Appbar } from 'react-native-paper';
import { Searchbar,Button } from 'react-native-paper';
import { useState, useRef } from "react";
import { Card, Title, Paragraph} from 'react-native-paper';
import { useFonts } from 'expo-font';
import Background from './images/astronaut-wallpaper.jpg';

export default function HomeScreen({items}) {

    const [searchText, setSearchText] = React.useState('')
    const [photos, setPhotos] = useState(items);
    const [loaded] = useFonts({
      Poppins: require('./assets/fonts/Poppins-Medium.ttf'),
    });
    
    const ref = React.useRef(null);
    useScrollToTop(ref);

    if (!loaded) {
      return null;
    }
    return (
        <View style={styles.containerAll}>
         <StatusBar hidden={true} translucent backgroundColor="transparent" style={styles.statusbar}/>
         {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />} 
         {/* <ImageBackground source={Background} resizeMode="cover" style={styles.image}> */}
        <Appbar.Header style={styles.header}>
        <Image source={require('./images/logo_nasa.png')} style={{ width: 100, height: 30}}/>
        </Appbar.Header>
        <SafeAreaView style={styles.container}>
        <ScrollView  contentContainerStyle={styles.scrollView} ref={ref} >
        <StatusBar hidden={false}  />
        <View style={styles.container}>
          <View style={styles.allFirstHome}>
          <View style={{
            paddingVertical: 15,
            paddingHorizontal: 5,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
        }}>
        </View>

        <Searchbar
          placeholder="Search for...(e.g. 'Moon')"
          onChangeText={text =>setSearchText(text)}
          style={styles.searchbar}
        />
      <Button color="#816CFF" disabled={searchText === "" || searchText === " "} style={styles.buttonSearch} title="Search" onPress={async () => {
        const results = await fetch(
          `https://images-api.nasa.gov/search?media_type=image&q=${searchText}`
        );
        const previews = await results.json();
        setPhotos(await previews.collection.items);
        console.log(previews);
      }}><Text style={styles.textButton}>Search</Text></Button>
      </View>
      {photos &&
          photos.map((preview) => ( 
         <View style={styles.container} key={ Math.random().toString(36).substr(2, 9) }> 
         <ScrollView>
         <Card style={styles.cardInfo} >
           <Image source={{uri: preview.links[0].href}}
           style={styles.photoDay} />
           <Card.Content>
           <Title  style={styles.textTitle}>{preview.data[0].title}</Title>
           <Paragraph  style={styles.textParagraph}>{preview.data[0].description}</Paragraph>
           </Card.Content>
         </Card>
           </ScrollView>
         </View>
         ))
         }
         </View>
         
         </ScrollView>
         </SafeAreaView>
         {/* </ImageBackground> */}
         </View>
       )
       }
const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      color: "#fff",
    },
    video:{
      height: 'auto',
      width: 'auto',
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    },
    image: {
      flex: 1,
      justifyContent: "center",
    },
    text: {
      color: "white",
      fontSize: 20,
      textAlign: "center",
      marginTop: 10,
      fontWeight: '500',
      fontFamily: 'Nasa',
      marginLeft:'auto',
      marginRight: 'auto'
    },
    subtitle :{
      color: "white",
      fontSize: 20,
      textAlign: "center",
    },
    searchbar:{
        width: 300,
        marginTop: -10,
        borderRadius: 15,
        backgroundColor: '#F5F5F5',
        marginLeft: 'auto',
        marginRight: 'auto'
      },
      textButton:{
        color: 'rgba(33, 34, 34, 0.836)'
      },  
    buttonSearch:{
        backgroundColor: 'rgb(129, 108, 255)',
        width: 100,
        height: 38,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 4
    },
    image2: {
      width: 250,
      height: 250,

    },
    containerAll:{
      flex : 1,
      backgroundColor: '#536162',
    },
    textInput:{
        backgroundColor: '#fff',
        width: 250,
        height: 30,
        borderRadius: 20,
        textAlign: 'center',
        margin: 5,
        marginTop: 15
    },
    header:{
      backgroundColor: 'transparent',
      alignItems: 'center', 
      justifyContent: 'center',
      marginTop: 30,
    },
    iconoHeader:{
      backgroundColor:'transparent'
    },
    button:{
      marginTop: 20
    },
    photoSearched:{
      width: 370, 
      height: 200
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    cardInfo:{
      marginTop: 20,
      borderRadius: 20,
      width: 350,
      height: 'auto',
      backgroundColor: 'rgba(33, 34, 34, 0.836)',
    },
    textTitle:{
      fontSize: 20,
      fontWeight: '300',
      color: 'rgba(255, 255, 255, 0.7)',
      fontFamily: 'Poppins'
    },
    textParagraph:{
      fontSize: 12,
      color: 'rgba(255, 255, 255, 0.7)',
      fontFamily: 'Poppins'
    },
    allFirstHome:{
      marginTop: 25
    },
    photoDay:{
      width: 340, 
      height: 340,
      borderRadius: 10,
      marginTop: 10,
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    });
  