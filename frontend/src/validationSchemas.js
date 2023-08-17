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
  // password: yup.string().min(6).matches(passwordRules, { message: "Please create a stronger password" }).required(),
})

export const patronSchema = yup.object().shape({
  email: yup.string().email('Please enter a valid email').required(),
  password: yup.string().required(),
})
