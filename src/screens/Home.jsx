import { Text, View, StyleSheet } from 'react-native'
import { colors } from '../constants/colors'
import notifee, { AndroidImportance } from '@notifee/react-native'
import { useNavigation } from '@react-navigation/native'
import { DailyWater } from '../components/DailyWater'
import { Friends } from '../components/Friends'
import { getAuth } from '@react-native-firebase/auth'
import Icon from 'react-native-vector-icons/FontAwesome'
import useAuthStore from '../store/auth'
import { useEffect } from 'react'
import { getDatabase, onValue, ref } from '@react-native-firebase/database'
import { useGetUsers } from '../hooks/useGetUsers'

export const Home = () => {
  const navigation = useNavigation()
  const auth = getAuth()
  const { userName } = useAuthStore()
  const name = auth.currentUser.displayName || userName
  const { loading, users } = useGetUsers()
  const currentUser = users.find(user => user.name === userName)

  useEffect(() => {
    if (!auth.currentUser) return

    const userDbPath = `users/${currentUser.id}/message`
    const notificationRef = ref(getDatabase(), userDbPath)

    const unsubscribe = onValue(notificationRef, async snapshot => {
      const data = snapshot.val()

      if (data) {
        const channelId = await notifee.createChannel({
          id: 'notification-channel',
          name: 'Water notifications',
          importance: AndroidImportance.HIGH,
        })

        await notifee.displayNotification({
          body: `${data.message}`,
          android: { channelId },
        })
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greetingText}>Hi,</Text>
          <Text style={styles.userNameText}>{name}</Text>
        </View>
        <Icon
          name="user-circle"
          size={30}
          color={colors.text}
          onPress={() => navigation.navigate('Profile')}
        />
      </View>

      <Friends loading={loading} users={users} />
      <DailyWater />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: colors.background,
    gap: 20,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greetingText: {
    color: colors.textLight,
    fontSize: 14,
    fontWeight: '600',
  },
  userNameText: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  button: {
    marginTop: 40,
    backgroundColor: 'white',
    borderRadius: 25,
    paddingVertical: 5,
    paddingHorizontal: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  buttonText: {
    color: colors.text,
    fontSize: 14,
    alignSelf: 'center',
    fontWeight: '600',
  },
})
