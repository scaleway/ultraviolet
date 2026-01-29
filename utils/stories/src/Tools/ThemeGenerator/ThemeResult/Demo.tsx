import { AlertCircleIcon } from '@ultraviolet/icons/AlertCircleIcon'
import { ArrowRightIcon } from '@ultraviolet/icons/ArrowRightIcon'
import { CheckIcon } from '@ultraviolet/icons/CheckIcon'
import { ClockOutlineIcon } from '@ultraviolet/icons/ClockOutlineIcon'
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  Link,
  RadioGroup,
  Row,
  SelectableCard,
  Stack,
  Status,
  StepList,
  Stepper,
  SwitchButton,
  Tabs,
  Text,
  Toggle,
} from '@ultraviolet/ui'
import type { ChangeEvent } from 'react'
import { useState } from 'react'
import {
  themeGeneratorContainer,
  themeGeneratorStack,
  themeGeneratorStepList,
  themeGeneratorStepper,
} from './styles.css'

export const Demo = () => {
  const [tabState, setTabState] = useState<number | string>(1)
  const [radioState, setRadioState] = useState<number | string>('option-1')
  const [buttonLoading, setButtonLoading] = useState(false)
  const [switchState, setSwitchState] = useState<'downgrade' | 'upgrade'>(
    'downgrade',
  )
  const [selectableCardState, setSelectableCardState] = useState('option-1')

  return (
    <div className={themeGeneratorContainer}>
      <Row gap={2} templateColumns="1fr 1fr">
        <Stack gap={2}>
          <Tabs
            onChange={(e: number | string) => setTabState(e)}
            selected={tabState}
          >
            <Tabs.Tab value={1}>UI</Tabs.Tab>
            <Tabs.Tab value={2}>Form</Tabs.Tab>
            <Tabs.Tab value={3}>Icons</Tabs.Tab>
            <Tabs.Tab value={4}>Core</Tabs.Tab>
          </Tabs>
          <Card>
            <Stack gap={2}>
              <Stack>
                <Text as="small" prominence="weak" variant="bodySmall">
                  21.08.2023
                </Text>
                <Stack alignItems="center" direction="row" gap={1}>
                  <Status animated sentiment="info" />
                  <Text as="span" variant="heading">
                    Update soon available
                  </Text>
                </Stack>
              </Stack>
              <Text as="p" variant="body">
                A new major version of Ultraviolet is coming soon. It will
                include a lot of new features and improvements.&nbsp;
                <Link href="https://scaleway.com" target="_blank">
                  Learn more
                </Link>
              </Text>
              <Checkbox checked name="valid" required>
                I accept terms and conditions
              </Checkbox>
              <Row gap={2} templateColumns="1fr 1fr">
                <Button sentiment="neutral" variant="outlined">
                  Install Later
                </Button>
                <Button
                  isLoading={buttonLoading}
                  onClick={() => {
                    setButtonLoading(true)
                    setTimeout(() => {
                      setButtonLoading(false)
                    }, 2000)
                  }}
                  sentiment="primary"
                >
                  Install
                </Button>
              </Row>
            </Stack>
          </Card>
          <Stepper className={themeGeneratorStepper} selected={1}>
            <span>Initialize</span>
            <span>Create</span>
            <span>Done</span>
          </Stepper>
          <Stack direction="row" gap={1}>
            <Badge sentiment="neutral">UV-UI</Badge>
            <Badge sentiment="primary">UV-CORE</Badge>
            <Badge sentiment="secondary">UV-FORM</Badge>
            <Badge sentiment="danger">
              <AlertCircleIcon />
              Badge
            </Badge>
            <Badge sentiment="warning">Badge</Badge>
            <Badge sentiment="info">Badge</Badge>
          </Stack>
          <Card>
            <Toggle
              checked
              label="Automatically update newest version of Ultraviolet UI"
              name="toggle"
            />
          </Card>
          <Card>
            <StepList className={themeGeneratorStepList}>
              <StepList.Item
                bulletContent={<CheckIcon />}
                sentiment="success"
                size="small"
              >
                Registration completed
              </StepList.Item>
              <StepList.Item
                bulletContent={<ClockOutlineIcon />}
                sentiment="info"
                size="small"
              >
                You have 10 days of trial
              </StepList.Item>
            </StepList>
          </Card>
        </Stack>
        <Stack gap={1}>
          <Stack gap={1}>
            <Alert sentiment="danger" title="Oops!">
              Seems like an error occurred
            </Alert>
            <Alert sentiment="warning" title="Important!">
              Do not forget your towel
            </Alert>
            <Alert sentiment="info" title="News!">
              It is possible to cut onion without crying
            </Alert>
            <Alert sentiment="success" title="Success!">
              You have update Ultraviolet UI
            </Alert>
          </Stack>
          <Stack gap={1}>
            <Card>
              <Stack
                alignItems="center"
                direction="row"
                gap={1}
                justifyContent="space-between"
              >
                <Stack alignItems="center" direction="row" gap={2}>
                  <Avatar shape="circle" text="MA" variant="text" />
                  <Stack className={themeGeneratorStack}>
                    <Text as="span" sentiment="primary" variant="bodySmall">
                      Review from Marc - 2 days ago
                    </Text>
                    <Text as="span" variant="body">
                      Ultraviolet is the best UI library I...
                    </Text>
                  </Stack>
                </Stack>
                <Button sentiment="neutral" size="small" variant="ghost">
                  <ArrowRightIcon />
                </Button>
              </Stack>
            </Card>
            <Card>
              <Stack gap={2}>
                <SwitchButton
                  name="switch-version"
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setSwitchState(
                      event.target.value as 'downgrade' | 'upgrade',
                    )
                  }
                  value={switchState}
                >
                  <SwitchButton.Option value="downgrade">
                    Downgrade
                  </SwitchButton.Option>
                  <SwitchButton.Option value="upgrade">
                    Upgrade
                  </SwitchButton.Option>
                </SwitchButton>
                <RadioGroup
                  legend={`${switchState
                    .charAt(0)
                    .toUpperCase()}${switchState.slice(
                    1,
                  )} to a previous version:`}
                  name="downgrade"
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setRadioState(event.target.value)
                  }
                  value={radioState}
                >
                  <RadioGroup.Radio label="Version 1.3.0" value="option-1" />
                  <RadioGroup.Radio label="Version 1.2.0" value="option-2" />
                  <RadioGroup.Radio label="Version 1.1.0" value="option-3" />
                </RadioGroup>
              </Stack>
            </Card>
            <Row gap={1} templateColumns="1fr 1fr">
              <SelectableCard
                checked={selectableCardState === 'option-1'}
                label="Update Automatically"
                onChange={event =>
                  setSelectableCardState(event.currentTarget.value)
                }
                value="option-1"
              />
              <SelectableCard
                checked={selectableCardState === 'option-2'}
                label="Update Manually"
                onChange={event =>
                  setSelectableCardState(event.currentTarget.value)
                }
                value="option-2"
              />
            </Row>
          </Stack>
        </Stack>
      </Row>
    </div>
  )
}
