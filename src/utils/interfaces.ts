export interface ISidebarData {
    id: number,
    title: string,
    path: string,
    iconClass: string
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