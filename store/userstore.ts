import {create} from 'zustand';
import {persist} from 'zustand/middleware';

type UserProp = {
    id: string
    name: string
    email: string
    photo: string
    isAuthenticated: boolean
    accessToken: string
    refreshToken: string

    updateAccessToken: (newAccessToken: string) => void
    setUser: (id:string, name:string, email:string, photo:string, accessToken:string, refreshToken:string) => void
    setNullUser: () => void
}

export const useUserStore = create<UserProp>()(
    persist(
        (set) => ({
        id: '',
        name: '',
        email: '',
        photo: '',
        isAuthenticated: false,
        accessToken: '',
        refreshToken: '',
        
        updateAccessToken: (newAccessToken) =>
            set(
                {accessToken: newAccessToken}
            ),
        setUser: (id, name, email, photo, accessToken, refreshToken) =>
            set({id, name, email, photo, isAuthenticated: true, accessToken, refreshToken}),
        setNullUser: () => 
            set({id: '', name: '', email: '', photo: '', isAuthenticated: false, accessToken: '', refreshToken: ''}),
        }),
        {
        name: 'user-storage',
        }
    )
)