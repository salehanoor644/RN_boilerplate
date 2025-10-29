import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { Dimensions } from 'react-native';

export const SCREEN_WIDTH: number = Dimensions.get('window').width;
export const SCREEN_HEIGHT: number = Dimensions.get('window').height;

export const SW = (dimension: number): number => {
  return wp((dimension / 375) * 100);
};

export const SH = (dimension: number): number => {
  return hp((dimension / 812) * 100);
};

export const SF = (dimension: number): number => {
  return hp((dimension / 812) * 100);
};

export const heightPercent = (percent: number | string): number => {
  return hp(percent);
};

export const widthPercent = (percent: number | string): number => {
  return wp(percent);
};

export const fontPercent = (percent: number | string): number => {
  return hp(percent);
};
