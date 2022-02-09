import { UserCredential } from "firebase/auth";
import { type } from "os";

export interface ISidebarData {
    id: number,
    title: string,
    path: string,
    iconClass: string
}
export interface IUser {
    name: string,
    email: string,
    password: string
}

export interface IItems {
    id?: string
    title: string
    body: string
    date: string
}

export interface IItemsContext {
    items: IItems[]
    deleteItem: (id: string) => void
    addItem: ({}: IItems) => void
    editItem: (id: string, {}: IItems) => void
    getItems: () => void
    setItems: React.Dispatch<React.SetStateAction<IItems[]>>; 
}

export type IAuthErrors = {login: any, register: any, logout: any}

export interface IAuthContext {
    signUp: ({}: IUser) => void 
    authenticate: ({}: IUser) => void
    logOut: () => void
    user: any,
    loading: boolean,
    errors: IAuthErrors,
}