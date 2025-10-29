import * as yup from 'yup';

export let signUpSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email'),
  phoneNumber: yup.number().required('Phone number is required').integer(),
  address: yup.string().required('Address is required'),
  terms: yup.string().required('Approval is required'),
});

export let passwordSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .matches(/[a-z]+/, "One lowercase character required")
    .matches(/[A-Z]+/, "One uppercase character required")
    .matches(/[@$!%*#?&]+/, "One special character required")
    .matches(/\d+/, "One number required")
    .min(8, "Password should be of minimum 8 characters length"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Both password need to be the same')
    .required('Confirm password is required'),
});

export let signInSchema = yup.object().shape({
  phoneNumber: yup.number().required('Phone number is required').integer(),
});

export let phoneNumberSchema = yup.object().shape({
  phoneNumber: yup.number().required('Phone number is required').integer(),
});

export let otpNumberSchema = yup.object().shape({
  otp: yup
    .number()
    .required('OTP is required')
    .test(
      'otp',
      'Must be exactly 4 digits',
      val => val.toString().length === 4,
    ),
});

export let editProfileSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email'),
  phoneNumber: yup.number().required('Phone number is required').integer(),
});

export let emailSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email'),
});