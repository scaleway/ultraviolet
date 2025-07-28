import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { Badge } from '../../Badge'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { SelectableCardOptionGroup } from '..'
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
          columns={4}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            onChange(event.currentTarget.value)
          }
          onChangeOption={(newValue: string) => onChangeOption(newValue)}
          optionValue={option}
          size="large"
          value={value}
        >
          <SelectableCardOptionGroup.Option
            image={ubuntu}
            label="Ubuntu"
            labelDescription={
              <Badge sentiment="primary" size="small">
                NEW
              </Badge>
            }
            options={ubuntuOptionsLegacy}
            value="ubuntu"
          >
            <Text
              as="p"
              placement="center"
              prominence="weak"
              sentiment="neutral"
              variant="bodySmall"
            >
              New versions has been added recently
            </Text>
          </SelectableCardOptionGroup.Option>
          <SelectableCardOptionGroup.Option
            image={debian}
            label="Debian"
            options={debianOptions}
            value="debian"
          >
            <Text
              as="p"
              placement="center"
              prominence="weak"
              sentiment="neutral"
              variant="bodySmall"
            >
              Easy to configure and maintain
            </Text>
          </SelectableCardOptionGroup.Option>
          <SelectableCardOptionGroup.Option
            image={centos}
            label="CentOS"
            options={centosOptions}
            value="centos"
          >
            <Text
              as="p"
              placement="center"
              prominence="weak"
              sentiment="neutral"
              variant="bodySmall"
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
        columns={4}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          onChange2(event.currentTarget.value)
        }
        onChangeOption={(newValue: string) => onChangeOption2(newValue)}
        optionValue={option2}
        size="large"
        value={value2}
      >
        <SelectableCardOptionGroup.Option
          image={mysql}
          label="MySQL"
          options={mysqlOptions}
          value="mysql"
        />
        <SelectableCardOptionGroup.Option
          image={postgresql}
          label="PostgreSQL"
          options={postgresqlOptions}
          value="postgresql"
        />
      </SelectableCardOptionGroup>
    </Stack>
  )
}

Examples.args = {
  helper: 'Choose the OS and version you need to install on your server',
  legend: 'Choose your OS',
}

Examples.decorators = [
  Story => (
    <div style={{ height: '800px' }}>
      <Story />
    </div>
  ),
]
