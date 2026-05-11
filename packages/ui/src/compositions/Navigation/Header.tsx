'use client'

import { memo } from 'react'
import { Stack } from '../../components/Stack'
import { useNavigation } from './NavigationProvider'
import type { NavigationProps } from './types'
import { navigationStyle } from './styles.css'

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
