import React from 'react'

const ListContext = React.createContext(undefined)

export const useListContext = () => React.useContext(ListContext)

export default ListContext
