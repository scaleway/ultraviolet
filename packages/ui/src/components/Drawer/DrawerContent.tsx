import { drawerStyle } from './styles.css'

import type { ReactNode } from 'react'

export const DrawerContent = ({ children }: { children: ReactNode }) => (
  <div className={drawerStyle.content}>{children}</div>
)
