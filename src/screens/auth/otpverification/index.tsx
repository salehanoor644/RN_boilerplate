import React, { useState } from 'react';
import { VStack, Box, Text, Heading, KeyboardAvoidingView, ImageBackground, ScrollView } from '@gluestack-ui/themed';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFormik } from 'formik';
import { otpNumberSchema } from '../../../validations';
import { Colors, Fonts } from '../../../constents';
import CustomButton from '../../../components/common/customButton';
import CodeInput from '../../../components/common/codeInput';
import { Keyboard, Platform, StyleSheet, TouchableWithoutFeedback } from 'react-native';

type props = {
  navigation: any
}

const OTPVerification: React.FC<props> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      otp: '',
    },
    initialTouched: {
      otp: false,
    },
    validationSchema: otpNumberSchema,
    onSubmit: values => {
      navigation.navigate('Home')
    },
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <Box flex={1}>
          <Box flex={1} overflow="hidden">
            <ImageBackground
              source={require('../../../assets/images/background.png')}
              style={styles.bg}
              resizeMode="cover"
            >
              <Box py="$10" px="$4">
                <ScrollView
                  keyboardShouldPersistTaps="handled"
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingBottom: 40 }}
                >
                  <Box mt="$64">
                    <Heading
                      fontSize={14}
                      fontFamily={Fonts.bold}
                      color={Colors.btnPrimaryColor}
                      mb="$2"
                      numberOfLines={1}
                      textAlign='center'
                    >
                      We have sent you an OTP on your.
                    </Heading>
                    <CodeInput
                      value={formik.values.otp}
                      setValue={formik.handleChange('otp')}
                      // onChangeText={formik.handleChange('otp')}
                      errorText={formik.errors.otp}
                    // touched={formik.touched?.otp}
                    // onBlur={formik.handleBlur('otp')}
                    />
                  </Box>
                  <Box mt="$10">
                    <CustomButton
                      label="Continue"
                      textTransform="capitalize"
                      bgColor={Colors.btnPrimaryColor}
                      textColor={Colors.white}
                      onPress={formik.handleSubmit}
                      loading={loading}
                      isDisabled={loading}
                      marginBottom="$6"
                    />
                  </Box>
                </ScrollView>
              </Box>
            </ImageBackground>
          </Box>
        </Box>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  bg: { flex: 1, width: '100%', height: '100%' },
});
export default OTPVerification;
