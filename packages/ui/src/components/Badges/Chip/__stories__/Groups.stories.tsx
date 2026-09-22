import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { Chip } from '..'
import { Stack } from '../../../Layout/Stack'
import { Text } from '../../../Typography/Text'

export const Groups: StoryFn<typeof Chip> = ({ ...args }) => {
  const [singleSelected, setSingleSelected] = useState(-1)
  const [multiSelected, setMultiSelected] = useState<number[]>([])

  return (
    <Stack direction="column" gap={3}>
      <Stack gap={1}>
        <Text as="h1" variant="heading">
          Single-select group
        </Text>
        <Stack direction="row" gap={1}>
          <Chip
            {...args}
            active={singleSelected === 0}
            onClick={() => {
              if (singleSelected === 0) {
                setSingleSelected(-1)
              } else {
                setSingleSelected(0)
              }
            }}
          >
            All
          </Chip>
          <Chip
            {...args}
            active={singleSelected === 1}
            onClick={() => {
              if (singleSelected === 1) {
                setSingleSelected(-1)
              } else {
                setSingleSelected(1)
              }
            }}
          >
            Product
          </Chip>
          <Chip
            {...args}
            active={singleSelected === 2}
            onClick={() => {
              if (singleSelected === 2) {
                setSingleSelected(-1)
              } else {
                setSingleSelected(2)
              }
            }}
          >
            Actions
          </Chip>
          <Chip
            {...args}
            active={singleSelected === 3}
            onClick={() => {
              if (singleSelected === 3) {
                setSingleSelected(-1)
              } else {
                setSingleSelected(3)
              }
            }}
          >
            Resources
          </Chip>
        </Stack>
        Selected chip: {singleSelected === -1 ? 'none' : singleSelected}
      </Stack>
      <Stack gap={1}>
        <Text as="h1" variant="heading">
          Muli-select group
        </Text>
        <Stack direction="row" gap={1}>
          <Chip
            {...args}
            active={multiSelected.includes(0)}
            onClick={() => {
              if (multiSelected.includes(0)) {
                setMultiSelected([])
              } else {
                setMultiSelected([...multiSelected, 0])
              }
            }}
          >
            All (18)
          </Chip>
          <Chip
            {...args}
            active={multiSelected.includes(1) || multiSelected.includes(0)}
            onClick={() => {
              if (multiSelected.includes(1)) {
                setMultiSelected(multiSelected.filter(id => id !== 1))
              } else {
                setMultiSelected([...multiSelected, 1])
              }
            }}
          >
            Product (2)
          </Chip>
          <Chip
            {...args}
            active={multiSelected.includes(0) || multiSelected.includes(2)}
            onClick={() => {
              if (multiSelected.includes(2)) {
                setMultiSelected(multiSelected.filter(id => id !== 2))
              } else {
                setMultiSelected([...multiSelected, 2])
              }
            }}
          >
            Actions (4)
          </Chip>
          <Chip
            {...args}
            active={multiSelected.includes(3) || multiSelected.includes(0)}
            onClick={() => {
              if (multiSelected.includes(3)) {
                setMultiSelected(multiSelected.filter(id => id !== 3))
              } else {
                setMultiSelected([...multiSelected, 3])
              }
            }}
          >
            Resources (12)
          </Chip>
        </Stack>
        Selected chip{multiSelected.length > 1 ? 's' : null}:{' '}
        {multiSelected.includes(0) ? '1 2 3' : multiSelected.map(id => `${id} `)}
      </Stack>
    </Stack>
  )
}
