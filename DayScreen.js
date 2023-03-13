import React , { useState, useEffect } from 'react';
import { StyleSheet, ImageBackground,Text, View, Image,ScrollView,SafeAreaView,StatusBar,Dimensions,Alert, Modal,Pressable} from 'react-native';
import { Video } from 'expo-av';
import { Appbar } from 'react-native-paper';
import { Card, Title, Paragraph, Avatar } from 'react-native-paper';
import background_Modal from './images/wallpaper_abstract_purple.jpg';
import { BlurView } from 'expo-blur';
import { useFonts } from 'expo-font';
import {useScrollToTop} from '@react-navigation/native';
import Background from './images/astronaut-wallpaper.jpg';

export default function DayScreen() {
  const ref = React.useRef(null);
  useScrollToTop(ref);
  const [photoData, setPhotoData] = useState(null);
  const My_Key_NASA = "Key";
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const _handleMore = () => console.log('Shown more');
  useEffect(() => {
    fetchPhotoDay();

    async function fetchPhotoDay() {
      const res = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${My_Key_NASA}`
      );
      const data = await res.json();
      setPhotoData(data);
      console.log(data);
    }
  }, []);
  const [loaded] = useFonts({
    Poppins: require('./assets/fonts/Poppins-Medium.ttf'),
  });
  
  if (!loaded) {
    return null;
  }
  if (!photoData) return <View />;

 
    return (
          <View style={styles.container}>
         {/* <ImageBackground source={Background} resizeMode="cover" style={styles.image}> */}
          <Appbar.Header style={styles.header}>
          <Image source={require('./images/logo_nasa.png')} style={styles.iconBar} />
          <Appbar.Action icon="dots-vertical" onPress={() => setModalVisible(true)} style={styles.headerAction}/>
          </Appbar.Header>
          <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scroll} ref={ref}>
          <View style={styles.viewCard}>
          <Card style={styles.cardInfo}>
            {photoData.media_type === "image" ? (
            <Card.Cover source={{ uri: photoData.url}} 
            style={styles.photoDay} />
            ) : (
              <Video
              ref={video}
              source={{ uri: photoData.url}} 
              useNativeControls
              resizeMode="contain"
              isLooping
              onPlaybackStatusUpdate={status => setStatus(() => status)}
            />
            )}
            <Card.Content>
               <Title style={styles.date}>{photoData.date}</Title>
            <Title style={styles.title}>{photoData.title}</Title>
            <Paragraph style={styles.explanation}>{photoData.explanation}</Paragraph>
            </Card.Content>
          </Card>
          <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
          <BlurView  intensity={100} style={[StyleSheet.absoluteFill, styles.nonBlurredContent]}>
          <View style={styles.centeredView} >
          <View style={styles.modalView}>
          {/* <ImageBackground source={background_Modal} resizeMode="cover" style={styles.backgroundModal}> */}
            <Image source={require('./images/NASA_logo.png')} style={styles.iconModal}/>
            <Text style={styles.modalText}>APOD (Astronomy Picture of the Day)</Text>
            <Text style={styles.modalText}>In this section you can see an image or video with the information depending on the day, every day it changes</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide info</Text>
            </Pressable>
            {/* </ImageBackground> */}
          </View>
        </View>
        </BlurView>
          </Modal>

          </View>
          </View>
          </ScrollView>
          </SafeAreaView>
          {/* </ImageBackground> */}
      </View>
    );
  }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#fff',
    backgroundColor: '#536162'
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
  text: {
    color: '#fff',
    fontSize: 15,
    padding: 10,
    textAlign: 'center',
  },
  date:{
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    color: 'rgba(255, 255, 255, 0.7)'
  },
  title:{
      textAlign: 'center',
      fontSize: 30,
      fontWeight: '700',
      fontFamily: 'Poppins',
      color: 'rgba(255, 255, 255, 0.7)'
  },
  explanation:{
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'Poppins',
    color: 'rgba(255, 255, 255, 0.7)'
  },
  header:{
    backgroundColor: 'transparent',
    alignItems: 'center', 
    justifyContent: 'center',
    marginTop: 30
  },
  iconoHeader:{
    backgroundColor:'transparent'
  },
  photoDay:{
    width: 340, 
    height: 340,
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  cardInfo:{
    marginTop: 20,
    borderRadius: 20,
    width: 'auto',
    height: 'auto',
    position: 'relative',
    backgroundColor: 'rgba(33, 34, 34, 0.836)'
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  scroll:{
    paddingBottom: StatusBar.currentHeight,
  },
  viewCard:{
    marginBottom: 100
  },
  headerAction:{
    right: 10,
    position: 'absolute',
    backgroundColor: 'white'
  },
  iconBar:{
    width: 100,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
 },
  modalView: {
    margin: 20,
    backgroundColor: "#6F4A8E",
    borderRadius: 20,
    padding: 10,
    margin: 'auto',
    alignItems: "center",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    marginTop: 10
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '300',
    fontSize: 20,
    fontFamily: 'Poppins'
  },
  iconModal:{
    width: 70,
    height: 70,
    marginTop: -20
  },
  backgroundModal:{
    justifyContent: "center",
    padding: 35,
    borderRadius: 100
  },
  nonBlurredContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});