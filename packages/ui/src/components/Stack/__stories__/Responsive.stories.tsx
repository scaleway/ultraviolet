import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '../../Stack'
import { child } from './styles.css'

export const Responsive: StoryFn = props => (
  <Stack
    {...props}
    direction={{ small: 'row', xsmall: 'row', xxsmall: 'column' }}
    gap={{ small: 3, xsmall: 2, xxsmall: 1 }}
  >
    <div className={child} data-width-full>
      First child
    </div>
    <div className={child} data-width-full>
      Second child
    </div>
    <div className={child} data-width-full>
      Third child
    </div>
  </Stack>
)

Responsive.parameters = {
  docs: {
    description: {
      story:
        'You can set different type of `direction` and `gap` according to theme breakpoints. We recommend switching to [story view mode](/story/components-layout-row--responsive) and in the top bar select screen size to test on different breakpoints.',
    },
  },
}
