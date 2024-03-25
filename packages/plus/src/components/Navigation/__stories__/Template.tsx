import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import type { StoryFn } from '@storybook/react'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { useReducer } from 'react'
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
  const [expanded, setExpanded] = useReducer(s => !s, true)

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
      onClickExpand={setExpanded}
      initialExpanded={expanded}
      pinnedFeature
    >
      {children}
    </Navigation>
  )
}
