import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { colors } from '../constants/colors'
import { useState } from 'react'
import useAuthStore from '../store/auth'
import Icon from 'react-native-vector-icons/FontAwesome'
import { getAuth } from '@react-native-firebase/auth'
import { logOut } from '../utils/auth'

export const Profile = () => {
  const auth = getAuth()
  const user = auth.currentUser
  const [error, setError] = useState('')
  const [name, setName] = useState(user?.displayName)
  const [authError, setAuthError] = useState('')
  const { logout } = useAuthStore()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {authError && (
        <View style={styles.errorContainer}>
          <Text style={styles.authError}>{authError}</Text>
        </View>
      )}

      <TextInput
        placeholder="Username"
        value={name}
        placeholderTextColor={colors.textLight}
        style={styles.input}
        onChangeText={value => {
          setAuthError('')
          if (!value) setError('Username is required')
          setName(value)
        }}
      />
      {error && <Text style={styles.error}>{error}</Text>}

      <TextInput
        value={user?.email}
        style={[styles.input, styles.inputDisabled]}
        readOnly
      />
      <TextInput
        value="123456"
        style={[styles.input, styles.inputDisabled]}
        secureTextEntry
        readOnly
      />

      <Pressable style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonTextLight}>Save changes</Text>
      </Pressable>

      <Pressable
        style={styles.buttonOutline}
        onPress={async () => {
          try {
            logout()
            await logOut()
          } catch (e) {
            setAuthError('Failed to log out.')
          }
        }}
      >
        <Text style={styles.buttonTextDark}>Log out</Text>
        <Icon name="sign-out" size={25} color={colors.text} />
      </Pressable>
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
  inputDisabled: {
    backgroundColor: '#f9f7f7',
    color: '#a1a1a1',
  },
  button: {
    backgroundColor: colors.mediumBlue,
    borderRadius: 25,
    height: 50,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: colors.mediumBlue,
    borderRadius: 25,
    height: 50,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  buttonTextLight: {
    color: 'white',
    fontWeight: 700,
    fontSize: 18,
  },
  buttonTextDark: {
    color: colors.text,
    fontWeight: 700,
    fontSize: 18,
  },
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
