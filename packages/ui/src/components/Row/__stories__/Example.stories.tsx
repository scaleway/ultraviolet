import type { StoryFn } from '@storybook/react-vite'
import { Row } from '..'
import { Card, Separator, Stack, Status, Text } from '../..'

export const Example: StoryFn = args => (
  <Card header="Overview">
    <Stack gap={2}>
      <Row {...args} templateColumns="repeat(4, 1fr)" gap={2}>
        <Stack>
          <Text as="span" variant="bodyStrong">
            Status
          </Text>
          <Stack direction="row" gap={1} alignItems="center">
            <Status sentiment="success" />
            <Text as="span" variant="body">
              Running
            </Text>
          </Stack>
        </Stack>
        <Stack>
          <Text as="div" variant="bodyStrong">
            Type
          </Text>
          <Text as="div" variant="body">
            PRO2-S
          </Text>
        </Stack>
        <Stack>
          <Text as="div" variant="bodyStrong">
            From image
          </Text>
          <Text as="div" variant="body">
            None
          </Text>
        </Stack>
        <Stack>
          <Text as="div" variant="bodyStrong">
            Volumes
          </Text>
          <Text as="div" variant="body">
            2
          </Text>
        </Stack>
      </Row>
      <Separator />
      <Row {...args} templateColumns="repeat(2, 1fr)" gap={2}>
        <Stack>
          <Stack direction="row" gap={2}>
            <Text as="span" variant="bodyStrong">
              Image ID
            </Text>
            <Text as="span" variant="body">
              000000-111111-2222222-333333
            </Text>
          </Stack>
        </Stack>
        <Stack>
          <Stack direction="row" gap={2}>
            <Text as="span" variant="bodyStrong">
              Image ID
            </Text>
            <Text as="span" variant="body">
              000000-111111-2222222-333333
            </Text>
          </Stack>
        </Stack>
      </Row>
      <Separator />
      <Row {...args} templateColumns="repeat(3, 1fr)" gap={2}>
        <div>
          <Text as="div" variant="bodyStrong">
            IPV6
          </Text>
          <Text as="div" variant="body">
            febf:ffff:ffff:ffff:ffff:ffff
          </Text>
        </div>
        <div>
          <Text as="div" variant="bodyStrong">
            Gateway
          </Text>
          <Text as="div" variant="body">
            febf:ffff:ffff:ffff
          </Text>
        </div>
        <div>
          <Text as="div" variant="bodyStrong">
            Netmask
          </Text>
          <Text as="div" variant="body">
            64
          </Text>
        </div>
      </Row>
    </Stack>
  </Card>
)
