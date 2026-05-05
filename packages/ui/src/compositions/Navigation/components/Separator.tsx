'use client'

import { useId } from 'react'

import { Separator as UVSeparator } from '../../../components/Separator'
import { navigationStyle } from '../styles.css'

export const Separator = () => {
  const id = useId()
  return <UVSeparator className={navigationStyle.separator} data-flip-id={id} />
}
