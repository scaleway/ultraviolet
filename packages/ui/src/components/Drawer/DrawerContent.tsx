import type { ReactNode } from 'react'
import { drawerStyle } from './styles.css'

export const DrawerContent = ({ children }: { children: ReactNode }) => (
  <div className={drawerStyle.content}>{children}</div>
)
