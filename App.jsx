import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar, useColorScheme } from 'react-native'
import { Home } from './src/screens/Home'
import { Auth } from './src/screens/Auth'
import { Profile } from './src/screens/Profile'
import { useEffect } from 'react'
import notifee from '@notifee/react-native'
import useAuthStore from './src/store/auth'
import {
  getAuth,
  getIdToken,
  onAuthStateChanged,
  reload,
} from '@react-native-firebase/auth'
import BootSplash from 'react-native-bootsplash'

const Stack = createNativeStackNavigator()

function App() {
  const isDarkMode = useColorScheme() === 'dark'
  const { isAuthenticated, authenticate, setUserName } = useAuthStore()

  useEffect(() => {
    const auth = getAuth()

    const subscriber = onAuthStateChanged(auth, async user => {
      if (user) {
        try {
          const token = await getIdToken(user)
          authenticate(token)
          setUserName(user.displayName)
        } catch (error) {
          console.error('Failed to get ID token:', error)
          authenticate(null)
        }
      } else {
        authenticate(null)
      }
    })

    return subscriber
  }, [authenticate])

  useEffect(() => {
    notifee.requestPermission()
  }, [])

  return (
    <SafeAreaProvider style={{ backgroundColor: 'white' }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer onReady={() => BootSplash.hide({ fade: true })}>
        <Stack.Navigator key={isAuthenticated ? 'user' : 'guest'}>
          {isAuthenticated && (
            <>
              <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Profile"
                component={Profile}
                options={{ headerShown: false }}
              />
            </>
          )}
          {!isAuthenticated && (
            <Stack.Screen
              name="Auth"
              component={Auth}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default App
