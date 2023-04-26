import type { ComponentStory } from '@storybook/react'
import { ButtonV2, buttonVariants } from '..'
import { Stack, Table, Text } from '../..'
import { SENTIMENTS } from '../../../theme'

export const Showcase: ComponentStory<typeof ButtonV2> = () => {
  const onClick = () => {}

  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.HeadCell width="120px" />
          {buttonVariants.map(variant => (
            <Table.HeadCell key={variant}>
              <Text as="span" variant="bodyStrong">
                {variant.toUpperCase()}
              </Text>
            </Table.HeadCell>
          ))}
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {SENTIMENTS.map(sentiment => (
          <Table.Row key={sentiment}>
            <Table.BodyCell>
              <Text as="span" variant="bodyStrong">
                {sentiment.toUpperCase()}
              </Text>
            </Table.BodyCell>
            {buttonVariants.map(variant => (
              <Table.BodyCell key={variant}>
                <Stack direction="row" gap={2}>
                  <ButtonV2
                    onClick={onClick}
                    variant={variant}
                    sentiment={sentiment}
                  >
                    Button
                  </ButtonV2>
                </Stack>
              </Table.BodyCell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}
