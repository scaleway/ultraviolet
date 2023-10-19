import type { StoryFn } from '@storybook/react'
import { Row, Stack, Text } from '@ultraviolet/ui'
import assets from '../index'

export const List: StoryFn = () => (
  <Row templateColumns="repeat(3, 1fr)">
    {(Object.keys(assets) as (keyof typeof assets)[]).map(productName => (
      <Stack direction="row" gap={1} alignItems="center">
        <img height={80} src={assets[productName]} alt={productName} />
        <Text as="span" variant="bodyStrong">
          {productName}
        </Text>
      </Stack>
    ))}
  </Row>
)
