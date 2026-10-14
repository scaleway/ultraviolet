import type { StoryFn } from '@storybook/react-vite'
import { AudioIcon } from '@ultraviolet/icons/AudioIcon'
import { ChatOutlineIcon } from '@ultraviolet/icons/ChatOutlineIcon'
import { ConsoleOutlineIcon } from '@ultraviolet/icons/ConsoleOutlineIcon'
import { EmbeddingOutlineIcon } from '@ultraviolet/icons/EmbeddingOutlineIcon'
import { ImageOutlineIcon } from '@ultraviolet/icons/ImageOutlineIcon'
import { SelectInput } from '..'
import { Stack } from '../../../Layout/Stack'
import type { DataType } from '../types'
import { dataGrouped } from './resources'

const tasks = [
  {
    label: (
      <Stack alignItems="center" as="span" direction="row" gap={1}>
        <ChatOutlineIcon />
        Chat
      </Stack>
    ),
    searchText: 'chat',
    value: 'chat',
  },
  {
    label: (
      <Stack alignItems="center" as="span" direction="row" gap={1}>
        <EmbeddingOutlineIcon />
        Embeddings
      </Stack>
    ),
    searchText: 'embeddings',
    value: 'embeddings',
  },
  {
    label: (
      <Stack alignItems="center" as="span" direction="row" gap={1}>
        <ImageOutlineIcon />
        Vision
      </Stack>
    ),
    searchText: 'vision',
    value: 'vision',
  },
  {
    label: (
      <Stack alignItems="center" as="span" direction="row" gap={1}>
        <AudioIcon />
        Audio transcription
      </Stack>
    ),
    searchText: 'audio-transcription',
    value: 'audio-transcription',
  },
  {
    label: (
      <Stack alignItems="center" as="span" direction="row" gap={1}>
        <ConsoleOutlineIcon />
        Code
      </Stack>
    ),
    searchText: 'code',
    value: 'code',
  },
] satisfies DataType

const regions = [
  { label: 'PARIS', value: 'paris' },
  { label: 'MILAN', value: 'milan' },
  { label: 'AMSTERDAM', value: 'amsterdam' },
  { label: 'WARSAW', value: 'warsaw' },
] satisfies DataType

export const Multiselect: StoryFn<typeof SelectInput> = args => (
  <Stack gap={2} width="50%">
    <SelectInput {...args} />
    <SelectInput {...args} label="Task" options={tasks} placeholder="Select a task" />
    <SelectInput {...args} label="Regions" options={regions} placeholder="Select regions" />
  </Stack>
)

Multiselect.args = {
  label: 'Label',
  multiselect: true,
  options: dataGrouped,
  value: '',
}

Multiselect.parameters = {
  docs: {
    description: {
      story: '`multiselect` prop let the user selects more than one option.',
    },
  },
}
