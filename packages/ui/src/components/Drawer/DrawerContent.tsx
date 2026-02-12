import type { ReactNode } from 'react'
import { drawerContent } from './styles.css'

export const DrawerContent = ({ children }: { children: ReactNode }) => (
  <div className={drawerContent}>{children}</div>
)
