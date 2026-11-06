import type { StoryFn } from '@storybook/react-vite'
import { DocIcon } from '@ultraviolet/icons'
import { useState } from 'react'
import { SelectableCard } from '..'
import { Button } from '../../../Action/Button'
import { Badge } from '../../../Badges/Badge'
import { Row } from '../../../Layout/Row'
import { Stack } from '../../../Layout/Stack'
import { Text } from '../../../Typography/Text'
import { SelectInput } from '../../SelectInput'

export const LabelDescription: StoryFn = args => {
  const [valueRadio, setValueRadio] = useState('label-29')
  const [valueSelect, setValueSelect] = useState({ 'label-20': true, 'label-21': false, 'label-17': false })
  const [value4, setValue4] = useState({
    'label-22': true,
    'label-23': false,
    'label-24': false,
    'label-25': false,
  })

  return (
    <Stack flex={1} gap={8}>
      <SelectableCard
        {...args}
        label="Allow public connections"
        labelDescription={
          <Button variant="ghost" sentiment="primary" size="small">
            <DocIcon size="small" /> Learn about public connectivity
          </Button>
        }
        name="label-15"
        onChange={event =>
          setValueSelect(prevState => ({
            ...prevState,
            'label-17': event.currentTarget.checked,
          }))
        }
        showTick
        checked={valueSelect['label-17']}
        type="checkbox"
        value="label-17"
      >
        <Text as="p" variant="bodySmall" sentiment="neutral" prominence="weak">
          Public IP adresses enable connectivity over the public internet.
        </Text>
      </SelectableCard>
      <Stack flex={1} gap={1}>
        <SelectableCard
          {...args}
          checked={valueRadio === 'label-29'}
          label="Option 1"
          labelDescription={
            <Text as="span" variant="bodyStronger">
              1.99€
            </Text>
          }
          name="label-29"
          onChange={event => setValueRadio(event.currentTarget.value)}
          showTick
          type="radio"
          value="label-29"
        >
          <Text as="p" prominence="weak" sentiment="neutral" variant="bodySmall">
            This option will cost you 1.99€ and provide you with a lot of happiness
          </Text>
        </SelectableCard>
        <SelectableCard
          {...args}
          checked={valueRadio === 'label-15'}
          label="Option 2"
          labelDescription={
            <Text as="span" variant="bodyStronger">
              2.99€
            </Text>
          }
          name="label-15"
          onChange={event => setValueRadio(event.currentTarget.value)}
          showTick
          type="radio"
          value="label-15"
        >
          <Text as="p" prominence="weak" sentiment="neutral" variant="bodySmall">
            This option will cost you 2.99€ and provide you with a lot more of happiness
          </Text>
        </SelectableCard>
      </Stack>
      <Stack flex={1} gap={1}>
        <SelectableCard
          {...args}
          checked={valueSelect['label-20']}
          labelDescription={
            <Text as="span" variant="bodyStronger">
              4.99€
            </Text>
          }
          label="Optional option 1"
          name="label-20"
          onChange={event =>
            setValueSelect(prevState => ({
              ...prevState,
              'label-20': event.currentTarget.checked,
            }))
          }
          showTick
          type="checkbox"
          value="label-20"
        >
          <Text as="p" prominence="weak" sentiment="neutral" variant="bodySmall">
            <Stack gap={3} width="100%">
              This option will cost you 1.99€ and provide you with a lot of happiness
              <SelectInput
                label="Select a sub option"
                options={[
                  {
                    label: 'Sub option 1',
                    value: 'option1',
                  },
                ]}
              />
            </Stack>
          </Text>
        </SelectableCard>
        <SelectableCard
          {...args}
          checked={valueSelect['label-21']}
          label="Optional option 2"
          labelDescription={
            <Text as="span" variant="bodyStronger">
              9.99€
            </Text>
          }
          name="label-21"
          onChange={event =>
            setValueSelect(prevState => ({
              ...prevState,
              'label-21': event.currentTarget.checked,
            }))
          }
          showTick
          type="checkbox"
          value="label-21"
        >
          <Text as="p" prominence="weak" sentiment="neutral" variant="bodySmall">
            This option will cost you 2.99€ and provide you with a lot more of happiness
          </Text>
        </SelectableCard>
      </Stack>

      <Row gap={1} templateColumns="repeat(2, auto)">
        <SelectableCard
          {...args}
          checked={value4['label-22']}
          label="Backup"
          labelDescription={
            <Stack justifyContent="space-between" direction="row" width="100%" alignItems="center">
              <Badge sentiment="primary" size="small">
                Recommended
              </Badge>
              <Text as="p" variant="bodyStrong">
                3.99€
              </Text>
            </Stack>
          }
          labelDescriptionAlignment="left"
          name="label-22"
          onChange={event =>
            setValue4(prevState => ({
              ...prevState,
              'label-22': event.currentTarget.checked,
            }))
          }
          showTick
          type="checkbox"
          value="label-22"
        >
          <Text as="p" prominence="weak" sentiment="neutral" variant="bodySmall">
            This option will cost you 2.99€ and provide you with a lot more of happiness
          </Text>
        </SelectableCard>
        <SelectableCard
          {...args}
          checked={value4['label-23']}
          label="Redundancy"
          labelDescription={
            <Badge sentiment="primary" size="small">
              Recommended
            </Badge>
          }
          labelDescriptionAlignment="left"
          name="label-23"
          onChange={event =>
            setValue4(prevState => ({
              ...prevState,
              'label-23': event.currentTarget.checked,
            }))
          }
          showTick
          type="checkbox"
          value="label-23"
        >
          <Text as="p" prominence="weak" sentiment="neutral" variant="bodySmall">
            This option will cost you 2.99€ and provide you with a lot more of happiness
          </Text>
        </SelectableCard>

        <SelectableCard
          {...args}
          checked={value4['label-24']}
          label="Morning Reboot 9am"
          labelDescription={
            <Badge sentiment="neutral" size="small">
              Optional
            </Badge>
          }
          labelDescriptionAlignment="left"
          name="label-24"
          onChange={event =>
            setValue4(prevState => ({
              ...prevState,
              'label-24': event.currentTarget.checked,
            }))
          }
          showTick
          type="checkbox"
          value="label-24"
        >
          <Text as="p" prominence="weak" sentiment="neutral" variant="bodySmall">
            This option will cost you 2.99€ and provide you with a lot more of happiness
          </Text>
        </SelectableCard>

        <SelectableCard
          {...args}
          checked={value4['label-25']}
          label="Monitoring"
          labelDescription={
            <Badge sentiment="neutral" size="small">
              Optional
            </Badge>
          }
          labelDescriptionAlignment="left"
          name="label-25"
          onChange={event =>
            setValue4(prevState => ({
              ...prevState,
              'label-25': event.currentTarget.checked,
            }))
          }
          showTick
          type="checkbox"
          value="label-25"
        >
          <Text as="p" prominence="weak" sentiment="neutral" variant="bodySmall">
            This option will cost you 2.99€ and provide you with a lot more of happiness
          </Text>
        </SelectableCard>
      </Row>
    </Stack>
  )
}

LabelDescription.args = {
  indented: true,
}

LabelDescription.parameters = {
  docs: {
    description: {
      story:
        'Use prop `labelDescription` to add more information on the same row as the label (badge, button, etc.). Use prop `labelDescriptionAlignment="left"` to keep that description right next to the label instead of aligned to the far right. <br/>**Prefer a `labelDescription` over a complex `label`**, as any content inside the `label` prop is added to the accessible label of the checkbox, overloading it.',
    },
  },
}
