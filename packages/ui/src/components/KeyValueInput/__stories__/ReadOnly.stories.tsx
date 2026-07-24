import { StoryFn } from '@storybook/react-vite'
import { KeyValueInput } from '..'
import { Template } from './Template.stories'

export const ReadOnly: StoryFn<typeof KeyValueInput> = args => <KeyValueInput {...args} />

ReadOnly.args = { ...Template.args, size: 'small', keyvalues: [{ key: 'Key', value: 'value' }], readOnly: true }
