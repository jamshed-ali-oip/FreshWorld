import React, { useState, useEffect } from 'react';
import { Animated, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { fetchAllAction } from './src/store/apps/example';

const App = () => {
  const [animation] = useState(new Animated.Value(0));
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('====================================');
    console.log("JJJJJJJJJJJJJJJJJ");
    console.log('====================================');
    dispatch(fetchAllAction({ query: {} }))
  }, [])

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  };
  const Again = () => {
    Animated.timing(animation, {
      toValue: 2,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  };
  const SEE = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  };



  const leftInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [500, 0], // 0 : beginning of the screen and 500 : end of the screen (right to left) 
  });

  const animatedStyle = {
    transform: [{ translateX: leftInterpolate }], // Move the car from right to left using interpolate function.  
  };

  return (
    <View style={styles.container}>

      <Animated.Image // Apply animatedStyle on Image of car for animation  
        source={require('./src/Assets/Images/car.png')} // Image of car  
        style={[styles.carImage, animatedStyle]} // Apply animatedStyle on Image of car for animation  
      />

      <View style={styles.buttonContainer}>


        <TouchableOpacity onPress={startAnimation}>

          <Text style={styles.buttonText}>check </Text>

        </TouchableOpacity>

        <TouchableOpacity onPress={() => { SEE() }}>

          <Text style={styles.buttonText}>Go back</Text>

        </TouchableOpacity>

        <TouchableOpacity onPress={() => { Again() }}>

          <Text style={styles.buttonText}>GO Outside</Text>

        </TouchableOpacity>

      </View>

    </View>);;
};
export default App
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carImage: {
    width: 300,
    height: 100,
  },
  buttonContainer: {
    marginTop: 20,
  },
  buttonText: {
    fontSize: 20,
    color: '#000',
  },
});