import { UserCredential } from "firebase/auth";

export interface ISidebarData {
    id: number,
    title: string,
    path: string,
    iconClass: string
}
export interface IUser {
    email: string,
    password: string
}

export interface IItems {
    id: number
    title: string
    body: string
    date: string
}

export interface IItemsContext {
    items: IItems[]
    handleDelete: (id: number) => void
    setItems: React.Dispatch<React.SetStateAction<IItems[]>>; 
}

export interface IAuthContext {
    signUp: ({}: IUser) => Promise<UserCredential> 
    authenticate: ({}: IUser) => Promise<UserCredential> 
    logOut: () => Promise<void>
    user: any
}