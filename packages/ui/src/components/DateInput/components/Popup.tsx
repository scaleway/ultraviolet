'use client'

import styled from '@emotion/styled'
import type { Dispatch, ReactNode, RefObject, SetStateAction } from 'react'
import { useEffect, useRef } from 'react'
import { Popup } from '../../Popup'
import { POPUP_WIDTH } from '../constants'
import { styleCalendarContainer } from '../helpers'

type PopupProps = {
  children: ReactNode
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
  refInput: RefObject<HTMLInputElement | null>
  content: ReactNode
}

const StyledPopup = styled(Popup)`
  ${({ theme }) => styleCalendarContainer(theme)}
  box-shadow: ${({ theme }) => `${theme.shadows.raised[0]}, ${theme.shadows.raised[1]}`};
`

const handleClickOutside = (
  event: MouseEvent,
  ref: RefObject<HTMLDivElement | null>,
  setVisible: Dispatch<SetStateAction<boolean>>,
  refInput: RefObject<HTMLInputElement | null>,
) => {
  if (
    ref.current &&
    !ref.current.contains(event.target as Node) &&
    !refInput.current?.contains(event.target as Node)
  ) {
    setVisible(false)
  }
}

export const CalendarPopup = ({
  children,
  visible,
  setVisible,
  refInput,
  content,
}: PopupProps) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.addEventListener('mousedown', event =>
      handleClickOutside(event, ref, setVisible, refInput),
    )

    return () =>
      document.removeEventListener('mousedown', event =>
        handleClickOutside(event, ref, setVisible, refInput),
      )
  }, [ref, setVisible, refInput])

  return (
    <StyledPopup
      align="start"
      debounceDelay={0}
      disableAnimation
      hasArrow={false}
      maxWidth={POPUP_WIDTH}
      placement="bottom"
      ref={ref}
      role="dialog"
      tabIndex={0}
      text={content}
      visible={visible}
    >
      {children}
    </StyledPopup>
  )
}
