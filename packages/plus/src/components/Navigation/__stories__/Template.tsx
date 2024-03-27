import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import type { StoryFn } from '@storybook/react'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { useCallback, useState } from 'react'
import { Navigation } from '..'
import logoSmall from './assets/logo-small.svg'
import logo from './assets/logo.svg'

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  
  50% {
    opacity: 0;
  }
  
  100% {
    opacity: 1;
  }

`

const fadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }

`

const Image = styled.img`
  animation: ${fadeIn} 530ms ease-in-out;

  &[data-expanded='false'] {
    animation: ${fadeOut} 300ms linear forwards;
  }
`

export const Template: StoryFn<ComponentProps<typeof Navigation>> = ({
  children,
}) => {
  const navigationWidth = Number(localStorage.getItem('width')) || undefined
  const navigationExpanded = localStorage.getItem('expanded') === 'true'

  const [expanded, setExpanded] = useState(navigationExpanded)
  const saveWidthInLocalStorage = useCallback((width: number) => {
    console.log(`width of ${width} saved in local storage`)
    localStorage.setItem('width', width.toString())
  }, [])

  const saveExpandedInLocalStorage = useCallback((localExpanded: boolean) => {
    setExpanded(localExpanded)
    console.log(
      `expanded state with value ${localExpanded} saved in local storage`,
    )
    localStorage.setItem('expanded', localExpanded.toString())
  }, [])

  return (
    <Navigation
      logo={
        <a
          href="https://scaleway.com"
          target="_blank"
          rel="noreferrer"
          aria-label="logo"
        >
          <Stack gap={1} direction="row">
            <img src={logoSmall} alt="" height="22px" />
            <Image src={logo} alt="" height="22px" data-expanded={expanded} />
          </Stack>
        </a>
      }
      onClickExpand={saveExpandedInLocalStorage}
      initialExpanded={navigationExpanded}
      onWidthResize={saveWidthInLocalStorage}
      width={navigationWidth}
    >
      {children}
    </Navigation>
  )
}
