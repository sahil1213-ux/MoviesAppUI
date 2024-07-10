import {Text} from 'react-native';
import React from 'react';
import {styles} from './Theme';

export const NormalText = ({text, isOrange = false}) => (
  <Text
    className="text-sm mx-[3] tracking-tight my-2 px-2 "
    style={[
      isOrange
        ? styles.text
        : {
            color: 'white',
            opacity: 0.7,
          },
    ]}>
    {text}
  </Text>
);
export const HeadingText = ({text, isOrange = false}) => (
  <Text
    className="text-lg mx-[3] tracking-tight my-2 px-2 "
    style={[
      isOrange
        ? styles.text
        : {
            color: 'white',
            opacity: 0.9,
          },
    ]}>
    {text}
  </Text>
);

export const SmallGreyTxt = ({text}) => (
  <Text className="text-neutral-400 text-sm">{text}</Text>
);
