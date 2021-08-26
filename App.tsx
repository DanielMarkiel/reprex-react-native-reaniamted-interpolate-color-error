/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';

const COUNTER_VALUES = [0, 1, 2, 3, 4, 5, 6];

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [counter, setCounter] = useState<number>(0);

  const counterTransition = useSharedValue(0);

  const counterStyle = useAnimatedStyle(() => ({
    color: interpolateColor(counterTransition.value, COUNTER_VALUES, [
      '#00000000', // #1 can't use 'transparent', 'rgba(0,0,0,0)' or '#00000000'  - it has been working in v2.2.0
      '#E21414',
      '#E21414',
      '#FBBA00',
      '#FBBA00',
      '#1ED25A',
      '#1ED25A',
    ]),
  }));

  useEffect(() => {
    counterTransition.value = withTiming(counter, {
      duration: 500,
    });
  }, [counter]);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Animated.Text style={[styles.sectionTitle, counterStyle]}>
            TEST
          </Animated.Text>
          <Button
            title={`Increment: ${counter}`}
            onPress={() =>
              setCounter(count =>
                count === COUNTER_VALUES.length - 1 ? 0 : count + 1,
              )
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
});

export default App;
