import {createContext} from 'react'
import  {User} from 'models'

const initialUser: User = {
    id: '',
    name: '',
}

export const UserContext = createContext(initialUser)
