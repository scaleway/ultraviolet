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
  title: 'UI/Data Display/TagList',
  parameters: {
    a11yStatus: {
      perceivable: true,
      operable: true,
      understandable: true,
      robust: false,
    },
  },
} satisfies Meta<typeof TagList>

export { Playground } from './Playground.stories'
export { Threshold } from './Threshold.stories'
export { Multiline } from './Multiline.stories'
export { Copiable } from './Copiable.stories'
export { Icons } from './Icons.stories'
export { ParentWithDefinedWidth } from './ParentWithWidth.stories'
export { PopoverMaxHeight } from './PopoverMaxHeight.stories'
export { MaxLength } from './MaxLength.stories'
export { Variant } from './Variant.stories'
export { Sentiment } from './Sentiment.stories'
export { KeyValue } from './KeyValue.stories'
