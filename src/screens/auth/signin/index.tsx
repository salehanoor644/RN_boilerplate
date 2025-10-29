import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {
  Box,
  Heading,
  ScrollView,
  KeyboardAvoidingView,
  Pressable,
  Text,
} from '@gluestack-ui/themed';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';

import Colors from '../../../constents/colors';
import { Fonts } from '../../../constents';
import CustomInput from '../../../components/common/customInput';
import CustomButton from '../../../components/common/customButton';
import SelectModal from '../../../components/modals/languageSelection';
import { languages } from '../../../utills/laguages';
import { signInSchema } from '../../../validations';

type Props = { navigation: any };

const SignIn: React.FC<Props> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [selectLanguage, setSelectLanguage] = useState('ar');
  const [currentComponent, setCurrentComponent] = useState('');
  const localLang = useSelector((store: any) => store.auth.currentLanguage);

  useEffect(() => {
    if (localLang) {
      const found = languages.find(l => l.id === localLang);
      setSelectLanguage(found?.id ?? 'ar');
    }
  }, [localLang]);

  const formik = useFormik({
    initialValues: { phoneNumber: '' },
    initialTouched: { phoneNumber: false },
    validationSchema: signInSchema,
    onSubmit: () => {
      navigation.navigate('OTPVerification');
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
                <Pressable
                  style={styles.langSwitcher}
                  onPress={() => setCurrentComponent('languages')}
                >
                  <Box style={styles.switchThumb} />
                  <Text
                    style={{
                      fontFamily: 'Montserrat',
                      color: 'black',
                      marginRight: selectLanguage === 'ar' ? 20 : 8,
                    }}
                  >
                    {languages.find(obj => obj.id === selectLanguage)?.id.toUpperCase()}
                  </Text>
                </Pressable>

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
                    >
                      Mobile Number
                    </Heading>

                    <CustomInput
                      placeholder="Enter Mobile Number"
                      variant="outline"
                      rounded={10}
                      borderColor={Colors.btnPrimaryColor}
                      placeholderTextColor={Colors.inputPlaceholderColor2}
                      onChangeText={formik.handleChange('phoneNumber')}
                      onBlur={formik.handleBlur('phoneNumber') as any}
                      value={formik.values.phoneNumber}
                      errorText={formik.errors.phoneNumber}
                      touched={formik.touched?.phoneNumber}
                    />

                  </Box>
                  <Box mt="$10">
                    <CustomButton
                      label={loading ? 'Please wait...' : 'Continue'}
                      textTransform="capitalize"
                      bgColor={Colors.btnPrimaryColor}
                      textColor={Colors.white}
                      onPress={formik.handleSubmit as any}
                      loading={loading}
                      isDisabled={loading}
                    />
                  </Box>
                </ScrollView>
              </Box>
            </ImageBackground>
          </Box>
        </Box>

        {currentComponent === 'languages' && (
          <SelectModal
            isVisible={true}
            listData={languages}
            title="Select Language"
            dataType="languages"
            selected={selectLanguage}
            //@ts-ignore
            setSelected={setSelectLanguage}
            setModal={setCurrentComponent}
          />
        )}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  bg: { flex: 1, width: '100%', height: '100%' },
  langSwitcher: {
    width: 70,
    height: 40,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    elevation: 3,
    paddingHorizontal: 8,
  },
  switchThumb: {
    width: 30,
    height: 30,
    borderRadius: 30,
    elevation: 4,
    backgroundColor: '#fff',
  },
});

export default SignIn;
