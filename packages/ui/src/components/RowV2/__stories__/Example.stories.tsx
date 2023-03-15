import type { Story } from '@storybook/react'
import { RowV2 } from '..'
import { Container, Separator, Stack, Status, Text } from '../..'

export const Example: Story = () => (
  <Container title="Overview">
    <Stack gap={2}>
      <RowV2 templateColumns="repeat(4, 1fr)">
        <Stack>
          <Text as="span" variant="bodyStrong">
            Status
          </Text>
          <Stack direction="row" gap={1} alignItems="center">
            <Status variant="success" />
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
      </RowV2>
      <Separator />
      <RowV2 templateColumns="repeat(2, 1fr)">
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
      </RowV2>
      <Separator />
      <RowV2 templateColumns="repeat(3, 1fr)">
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
      </RowV2>
    </Stack>
  </Container>
)
