import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { SelectableCard } from '..'
import { Button } from '../../../Action/Button'
import { Badge } from '../../../Badges/Badge'
import { Row } from '../../../Layout/Row'
import { Stack } from '../../../Layout/Stack'
import { Text } from '../../../Typography/Text'
import { TextArea } from '../../TextArea'
import fr from './assets/fr.svg'
import nl from './assets/nl.svg'
import pl from './assets/pl.svg'

export const Examples: StoryFn = args => {
  const [value, setValue] = useState({
    'label-26': true,
    'label-27': false,
    'label-28': false,
  })
  const [valueInput, setValueInput] = useState({
    'label-29': false,
  })
  const [valueDomain, setValueDomain] = useState({
    'label-30': false,
  })

  return (
    <Stack flex={1} gap={8}>
      <Row gap={1} templateColumns="repeat(3, auto)">
        <SelectableCard
          {...args}
          checked={value['label-26']}
          label={
            <Stack alignItems="center" direction="row" flex={1} gap={1}>
              <img alt="fr" height={24} src={fr} width={24} />
              <Text as="span" variant="bodyStrong">
                France
              </Text>
            </Stack>
          }
          name="label-26"
          onChange={event =>
            setValue(prevState => ({
              ...prevState,
              'label-26': event.currentTarget.checked,
            }))
          }
          showTick
          type="checkbox"
          value="label-26"
        />
        <SelectableCard
          {...args}
          checked={value['label-27']}
          label={
            <Stack alignItems="center" direction="row" flex={1} gap={1}>
              <img alt="nl" src={nl} width={24} />
              <Text as="span" variant="bodyStrong">
                Netherlands
              </Text>
            </Stack>
          }
          name="label-27"
          onChange={event =>
            setValue(prevState => ({
              ...prevState,
              'label-27': event.currentTarget.checked,
            }))
          }
          showTick
          type="checkbox"
          value="label-27"
        />

        <SelectableCard
          {...args}
          checked={value['label-28']}
          label={
            <Stack alignItems="center" direction="row" flex={1} gap={1}>
              <img alt="pl" src={pl} width={24} />
              <Text as="span" variant="bodyStrong">
                Poland
              </Text>
            </Stack>
          }
          name="label-28"
          onChange={event =>
            setValue(prevState => ({
              ...prevState,
              'label-28': event.currentTarget.checked,
            }))
          }
          showTick
          type="checkbox"
          value="label-28"
        />
      </Row>
      <SelectableCard
        {...args}
        checked={valueInput['label-29']}
        label="With an input in the children"
        name="label-29"
        onChange={event =>
          setValueInput(prevState => ({
            ...prevState,
            'label-29': event.currentTarget.checked,
          }))
        }
        showTick
        type="checkbox"
        value="label-29"
      >
        <TextArea label="" onChange={() => {}} />
      </SelectableCard>
      <SelectableCard
        {...args}
        checked={valueDomain['label-30']}
        label={
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row" gap={1}>
              <Text as="span" variant="body">
                domain.com
              </Text>
              <Badge>Premium</Badge>
            </Stack>
            <Stack direction="row" gap={2}>
              <Badge sentiment="primary">Save 64%</Badge>
              <Stack alignItems="center" direction="row" gap="0.5">
                <Text as="span" prominence="weak" sentiment="neutral" strikeThrough variant="captionSmall">
                  €8.99
                </Text>
                <Text as="span" sentiment="neutral" variant="bodyStronger">
                  €2.99 year
                </Text>
              </Stack>
              <Button sentiment="primary" size="small" variant="outlined">
                Add to cart
              </Button>
            </Stack>
          </Stack>
        }
        name="label-30"
        onChange={event =>
          setValueDomain(prevState => ({
            ...prevState,
            'label-30': event.currentTarget.checked,
          }))
        }
        showTick
        type="checkbox"
        value="label-30"
      />
    </Stack>
  )
}

Examples.decorators = [
  StoryComponent => (
    <Stack direction="row" gap={2}>
      <StoryComponent />
    </Stack>
  ),
]

Examples.args = {
  indented: true,
}
