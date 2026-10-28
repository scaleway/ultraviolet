'use client'

import type { Dispatch, ReactNode, RefObject, SetStateAction } from 'react'
import { Popup } from '../../../Overlay/Popup/v2'
import { dateInputStyle } from '../styles.css'

type PopupProps = {
  children: ReactNode
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
  content: ReactNode
  panelRef: RefObject<HTMLDivElement | null>
}

export const CalendarPopup = ({ children, visible, setVisible, content, panelRef }: PopupProps) => (
  <Popup.Root visible={visible} onOpenChange={setVisible}>
    <Popup.Trigger>{children}</Popup.Trigger>
    <Popup.Panel ref={panelRef} className={dateInputStyle.popup} placement="bottom-start" initialFocus={-1}>
      {content}
    </Popup.Panel>
  </Popup.Root>
)
