import type { StoryFn } from '@storybook/react'
import { Drawer, SIZES } from '..'
import { Button } from '../../Button'

export const Size: StoryFn = props => (
  <>
    {Object.keys(SIZES).map(width => (
      <div style={{ display: 'inline-block', padding: 16 }} key={width}>
        <Drawer
          {...props}
          size={width as keyof typeof SIZES}
          disclosure={<Button>{width}</Button>}
          header={width}
        >
          <div>Content of the {width} drawer</div>
        </Drawer>
      </div>
    ))}
  </>
)

Size.parameters = {
  docs: {
    description: { story: 'Here is a list of all the width values we support' },
  },
}
