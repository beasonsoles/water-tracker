export const storeUser = async (name, email) => {
  try {
    const response = await fetch(
      'https://wasser-9c5f3-default-rtdb.europe-west1.firebasedatabase.app/users.json',
      {
        method: 'POST',
        body: JSON.stringify({ name, email }),
      },
    )

    if (!response.ok) {
      console.log('Could not save user')
    }

    const data = await response.json()
    return data.name // unique ID created by Firebase
  } catch (error) {
    console.log('Could not save user', error.message)
  }
}

export const getUsers = async () => {
  try {
    const response = await fetch(
      'https://wasser-9c5f3-default-rtdb.europe-west1.firebasedatabase.app/users.json',
    )
    const data = await response.json()

    if (!data) return []

    const users = Object.keys(data).map(key => ({
      id: key,
      ...data[key],
    }))

    return users
  } catch (error) {
    console.log('Could not get users', error.message)
  }
}

export const notifyUser = async (user, message) => {
  console.log(user, message)
  try {
    const response = await fetch(
      `https://wasser-9c5f3-default-rtdb.europe-west1.firebasedatabase.app/users/${user.id}/message.json`,
      {
        method: 'PUT',
        body: JSON.stringify({
          from: user.name,
          message,
          time: Date.now(),
        }),
      },
    )
    return response.ok
  } catch (error) {
    console.error('Failed to send notification:', error)
  }
}
