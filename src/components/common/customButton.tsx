import React from 'react';
import { Box, Button, ButtonSpinner, ButtonText } from '@gluestack-ui/themed';

// optional helpers if you have your own responsive helpers
// remove or type them as numbers if you don’t
declare const SW: (val: number) => number;
declare const SF: (val: number) => number;

import type { ComponentProps } from 'react';
import { Colors, Fonts } from '../../constents';

// infer base types from gluestack components
type ButtonProps = ComponentProps<typeof Button>;
type ButtonTextProps = ComponentProps<typeof ButtonText>;

export interface CustomButtonProps extends Omit<ButtonProps, 'children'> {
  label: string;
  showIcon?: boolean;
  onPress?: () => void;
  textColor?: string;
  loading?: boolean;
  textTransform?: ButtonTextProps['textTransform'];
  iconName?: string; // extra: you can pass an icon name
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  showIcon,
  onPress,
  textColor = Colors.white,
  loading = false,
  textTransform = 'none',
  iconName = 'location',
  ...rest
}) => {
  return (
    <Button
      h={52}
      onPress={onPress}
      bg={Colors.transparent}
      borderRadius={15}
      sx={{
        ':hover': {
          bg: Colors.btnHover,
          opacity: 0.2,
        },
        ':active': {
          bg: Colors.btnPrimaryColor,
        },
      }}
      {...rest}
    >

      {loading && <ButtonSpinner mr="$2" />}

      <ButtonText
        ml={showIcon ? 10 : 0}
        fontFamily={Fonts.medium}
        fontSize={18}
        color={textColor}
        textTransform={textTransform}
        sx={{
          ':active': {
            color: Colors.btnHoverText,
          },
          fontWeight: '500',
        }}
      >
        {label}
      </ButtonText>
    </Button>
  );
};

export default CustomButton;
