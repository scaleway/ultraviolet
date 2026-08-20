import type { Decorator } from '@storybook/react-vite'
import { useEffect, useRef } from 'react'
import type { ComponentProps, ReactNode } from 'react'
import { Tooltip } from '..'
import { Button } from '../../Button'
import { Stack } from '../../Stack'

const ScrollDemo = ({ children }: { children: ReactNode }) => (
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
      {children}
    </div>
  </div>
)

export const Portal = (props: ComponentProps<typeof Tooltip>) => {
  const firsBtnRef = useRef<HTMLElement>(null)
  const secondBtnRef = useRef<HTMLElement>(null)

  useEffect(() => {
    firsBtnRef.current?.scrollIntoView({ block: 'center', inline: 'center' })
    secondBtnRef.current?.scrollIntoView({ block: 'center', inline: 'center' })
  }, [])

  return (
    <>
      <ScrollDemo>
        <Tooltip
          placement="auto"
          {...props}
          text="This can overflow from the scroll container and has a little lag on scroll"
          portalTarget={document.body}
          visible
        >
          <Button ref={secondBtnRef}>Portal to document.body</Button>
        </Tooltip>
      </ScrollDemo>
      <ScrollDemo>
        <Tooltip
          placement="auto"
          {...props}
          text="This will stay in the scroll container and has no lag on scroll"
          visible
        >
          <Button ref={firsBtnRef}>No portal</Button>
        </Tooltip>
      </ScrollDemo>
    </>
  )
}

Portal.decorators = [
  Story => (
    <Stack gap="3">
      <Story />
    </Stack>
  ),
] as Decorator[]
