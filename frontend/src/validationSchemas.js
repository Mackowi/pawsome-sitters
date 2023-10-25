import * as yup from 'yup'

export const registerSchema = yup.object().shape({
  name: yup.string().required('Please enter a name'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Please enter an email'),
  password: yup.string().min(6).required('Please enter a password'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm password'),
})

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Please enter an email'),
  password: yup.string().required('Please enter a password'),
})

export const patronSchema = yup.object().shape({
  firstName: yup.string().required('Please enter first name'),
  lastName: yup.string().required('Please enter last name'),
  street: yup.string().required('Please enter street'),
  houseNr: yup.number().required('Please enter house number'),
  addition: yup.string(),
  city: yup.string().required('Please enter city'),
  postcode: yup.string().required('Please enter postcode'),
  phone: yup.string().required('Please enter phone number'),
  gender: yup.string().required('Please select a gender'),
  photo: yup.string(),
  description: yup.string().required('Please enter a description'),
  pets: yup
    .array()
    .of(yup.string().oneOf(['dog', 'cat', 'rabbit']))
    .required('Please pick accepted pets'),
  service: yup
    .array()
    .of(yup.string().oneOf(['walking', 'sitting', 'daycare']))
    .required('Please pick provided services'),
})

export const petOwnerSchema = yup.object().shape({
  firstName: yup.string().required('Please enter first name'),
  lastName: yup.string().required('Please enter last name'),
  street: yup.string().required('Please enter street'),
  houseNr: yup.number().required('Please enter house number'),
  addition: yup.string(),
  city: yup.string().required('Please enter city'),
  postcode: yup.string().required('Please enter postcode'),
  phone: yup.string().required('Please enter phone number'),
})

export const userSchema = yup.object().shape({
  name: yup.string().required('Please enter a name'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Please enter an email'),
  password: yup.string().min(6),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
})

export const petSchema = yup.object().shape({
  type: yup.string().required('Please select a pet type'),
  name: yup.string().required('Please enter a pet name'),
  gender: yup.string().required('Please select a pet gender'),
  age: yup.number().required(`Please enter the pet's age`),
  info: yup.string().max(200),
})

export const serviceRequestSchema = yup.object().shape({
  pets: yup.array().of(yup.string()).min(1, 'Please pick your pets'),
  service: yup
    .string()
    .oneOf(['walking', 'sitting', 'daycare'])
    .required('Please pick a service'),
})
