import React from 'react'

const ListContext = React.createContext()

export const useListContext = () => React.useContext(ListContext)

export default ListContext
