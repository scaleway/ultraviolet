import styled from '@emotion/styled'
import type { ChangeEvent } from 'react'
import { useState } from 'react'
import {
  AlertCircleIcon,
  ArrowRightIcon,
  CheckIcon,
  ClockOutlineIcon,
} from '../../../../../../icons/src'
import {
  Alert,
  AvatarV2,
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
} from '../../../../components'

const StyledStepper = styled(Stepper)`
  padding: 0 ${({ theme }) => theme.space['2']};
`

const StyledStepList = styled(StepList)`
  margin: 0;
`

const StyledStack = styled(Stack)`
  gap: 6px; // This has to be custom because we need both row to be same size and this value doesn't exists in theme
`

const Container = styled.div`
  background: ${({ theme }) => theme.colors.neutral.background};
  box-shadow: ${({ theme }) => theme.shadows.hoverNeutral};
  border-radius: ${({ theme }) => theme.radii.large};
  padding: ${({ theme }) => theme.space['4']};
`

export const Demo = () => {
  const [tabState, setTabState] = useState<number | string>(1)
  const [radioState, setRadioState] = useState<number | string>('option-1')
  const [buttonLoading, setButtonLoading] = useState(false)
  const [switchState, setSwitchState] = useState<'downgrade' | 'upgrade'>(
    'downgrade',
  )
  const [selectableCardState, setSelectableCardState] = useState('option-1')

  return (
    <Container>
      <Row templateColumns="1fr 1fr" gap={2}>
        <Stack gap={2}>
          <Tabs
            selected={tabState}
            onChange={(e: number | string) => setTabState(e)}
          >
            <Tabs.Tab value={1}>UI</Tabs.Tab>
            <Tabs.Tab value={2}>Form</Tabs.Tab>
            <Tabs.Tab value={3}>Icons</Tabs.Tab>
            <Tabs.Tab value={4}>Core</Tabs.Tab>
          </Tabs>
          <Card>
            <Stack gap={2}>
              <Stack>
                <Text variant="bodySmall" as="small" prominence="weak">
                  21.08.2023
                </Text>
                <Stack direction="row" alignItems="center" gap={1}>
                  <Status sentiment="info" animated />
                  <Text variant="heading" as="span">
                    Update soon available
                  </Text>
                </Stack>
              </Stack>
              <Text variant="body" as="p">
                A new major version of Ultraviolet is coming soon. It will
                include a lot of new features and improvements.&nbsp;
                <Link href="https://scaleway.com" target="_blank">
                  Learn more
                </Link>
              </Text>
              <Checkbox name="valid" checked required>
                I accept terms and conditions
              </Checkbox>
              <Row templateColumns="1fr 1fr" gap={2}>
                <Button sentiment="neutral" variant="outlined">
                  Install Later
                </Button>
                <Button
                  sentiment="primary"
                  isLoading={buttonLoading}
                  onClick={() => {
                    setButtonLoading(true)
                    setTimeout(() => {
                      setButtonLoading(false)
                    }, 2000)
                  }}
                >
                  Install
                </Button>
              </Row>
            </Stack>
          </Card>
          <StyledStepper selected={1}>
            <span>Initialize</span>
            <span>Create</span>
            <span>Done</span>
          </StyledStepper>
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
              name="toggle"
              label="Automatically update newest version of Ultraviolet UI"
              checked
            />
          </Card>
          <Card>
            <StyledStepList>
              <StepList.Item
                bulletContent={<CheckIcon />}
                sentiment="success"
                size="small"
              >
                Registration completed
              </StepList.Item>
              <StepList.Item
                bulletContent={<ClockOutlineIcon />}
                size="small"
                sentiment="info"
              >
                You have 10 days of trial
              </StepList.Item>
            </StyledStepList>
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
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                gap={1}
              >
                <Stack direction="row" alignItems="center" gap={2}>
                  <AvatarV2 variant="text" text="MA" shape="circle" />
                  <StyledStack>
                    <Text variant="bodySmall" as="span" sentiment="primary">
                      Review from Marc - 2 days ago
                    </Text>
                    <Text variant="body" as="span">
                      Ultraviolet is the best UI library I...
                    </Text>
                  </StyledStack>
                </Stack>
                <Button sentiment="neutral" variant="ghost" size="small">
                  <ArrowRightIcon />
                </Button>
              </Stack>
            </Card>
            <Card>
              <Stack gap={2}>
                <SwitchButton
                  name="switch-version"
                  value={switchState}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setSwitchState(
                      event.target.value as 'downgrade' | 'upgrade',
                    )
                  }
                  leftButton={{ label: 'Downgrade', value: 'downgrade' }}
                  rightButton={{ label: 'Upgrade', value: 'upgrade' }}
                />
                <RadioGroup
                  legend={`${switchState
                    .charAt(0)
                    .toUpperCase()}${switchState.slice(
                    1,
                  )} to a previous version:`}
                  name="downgrade"
                  value={radioState}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setRadioState(event.target.value)
                  }
                >
                  <RadioGroup.Radio
                    value="option-1"
                    name="option-1"
                    label="Version 1.3.0"
                  />
                  <RadioGroup.Radio
                    value="option-2"
                    name="option-2"
                    label="Version 1.2.0"
                  />
                  <RadioGroup.Radio
                    value="option-3"
                    name="option-3"
                    label="Version 1.1.0"
                  />
                </RadioGroup>
              </Stack>
            </Card>
            <Row templateColumns="1fr 1fr" gap={1}>
              <SelectableCard
                value="option-1"
                checked={selectableCardState === 'option-1'}
                onChange={event =>
                  setSelectableCardState(event.currentTarget.value)
                }
                label="Update Automatically"
              />
              <SelectableCard
                value="option-2"
                checked={selectableCardState === 'option-2'}
                onChange={event =>
                  setSelectableCardState(event.currentTarget.value)
                }
                label="Update Manually"
              />
            </Row>
          </Stack>
        </Stack>
      </Row>
    </Container>
  )
}
