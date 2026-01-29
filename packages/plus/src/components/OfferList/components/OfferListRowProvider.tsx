import { createContext, useContext } from 'react'

export const OfferListRowContext = createContext({
  selected: false,
  banner: false,
})

export const useOfferListRowContext = () => useContext(OfferListRowContext)
