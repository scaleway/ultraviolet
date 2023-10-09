import type { StoryFn } from '@storybook/react'
import { Row, Stack, Text } from '@ultraviolet/ui'
import assets from '../index'

export const List: StoryFn = () => (
  <Row templateColumns="repeat(3, 1fr)">
    {(Object.keys(assets) as (keyof typeof assets)[]).map(productName => (
      <>
        {(
          Object.keys(
            assets[productName],
          ) as (keyof (typeof assets)[typeof productName])[]
        ).map(type => (
          <Stack direction="row" gap={1} alignItems="center">
            <img
              height={80}
              src={assets[productName][type]}
              alt={`${productName}-${type}`}
            />
            <Text as="span" variant="bodyStrong">
              {productName}/{type}
            </Text>
          </Stack>
        ))}
      </>
    ))}
  </Row>
)
