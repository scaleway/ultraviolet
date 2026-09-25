import type { StoryFn } from '@storybook/react-vite'
import { useEffect, useRef, useState } from 'react'
import { Button } from '../../../Action/Button'
import { Stack } from '../../../Layout/Stack'
import { Popup } from '../index'
import { Panel } from './Panel'

export const MatchTriggerWidth: StoryFn<typeof Popup> = () => {
  const triggerRef = useRef<HTMLDivElement>(null)
  const [maxWidth, setMaxWidth] = useState<number | string>('100%')

  useEffect(() => {
    const measure = () => {
      if (triggerRef.current) {
        setMaxWidth(triggerRef.current.getBoundingClientRect().width)
      }
    }

    measure()
    window.addEventListener('resize', measure)

    return () => window.removeEventListener('resize', measure)
  }, [])

  return (
    <Stack gap={5} width="100%">
      <Stack gap={1}>
        <Popup
          debounceDelay={0}
          containerFullWidth
          maxWidth={maxWidth}
          text={
            <Panel title="Matched to trigger width">
              This popup width is manually synced to the trigger width using a resize listener and the `maxWidth` prop.
              The planned API will provide a `matchTriggerWidth` prop backed by the `size()` middleware instead.
            </Panel>
          }
        >
          <Button ref={triggerRef} sentiment="neutral" variant="outlined">
            Trigger (this width is measured)
          </Button>
        </Popup>
      </Stack>
    </Stack>
  )
}

MatchTriggerWidth.parameters = {
  docs: {
    description: {
      story:
        'The current API has no `matchTriggerWidth`. Consumers (SelectInput, SearchInput) duplicate a resize listener that measures the trigger and passes it as `maxWidth`, often combined with `containerFullWidth`. Try resizing the preview to see the manual sync. The planned API adds a `matchTriggerWidth` prop on `Popup.Panel` powered by the `size()` middleware, removing this duplicated logic.',
    },
  },
}
