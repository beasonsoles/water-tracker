import {
  createUserWithEmailAndPassword,
  getAuth,
  getIdToken,
  reload,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from '@react-native-firebase/auth'

export const logIn = async (email, password) => {
  const auth = getAuth()
  const userCredential = await signInWithEmailAndPassword(auth, email, password)
  return await getIdToken(userCredential.user)
}

export const signUp = async (email, password, name) => {
  const auth = getAuth()
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  )
  await updateProfile(userCredential.user, {
    displayName: name,
  })

  await reload(userCredential.user)

  return await getIdToken(userCredential.user)
}

export const logOut = async () => {
  const auth = getAuth()
  await signOut(auth.currentUser)
}
