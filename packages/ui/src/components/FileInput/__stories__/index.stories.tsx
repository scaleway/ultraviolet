import type { Meta } from '@storybook/react-vite'
import { FileInput } from '..'

export default {
  component: FileInput,
  decorators: [StoryComponent => <StoryComponent />],

  title: 'Components/Data Entry/FileInput',
} as Meta<typeof FileInput>

export { Playground } from './Playground.stories'
export { DropzoneSize } from './DropzoneSize.stories'
export { Overlay } from './Overlay.stories'
export { Multiple } from './Multiple.stories'
export { Disabled } from './Disabled.stories'
export { Children } from './Children.stories'
export { List } from './List.stories'
export { Controlled } from './Controlled.stories'
