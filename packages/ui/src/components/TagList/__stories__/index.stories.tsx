import type { Meta } from '@storybook/react-vite'
import { TagList } from '..'

export default {
  component: TagList,
  decorators: [
    StoryComponent => (
      <div style={{ width: 500 }}>
        <StoryComponent />
      </div>
    ),
  ],
  title: 'Components/Data Display/TagList',
} as Meta

export { Playground } from './Playground.stories'
export { Threshold } from './Threshold.stories'
export { Multiline } from './Multiline.stories'
export { Copiable } from './Copiable.stories'
export { Icons } from './Icons.stories'
export { ParentWithDefinedWidth } from './ParentWithWidth.stories'
export { PopoverMaxHeight } from './PopoverMaxHeight.stories'
export { MaxLength } from './MaxLength.stories'
