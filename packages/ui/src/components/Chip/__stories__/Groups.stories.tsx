import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { Chip } from '..'

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
            onClick={() =>
              singleSelected === 0
                ? setSingleSelected(-1)
                : setSingleSelected(0)
            }
          >
            All
          </Chip>
          <Chip
            {...args}
            active={singleSelected === 1}
            onClick={() =>
              singleSelected === 1
                ? setSingleSelected(-1)
                : setSingleSelected(1)
            }
          >
            Product
          </Chip>
          <Chip
            {...args}
            active={singleSelected === 2}
            onClick={() =>
              singleSelected === 2
                ? setSingleSelected(-1)
                : setSingleSelected(2)
            }
          >
            Actions
          </Chip>
          <Chip
            {...args}
            active={singleSelected === 3}
            onClick={() =>
              singleSelected === 3
                ? setSingleSelected(-1)
                : setSingleSelected(3)
            }
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
            onClick={() =>
              multiSelected.includes(0)
                ? setMultiSelected([])
                : setMultiSelected([...multiSelected, 0])
            }
          >
            All (18)
          </Chip>
          <Chip
            {...args}
            active={multiSelected.includes(1) || multiSelected.includes(0)}
            onClick={() =>
              multiSelected.includes(1)
                ? setMultiSelected(multiSelected.filter(id => id !== 1))
                : setMultiSelected([...multiSelected, 1])
            }
          >
            Product (2)
          </Chip>
          <Chip
            {...args}
            active={multiSelected.includes(0) || multiSelected.includes(2)}
            onClick={() =>
              multiSelected.includes(2)
                ? setMultiSelected(multiSelected.filter(id => id !== 2))
                : setMultiSelected([...multiSelected, 2])
            }
          >
            Actions (4)
          </Chip>
          <Chip
            {...args}
            active={multiSelected.includes(3) || multiSelected.includes(0)}
            onClick={() =>
              multiSelected.includes(3)
                ? setMultiSelected(multiSelected.filter(id => id !== 3))
                : setMultiSelected([...multiSelected, 3])
            }
          >
            Resources (12)
          </Chip>
        </Stack>
        Selected chip{multiSelected.length > 1 ? 's' : null}:{' '}
        {multiSelected.includes(0)
          ? '1 2 3'
          : multiSelected.map(id => `${id} `)}
      </Stack>
    </Stack>
  )
}
