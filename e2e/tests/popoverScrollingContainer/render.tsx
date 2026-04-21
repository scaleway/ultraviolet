import { Button, Popover } from '@ultraviolet/ui'
import { useEffect, useRef, useState } from 'react'

const getQueryParam = (param: string, defaultValue: string): string | null => {
  if (typeof window === 'undefined') return defaultValue
  const params = new URLSearchParams(window.location.search)
  return params.get(param) ?? defaultValue
}

const Render = () => {
  const [opened, setOpened] = useState(false)
  const btnRef = useRef<HTMLElement>(null)

  const placement = getQueryParam('placement', 'auto')
  const scrollX = getQueryParam('scrollX', 'center') as ScrollLogicalPosition
  const scrollY = getQueryParam('scrollY', 'center') as ScrollLogicalPosition

  useEffect(() => {
    btnRef.current?.scrollIntoView({ block: scrollY, inline: scrollX })
  }, [scrollY, scrollX])

  return (
    <div
      data-testid="scroll-container"
      style={{
        height: '400px',
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
        <Popover
          placement={placement as Parameters<typeof Popover>[0]['placement']}
          content="This is a simple text content inside the popover. You can customize it by passing text into content property."
          onClose={() => setOpened(false)}
          title="Popover Title"
          visible={opened}
        >
          <Button
            onClick={() => setOpened(true)}
            sentiment="neutral"
            ref={btnRef}
          >
            Open Popover
          </Button>
        </Popover>
      </div>
    </div>
  )
}

export default Render
