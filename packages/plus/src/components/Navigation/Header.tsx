'use client'

import { Stack } from '@ultraviolet/ui'
import { memo } from 'react'
import { useNavigation } from './NavigationProvider'
import { navigationHeader, navigationLogoContainer } from './styles.css'
import type { NavigationProps } from './types'

type HeaderProps = {
  logo: NavigationProps['logo']
}

export const Header = memo(({ logo }: HeaderProps) => {
  const { animation, expanded } = useNavigation()

  return (
    <div className={navigationHeader}>
      <Stack
        alignItems="flex-start"
        className={navigationLogoContainer}
        justifyContent={!expanded ? 'center' : undefined}
      >
        {typeof logo === 'function' ? logo(animation ? false : expanded) : logo}
      </Stack>
    </div>
  )
})
