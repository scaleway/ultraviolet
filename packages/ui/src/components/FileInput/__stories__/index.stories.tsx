import { FileInput } from '..'

import type { Meta } from '@storybook/react-vite'

export default {
  component: FileInput,
  decorators: [StoryComponent => <StoryComponent />],
  subcomponents: {
    'FileInput.List': FileInput.List,
    'FileInput.Button': FileInput.Button,
  },

  title: 'UI/Data Entry/FileInput',
  parameters: {
    a11y: 'partial',
  },
} as Meta<typeof FileInput>

export { Playground } from './Playground.stories'
export { DropzoneSize } from './DropzoneSize.stories'
export { Children } from './Children.stories'
export { Multiple } from './Multiple.stories'
export { Disabled } from './Disabled.stories'
export { Bottom } from './Bottom.stories'
export { Overlay } from './Overlay.stories'
export { List } from './List.stories'
export { Controlled } from './Controlled.stories'
