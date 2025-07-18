import type { ReactNode } from 'react'
import './styles.css'

type ButtonSolution2Props = {
  children: ReactNode
}

export const ButtonSolution2 = ({ children }: ButtonSolution2Props) => (
  <div className="padding-0 full-width" style={{ '--width': '100px' }}>
    {children}
  </div>
)
