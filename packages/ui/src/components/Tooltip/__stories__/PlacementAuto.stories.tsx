import { useEffect, useRef } from 'react'

import { Tooltip } from '..'
import { Button } from '../../Button'

import type { Decorator } from '@storybook/react-vite'
import type { ComponentProps } from 'react'

export const PlacementAuto = (props: ComponentProps<typeof Tooltip>) => {
  const btnRef = useRef<HTMLElement>(null)

  useEffect(() => {
    btnRef.current?.scrollIntoView({ block: 'center', inline: 'center' })
  }, [])

  return (
    <Tooltip placement="auto" {...props} text="Hello there">
      <Button ref={btnRef}>Placement auto</Button>
    </Tooltip>
  )
}

PlacementAuto.decorators = [
  Story => (
    <div
      style={{
        height: '250px',
        overflow: 'auto',
        position: 'relative',
        border: '2px solid red',
        margin: '1rem',
      }}
    >
      <div
        style={{
          display: 'grid',
          placeItems: 'center',
          height: '300%',
          width: '300%',
        }}
      >
        <Story />
      </div>
    </div>
  ),
] as Decorator[]
