import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { Badge } from '../../Badge'
import { Button } from '../../Button'
import { Row } from '../../Row'
import { SelectInput } from '../../SelectInput'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { TextArea } from '../../TextArea'
import { SelectableCard } from '..'
import fr from './assets/fr.svg'
import nl from './assets/nl.svg'
import pl from './assets/pl.svg'

export const Examples: StoryFn = args => {
  const [value, onChange] = useState('label-29')
  const [value2, onChange2] = useState({ 'label-20': true, 'label-21': false })
  const [value3, onChange3] = useState({
    'label-22': true,
    'label-23': false,
    'label-24': false,
    'label-25': false,
  })
  const [value4, onChange4] = useState({
    'label-26': true,
    'label-27': false,
    'label-28': false,
  })
  const [value5, onChange5] = useState({
    'label-29': false,
  })
  const [value6, onChange6] = useState({
    'label-30': false,
  })

  return (
    <Stack flex={1} gap={8}>
      <Stack flex={1} gap={1}>
        <SelectableCard
          {...args}
          checked={value === 'label-29'}
          label={
            <Stack direction="row" flex={1} justifyContent="space-between">
              <Text as="span" variant="bodyStrong">
                Option 1
              </Text>
              <Text as="span" variant="bodyStronger">
                1.99€
              </Text>
            </Stack>
          }
          name="label-29"
          onChange={event => onChange(event.currentTarget.value)}
          showTick
          type="radio"
          value="label-29"
        >
          <Text as="p" prominence="weak" sentiment="neutral" variant="body">
            This option will cost you 1.99€ and provide you with a lot of
            happiness
          </Text>
        </SelectableCard>
        <SelectableCard
          {...args}
          checked={value === 'label-15'}
          label={
            <Stack direction="row" flex={1} justifyContent="space-between">
              <Text as="span" variant="bodyStrong">
                Option 2
              </Text>
              <Text as="span" variant="bodyStronger">
                2.99€
              </Text>
            </Stack>
          }
          name="label-15"
          onChange={event => onChange(event.currentTarget.value)}
          showTick
          type="radio"
          value="label-15"
        >
          <Text as="p" prominence="weak" sentiment="neutral" variant="body">
            This option will cost you 2.99€ and provide you with a lot more of
            happiness
          </Text>
        </SelectableCard>
      </Stack>
      <Stack flex={1} gap={1}>
        <SelectableCard
          {...args}
          checked={value2['label-20']}
          label={
            <Stack direction="row" flex={1} justifyContent="space-between">
              <Text as="span" variant="bodyStrong">
                Optional option 1
              </Text>
              <Text as="span" variant="bodyStronger">
                4.99€
              </Text>
            </Stack>
          }
          name="label-20"
          onChange={event =>
            onChange2(prevState => ({
              ...prevState,
              'label-20': event.currentTarget.checked,
            }))
          }
          showTick
          type="checkbox"
          value="label-20"
        >
          <Stack gap={1}>
            <Text as="p" prominence="weak" sentiment="neutral" variant="body">
              This option will cost you 1.99€ and provide you with a lot of
              happiness
              <SelectInput
                label="Select a sub option"
                options={[
                  {
                    label: 'Sub option 1',
                    value: 'option1',
                  },
                ]}
              />
            </Text>
          </Stack>
        </SelectableCard>
        <SelectableCard
          {...args}
          checked={value2['label-21']}
          label={
            <Stack direction="row" flex={1} justifyContent="space-between">
              <Text as="span" variant="bodyStrong">
                Optional option 2
              </Text>
              <Text as="span" variant="bodyStronger">
                9.99€
              </Text>
            </Stack>
          }
          name="label-21"
          onChange={event =>
            onChange2(prevState => ({
              ...prevState,
              'label-21': event.currentTarget.checked,
            }))
          }
          showTick
          type="checkbox"
          value="label-21"
        >
          <Text as="p" prominence="weak" sentiment="neutral" variant="body">
            This option will cost you 2.99€ and provide you with a lot more of
            happiness
          </Text>
        </SelectableCard>
      </Stack>

      <Row gap={1} templateColumns="repeat(2, auto)">
        <SelectableCard
          {...args}
          checked={value3['label-22']}
          label={
            <Stack alignItems="center" direction="row" flex={1} gap={1}>
              <Text as="span" variant="bodyStrong">
                Backup
              </Text>
              <Badge sentiment="primary" size="small">
                Recommended
              </Badge>
            </Stack>
          }
          name="label-22"
          onChange={event =>
            onChange3(prevState => ({
              ...prevState,
              'label-22': event.currentTarget.checked,
            }))
          }
          showTick
          type="checkbox"
          value="label-22"
        >
          <Text as="p" prominence="weak" sentiment="neutral" variant="body">
            This option will cost you 2.99€ and provide you with a lot more of
            happiness
          </Text>
        </SelectableCard>
        <SelectableCard
          {...args}
          checked={value3['label-23']}
          label={
            <Stack alignItems="center" direction="row" flex={1} gap={1}>
              <Text as="span" variant="bodyStrong">
                Redundancy
              </Text>
              <Badge sentiment="primary" size="small">
                Recommended
              </Badge>
            </Stack>
          }
          name="label-23"
          onChange={event =>
            onChange3(prevState => ({
              ...prevState,
              'label-23': event.currentTarget.checked,
            }))
          }
          showTick
          type="checkbox"
          value="label-23"
        >
          <Text as="p" prominence="weak" sentiment="neutral" variant="body">
            This option will cost you 2.99€ and provide you with a lot more of
            happiness
          </Text>
        </SelectableCard>

        <SelectableCard
          {...args}
          checked={value3['label-24']}
          label={
            <Stack alignItems="center" direction="row" flex={1} gap={1}>
              <Text as="span" variant="bodyStrong">
                Morning Reboot 9am
              </Text>
              <Badge sentiment="neutral" size="small">
                Optional
              </Badge>
            </Stack>
          }
          name="label-24"
          onChange={event =>
            onChange3(prevState => ({
              ...prevState,
              'label-24': event.currentTarget.checked,
            }))
          }
          showTick
          type="checkbox"
          value="label-24"
        >
          <Text as="p" prominence="weak" sentiment="neutral" variant="body">
            This option will cost you 2.99€ and provide you with a lot more of
            happiness
          </Text>
        </SelectableCard>

        <SelectableCard
          {...args}
          checked={value3['label-25']}
          label={
            <Stack alignItems="center" direction="row" flex={1} gap={1}>
              <Text as="span" variant="bodyStrong">
                Monitoring
              </Text>
              <Badge sentiment="neutral" size="small">
                Optional
              </Badge>
            </Stack>
          }
          name="label-25"
          onChange={event =>
            onChange3(prevState => ({
              ...prevState,
              'label-25': event.currentTarget.checked,
            }))
          }
          showTick
          type="checkbox"
          value="label-25"
        >
          <Text as="p" prominence="weak" sentiment="neutral" variant="body">
            This option will cost you 2.99€ and provide you with a lot more of
            happiness
          </Text>
        </SelectableCard>
      </Row>

      <Row gap={1} templateColumns="repeat(3, auto)">
        <SelectableCard
          {...args}
          checked={value4['label-26']}
          label={
            <Stack alignItems="center" direction="row" flex={1} gap={1}>
              <img alt="fr" src={fr} width={24} />
              <Text as="span" variant="bodyStrong">
                France
              </Text>
            </Stack>
          }
          name="label-26"
          onChange={event =>
            onChange4(prevState => ({
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
          checked={value4['label-27']}
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
            onChange4(prevState => ({
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
          checked={value4['label-28']}
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
            onChange4(prevState => ({
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
        checked={value5['label-29']}
        label="With an input in the children"
        name="label-29"
        onChange={event =>
          onChange5(prevState => ({
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
        checked={value6['label-30']}
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
                <Text
                  as="span"
                  prominence="weak"
                  sentiment="neutral"
                  strikeThrough
                  variant="captionSmall"
                >
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
          onChange6(prevState => ({
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
