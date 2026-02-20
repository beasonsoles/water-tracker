import { Image, Pressable, Text, View, StyleSheet } from 'react-native'
import { colors } from '../constants/colors'

export const DailyWater = () => {
  const trackWater = async () => {
    try {
      /*const newLogRef = database().ref(`/water_logs/${MY_ID}`).push()

      await newLogRef.set({
        userName: MY_NAME,
        amount: 250,
        // RTDB uses a slightly different timestamp helper
        timestamp: database.ServerValue.TIMESTAMP,
      })*/
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <View style={styles.cardWrapper}>
      <View style={styles.cardContent}>
        <View style={styles.statsContainer}>
          <Text style={styles.cardTitleText}>Today</Text>
          <Text style={styles.cardSubtitleText}>100 ml of water</Text>
          <Pressable style={styles.trackButton} onPress={trackWater}>
            <Text style={styles.trackButtonText}>Track</Text>
          </Pressable>
        </View>

        <Image
          source={require('../assets/images/drops.png')}
          style={styles.dropsImage}
        />
      </View>
      <Image
        source={require('../assets/images/wave-1.png')}
        style={styles.waveLayer1}
      />
      <Image
        source={require('../assets/images/wave-2.png')}
        style={styles.waveLayer2}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  cardWrapper: {
    flexDirection: 'column',
    height: 170,
    position: 'relative',
    borderWidth: 0,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10,
    paddingLeft: 20,
    paddingVertical: 10,
  },
  statsContainer: {
    flexDirection: 'column',
    zIndex: 9,
    height: '100%',
  },
  cardTitleText: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '600',
  },
  cardSubtitleText: {
    color: colors.textLight,
    fontSize: 16,
    fontWeight: '600',
  },
  trackButton: {
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
  trackButtonText: {
    color: colors.text,
    fontSize: 14,
    alignSelf: 'center',
    fontWeight: '600',
  },
  dropsImage: {
    width: 120,
    height: 120,
    zIndex: 3,
  },
  waveLayer1: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 1,
  },
  waveLayer2: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 2,
  },
})
