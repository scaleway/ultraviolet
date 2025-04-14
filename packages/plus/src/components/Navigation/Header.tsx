'use client'

import styled from '@emotion/styled'
import { Stack } from '@ultraviolet/ui'
import { memo } from 'react'
import { useNavigation } from './NavigationProvider'
import type { NavigationProps } from './types'

const HeaderContainer = styled.div`
  background: ${({ theme }) => theme.colors.neutral.background};
`

const LogoContainer = styled(Stack)`
  margin: ${({ theme }) =>
    `${theme.space['3']} ${theme.space['3']} ${theme.space['2']} ${theme.space['3']}`};
  max-width: 220px;
  height: 22px;
  overflow: hidden;
`

type HeaderProps = {
  logo: NavigationProps['logo']
}

export const Header = memo(({ logo }: HeaderProps) => {
  const { animation, expanded } = useNavigation()

  return (
    <HeaderContainer>
      <LogoContainer
        justifyContent={!expanded ? 'center' : undefined}
        alignItems="start"
      >
        {typeof logo === 'function' ? logo(animation ? false : expanded) : logo}
      </LogoContainer>
    </HeaderContainer>
  )
})
