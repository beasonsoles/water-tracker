import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

const initialState = {
  token: null,
  userName: null,
  isAuthenticated: false,
}

const useAuthStore = create()(
  persist(
    set => ({
      ...initialState,

      authenticate: token =>
        set({
          token,
          isAuthenticated: !!token,
        }),
      
      setUserName: userName => set({ userName }),
      logout: () => set(initialState),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({
        token: state.token,
        userName: state.userName,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)

export default useAuthStore
