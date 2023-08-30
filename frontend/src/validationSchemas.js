import * as yup from 'yup'

// const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const registerSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email('Please enter a valid email').required(),
  password: yup.string().min(6).required(),
  // password: yup.string().min(6).matches(passwordRules, { message: "Please create a stronger password" }).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required(),
})

export const loginSchema = yup.object().shape({
  email: yup.string().email('Please enter a valid email').required(),
  password: yup.string().required(),
})

export const patronSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  street: yup.string().required(),
  houseNr: yup.number().required(),
  addition: yup.string(),
  city: yup.string().required(),
  postcode: yup.string().required(),
  phone: yup.string().required(),
  gender: yup.string().required(),
  photo: yup.string(),
  description: yup.string().required(),
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
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  street: yup.string().required(),
  houseNr: yup.number().required(),
  addition: yup.string(),
  city: yup.string().required(),
  postcode: yup.string().required(),
  phone: yup.string().required(),
})

export const userSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email('Please enter a valid email').required(),
  password: yup.string().min(6),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
})

export const petSchema = yup.object().shape({
  type: yup
    .string()
    .oneOf(['dog', 'cat', 'rabbit'])
    .required('Please pick you pet type'),
  name: yup.string().required(),
  gender: yup.string().required(),
  age: yup.number().required(),
  info: yup.string().max(200),
})
