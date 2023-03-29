import type { ComponentStory } from '@storybook/react'
import { Fragment } from 'react'
import { ButtonV2, buttonVariants } from '..'
import { Stack, Table, Text } from '../..'
import { SENTIMENTS } from '../../../theme'

export const ShowcaseTemp: ComponentStory<typeof ButtonV2> = () => {
  const onClick = () => {}

  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.HeadCell width="120px" />
          {buttonVariants.map(variant => (
            <Table.HeadCell key={variant}>
              <Text as="span" variant="bodyStrong">
                {variant.toUpperCase()} (& Disabled)
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
              <Fragment key={variant}>
                <Table.BodyCell>
                  <Stack direction="row" gap={2}>
                    <ButtonV2
                      onClick={onClick}
                      variant={variant}
                      sentiment={sentiment}
                    >
                      Button
                    </ButtonV2>
                    <ButtonV2
                      disabled
                      onClick={onClick}
                      variant={variant}
                      sentiment={sentiment}
                    >
                      Button
                    </ButtonV2>
                  </Stack>
                </Table.BodyCell>
              </Fragment>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

ShowcaseTemp.parameters = {
  docs: {
    storyDescription: 'For review purpose only.',
  },
}
