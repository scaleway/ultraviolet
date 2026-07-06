import { StoryFn } from '@storybook/react-vite'
import { KeyValueInput } from '..'
import { Template } from './Template.stories'

export const Disabled: StoryFn<typeof KeyValueInput> = args => <KeyValueInput {...args} />

Disabled.args = { ...Template.args, size: 'small', keyvalues: [{ key: 'Key', value: 'value' }], disabled: true }
