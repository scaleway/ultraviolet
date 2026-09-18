import { useTheme } from '@ultraviolet/themes'
import type { ComponentProps } from 'react'
import { Link } from '..'
import { Row } from '../../../Layout/Row'
import { Stack } from '../../../Layout/Stack'
import { Text } from '../../../Typography/Text'
import { SENTIMENTS } from '../constants'

export const Prominence = ({ prominence, ...props }: ComponentProps<typeof Link>) => {
  const theme = useTheme()

  return (
    <Stack width="300px">
      <Row templateColumns={'10ch repeat(6, 12ch)'} alignItems={'center'}>
        <Text as="span" variant="body">
          Default
        </Text>

        {SENTIMENTS.map(sentiment => (
          <Stack key={sentiment} style={{ background: theme.colors[sentiment].background, padding: theme.space[2] }}>
            <Link key={sentiment} {...props} sentiment={sentiment}>
              {sentiment}
            </Link>
          </Stack>
        ))}
      </Row>

      <Row templateColumns={'10ch repeat(6, 12ch)'} alignItems={'center'}>
        <Text as="span" variant="body">
          Strong
        </Text>
        {SENTIMENTS.map(sentiment => (
          <Stack
            key={sentiment}
            style={{ background: theme.colors[sentiment].backgroundStrong, padding: theme.space[2] }}
          >
            <Link key={sentiment} {...props} sentiment={sentiment} prominence="strong">
              {sentiment}
            </Link>
          </Stack>
        ))}
      </Row>

      <Row templateColumns={'10ch repeat(2, 12ch)'} alignItems={'center'}>
        <Text as="span" variant="body">
          Stronger
        </Text>
        <Stack direction="row" gap={2} style={{ background: theme.colors.neutral.backgroundStronger, padding: '1rem' }}>
          <Link {...props} sentiment="neutral" prominence="stronger">
            neutral
          </Link>
        </Stack>
      </Row>
    </Stack>
  )
}

Prominence.parameters = {
  docs: {
    description: {
      story:
        'Set the `prominence` property to the same value as the background. `default` and `strong` are available with all sentiments, and `stronger` is available on sentiment `neutral` only.',
    },
  },
}
