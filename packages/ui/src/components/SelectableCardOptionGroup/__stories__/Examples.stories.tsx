import type { StoryFn } from '@storybook/react'
import { useState } from 'react'
import { SelectableCardOptionGroup } from '..'
import { Badge } from '../../Badge'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import centos from './assets/centos.svg'
import debian from './assets/debian.svg'
import mysql from './assets/mysql.svg'
import postgresql from './assets/postgresql.svg'
import ubuntu from './assets/ubuntu.svg'
import {
  centosOptions,
  debianOptions,
  mysqlOptions,
  postgresqlOptions,
  ubuntuOptionsLegacy,
} from './constants'

export const Examples: StoryFn<typeof SelectableCardOptionGroup> = args => {
  const [value, onChange] = useState<string>()
  const [option, onChangeOption] = useState<string>()

  const [value2, onChange2] = useState<string>()
  const [option2, onChangeOption2] = useState<string>()

  return (
    <Stack direction="column" gap={8}>
      <Stack direction="column" gap={8}>
        <SelectableCardOptionGroup
          {...args}
          value={value}
          optionValue={option}
          onChangeOption={(newValue: string) => onChangeOption(newValue)}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            onChange(event.currentTarget.value)
          }
          size="large"
          columns={4}
        >
          <SelectableCardOptionGroup.Option
            value="ubuntu"
            label="Ubuntu"
            labelDescription={
              <Badge sentiment="primary" size="small">
                NEW
              </Badge>
            }
            options={ubuntuOptionsLegacy}
            image={ubuntu}
          >
            <Text
              as="p"
              variant="bodySmall"
              sentiment="neutral"
              prominence="weak"
              placement="center"
            >
              New versions has been added recently
            </Text>
          </SelectableCardOptionGroup.Option>
          <SelectableCardOptionGroup.Option
            value="debian"
            label="Debian"
            options={debianOptions}
            image={debian}
          >
            <Text
              as="p"
              variant="bodySmall"
              sentiment="neutral"
              prominence="weak"
              placement="center"
            >
              Easy to configure and maintain
            </Text>
          </SelectableCardOptionGroup.Option>
          <SelectableCardOptionGroup.Option
            value="centos"
            label="CentOS"
            options={centosOptions}
            image={centos}
          >
            <Text
              as="p"
              variant="bodySmall"
              sentiment="neutral"
              prominence="weak"
              placement="center"
            >
              Used by many enterprises
            </Text>
          </SelectableCardOptionGroup.Option>
        </SelectableCardOptionGroup>
        <Stack>
          <Text as="h2" variant="bodyStrong">
            Debug:
          </Text>
          <Text as="p" variant="body">
            Selected OS:{' '}
            <Text as="span" variant="bodyStrong">
              {value}
            </Text>
          </Text>
          <Text as="p" variant="body">
            Selected OS version:{' '}
            <Text as="span" variant="bodyStrong">
              {option}
            </Text>
          </Text>
        </Stack>
      </Stack>
      <SelectableCardOptionGroup
        {...args}
        value={value2}
        optionValue={option2}
        onChangeOption={(newValue: string) => onChangeOption2(newValue)}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          onChange2(event.currentTarget.value)
        }
        size="large"
        columns={4}
      >
        <SelectableCardOptionGroup.Option
          value="mysql"
          label="MySQL"
          options={mysqlOptions}
          image={mysql}
        />
        <SelectableCardOptionGroup.Option
          value="postgresql"
          label="PostgreSQL"
          options={postgresqlOptions}
          image={postgresql}
        />
      </SelectableCardOptionGroup>
    </Stack>
  )
}

Examples.args = {
  legend: 'Choose your OS',
  helper: 'Choose the OS and version you need to install on your server',
}

Examples.decorators = [
  Story => (
    <div style={{ height: '800px' }}>
      <Story />
    </div>
  ),
]
