import {
  Image,
  Pressable,
  Text,
  StyleSheet,
  View,
  ScrollView,
  ToastAndroid,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/FontAwesome'
import { colors } from '../constants/colors'
import { useGetUsers } from '../hooks/useGetUsers'
import { getImage } from '../utils/friend-image'
import useAuthStore from '../store/auth'
import { notifyUser } from '../services/users'

export const Friends = ({ loading, users}) => {
  const { userName } = useAuthStore()
  const friends = users.filter(friend => friend.name !== userName)

  const handleNotify = async friend => {
    const success = await notifyUser(friend, 'Bebe agüita', userName)

    if (success) {
      ToastAndroid.show('Notification sent!', ToastAndroid.SHORT)
    }
  }

  if (loading) return null

  return (
    <ScrollView
      horizontal
      style={{ flexGrow: 0 }}
      showsHorizontalScrollIndicator={false}
    >
      <View style={styles.container}>
        {friends.map(friend => (
          <LinearGradient
            key={friend.id}
            colors={[colors.lightBlue, colors.mediumBlue]}
            style={styles.friendContainer}
          >
            <Text style={styles.name}>{friend.name}</Text>
            <Image source={getImage(friend.name)} style={styles.image} />
            <Pressable
              style={styles.button}
              onPress={() => handleNotify(friend)}
            >
              <Text style={styles.buttonText}>Notify</Text>
            </Pressable>
          </LinearGradient>
        ))}
        <LinearGradient
          colors={[colors.lightBlue, colors.mediumBlue]}
          style={[
            styles.friendContainer,
            {
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 30,
            },
          ]}
        >
          <Pressable
            style={[
              styles.button,
              { display: 'flex', flexDirection: 'row', gap: 10 },
            ]}
          >
            <Text style={styles.buttonText}>Add</Text>
            <Icon name="plus-circle" size={24} color={colors.text} />
          </Pressable>
        </LinearGradient>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  friendContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 35,
    gap: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  button: {
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
