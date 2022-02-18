import { UserCredential } from "firebase/auth";
import { type } from "os";

export interface ISidebarData {
    id: number,
    title: string,
    path: string,
    icon: any
}

export interface IUser {
    name: string,
    email: string,
    password: string
}

export interface IItemsState {
    title: string
    body: string
    date: string
  }

export interface IItems {
    id: string
    title: string
    body: string
    date: string
}



export interface IItemsContext {
    items: IItems[]
    itemsLoading: boolean,
    deleteItem: (id: string) => void
    addItem: ({}: IItems) => void
    editItem: (id: string, {}: IItems) => void
    getItems: () => void
    setItems: React.Dispatch<React.SetStateAction<IItems[]>>; 
    searchFilter: (q: string) => void
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

export type InputVariants = "standard" | "filled" | "outlined" | undefined;
export type ButtonVariants = "text" | "outlined" | "contained" | undefined

export interface TextFieldProps {
    variant: InputVariants;
    sx?: {};
    id: string;
    otherProps: {
      label: string;
      required?: boolean;
      fullWidth?: boolean;
      type?: string;
      error?: boolean;
      autoFocus?: boolean;
    };
}