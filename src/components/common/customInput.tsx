import React from 'react';
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
  FormControlError,
  FormControlErrorText,
  Input,
  InputField,
  InputIcon,
  InputSlot,
} from '@gluestack-ui/themed';
import type { ComponentProps } from 'react';
import Colors from '../../constents/colors';
import { Fonts } from '../../constents';

type InputProps = ComponentProps<typeof Input>;
type InputFieldProps = ComponentProps<typeof InputField>;
type InputSlotProps = ComponentProps<typeof InputSlot>;
type FormControlProps = ComponentProps<typeof FormControl>;

export interface CustomInputProps
  extends Omit<InputProps, 'children'> {
  title?: string;
  touched?: FormControlProps['isInvalid']; // boolean
  errorText?: string;
  variant?: InputProps['variant']; // e.g. 'outline' | 'rounded' | ...
  placeholder?: string;
  value?: string;
  type?: InputFieldProps['type']; // e.g. 'text' | 'password'
  onChangeText?: (text: string) => void;
  inputStyle?: Partial<InputFieldProps>;
  onBlur?: () => void;
  icon?: React.ComponentType<any>;
  onPressIcon?: () => void;
  iconColor?: string;
  iconPosition?: 'left' | 'right';
  iconStyle?: Partial<InputSlotProps>;
  helperText?: string;
  placeholderTextColor?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  title,
  touched,
  errorText,
  variant = 'outline',
  placeholder,
  value,
  type = 'text',
  onChangeText,
  inputStyle,
  onBlur,
  icon,
  onPressIcon,
  iconColor,
  iconPosition,
  iconStyle,
  helperText,
  placeholderTextColor,
  ...rest // <- remaining props passed to <Input />
}) => {
  return (
    <FormControl isInvalid={!!touched}>
      {title && (
        <FormControlLabel mb="$1">
          <FormControlLabelText
            color={Colors.black}
            fontSize={16}
            fontFamily={Fonts.regular}
            fontWeight={500}
            fontStyle="normal"
            lineHeight={36}
          >
            {title}
          </FormControlLabelText>
        </FormControlLabel>
      )}

      <Input
        variant={variant}
        onBlur={onBlur}
        height={47}
        borderRadius={43}
        // Gluestack uses `bg`, not `bgColor`
        bg={Colors.inputBgColor}
        alignItems="center"
        justifyContent="center"
        {...rest}
      >
        {iconPosition === 'left' && (
          <InputSlot {...iconStyle} onPress={onPressIcon}>
            <InputIcon as={icon} color={iconColor} />
          </InputSlot>
        )}

        <InputField
          type={type}
          mx={10}
          borderRadius={43}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          {...inputStyle}
          placeholderTextColor={
            placeholderTextColor ?? Colors.inputPlaceholderColor
          }
        />

        {iconPosition === 'right' && (
          <InputSlot {...iconStyle} onPress={onPressIcon}>
            <InputIcon as={icon} size="lg" color={iconColor} />
          </InputSlot>
        )}
      </Input>

      {helperText && (
        <FormControlHelper>
          <FormControlHelperText>{helperText}</FormControlHelperText>
        </FormControlHelper>
      )}

      {!!touched && !!errorText && (
        <FormControlError px="$2">
          <FormControlErrorText>{errorText}</FormControlErrorText>
        </FormControlError>
      )}
    </FormControl>
  );
};

export default CustomInput;
