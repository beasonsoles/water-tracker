import { useEffect, useState } from 'react'
import { getUsers } from '../services/users'

export const useGetUsers = () => {
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers()
        setUsers(data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log('Could not get users', error.message)
      }
    }

    fetchUsers()
  }, [])

  return { loading, users }
}
