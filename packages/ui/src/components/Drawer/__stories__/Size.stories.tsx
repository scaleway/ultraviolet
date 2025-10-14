import type { StoryFn } from '@storybook/react-vite'
import { Button } from '../../Button'
import { Drawer } from '..'
import { SIZES } from '../styles.css'

export const Size: StoryFn = props => (
  <>
    {Object.keys(SIZES).map(width => (
      <div key={width} style={{ display: 'inline-block', padding: 16 }}>
        <Drawer
          {...props}
          disclosure={<Button>{width}</Button>}
          header={width}
          size={width as keyof typeof SIZES}
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
