'use client'

import { memo } from 'react'

import { Stack } from '../../components/Stack'

import { useNavigation } from './NavigationProvider'
import { navigationStyle } from './styles.css'

import type { NavigationProps } from './types'

type HeaderProps = {
  logo: NavigationProps['logo']
}

export const Header = memo(({ logo }: HeaderProps) => {
  const { animation, expanded } = useNavigation()

  return (
    <div className={navigationStyle.header}>
      <Stack
        alignItems="flex-start"
        className={navigationStyle.logoContainer}
        justifyContent={expanded ? undefined : 'center'}
      >
        {typeof logo === 'function' ? logo(animation ? false : expanded) : logo}
      </Stack>
    </div>
  )
})
