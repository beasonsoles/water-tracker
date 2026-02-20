import { useState } from 'react'
import { View, TextInput, Text, StyleSheet, Pressable } from 'react-native'
import { colors } from '../constants/colors'
import useAuthStore from '../store/auth'
import { logIn, signUp } from '../utils/auth'
import { useNavigation } from '@react-navigation/native'
import { getErrorMessage } from '../utils/error-message'
import { storeUser } from '../services/users'

export const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [isSignup, setIsSignup] = useState(true)
  const [errors, setErrors] = useState({})
  const [authError, setAuthError] = useState('')
  const { authenticate, setUserName } = useAuthStore()
  const navigation = useNavigation()

  const validate = (key, value) => {
    setAuthError('')

    if (!value) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [key]: `${key.charAt(0).toUpperCase() + key.slice(1)} is required`,
      }))
    } else if (key === 'email' && !value.includes('@')) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [key]: 'Invalid email',
      }))
    } else if (key === 'password' && value.length < 6) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [key]: 'Password must be at least 6 characters',
      }))
    } else {
      setErrors(prevErrors => ({
        ...prevErrors,
        [key]: '',
      }))
    }
  }

  const handleAuth = async () => {
    if (!email || !password || (isSignup && !name)) {
      validate('email', email)
      validate('password', password)
      validate('username', name)
      return
    }

    try {
      if (isSignup) {
        setUserName(name)
        const token = await signUp(email, password, name)
        authenticate(token)
        await storeUser(name, email)
      } else {
        const token = await logIn(email, password)
        authenticate(token)
      }
      navigation.navigate('Home')
    } catch (error) {
      console.log('Auth error', error.message)
      setAuthError(getErrorMessage(error))
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isSignup ? 'Create an account' : 'Login to your account'}
      </Text>
      {authError && (
        <View style={styles.errorContainer}>
          <Text style={styles.authError}>{authError}</Text>
        </View>
      )}

      {isSignup && (
        <>
          <TextInput
            placeholder="Username"
            placeholderTextColor={colors.textLight}
            style={styles.input}
            onChangeText={value => {
              validate('username', value)
              setName(value)
            }}
          />
          {errors.username && (
            <Text style={styles.error}>{errors.username}</Text>
          )}
        </>
      )}

      <TextInput
        placeholder="Email"
        placeholderTextColor={colors.textLight}
        style={styles.input}
        autoCapitalize="none"
        onChangeText={value => {
          validate('email', value)
          setEmail(value)
        }}
      />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}

      <TextInput
        placeholder="Password"
        placeholderTextColor={colors.textLight}
        style={styles.input}
        secureTextEntry
        onChangeText={value => {
          validate('password', value)
          setPassword(value)
        }}
      />
      {errors.password && <Text style={styles.error}>{errors.password}</Text>}

      <Pressable style={styles.button} onPress={handleAuth}>
        <Text style={styles.buttonText}>{isSignup ? 'Sign Up' : 'Login'}</Text>
      </Pressable>

      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>
          {isSignup ? 'Already have an account?' : 'New to Wasser?'}
        </Text>
        <Text
          style={styles.toggle}
          onPress={() => {
            setIsSignup(!isSignup)
            setErrors({})
            setAuthError('')
          }}
        >
          {isSignup ? 'Login' : 'Sign Up'}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 20,
    textAlign: 'center',
    color: colors.text,
  },
  input: {
    backgroundColor: 'white',
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 25,
    height: 50,
    color: colors.text,
    fontWeight: 700,
  },
  button: {
    backgroundColor: colors.mediumBlue,
    borderRadius: 25,
    height: 50,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 700,
    fontSize: 18,
  },
  questionContainer: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
    color: colors.text,
    textAlign: 'center',
  },
  toggle: { color: colors.darkBlue, textAlign: 'center' },
  error: { color: 'red', marginLeft: 10, marginTop: 5 },
  errorContainer: {
    backgroundColor: '#fcb9b6',
    padding: 10,
    borderRadius: 15,
  },
  authError: {
    color: 'red',
    marginHorizontal: 5,
  },
})
