import {View, Dimensions} from 'react-native';
import React from 'react';
import * as Progress from 'react-native-progress';
import {theme} from './Theme';

export default function Loading() {
  const {width, height} = Dimensions.get('screen'); // Corrected typo here
  return (
    <View
      style={{
        width,
        height,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
      }}>
      <Progress.CircleSnail thickness={12} size={50} color={theme.background} />
    </View>
  );
}
