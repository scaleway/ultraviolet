import { useTheme } from '@ultraviolet/themes'
import type { ComponentProps } from 'react'
import { Link } from '..'
import { Stack } from '../../../Layout/Stack'
import { SENTIMENTS } from '../constants'

export const Prominence = (props: ComponentProps<typeof Link>) => {
  const theme = useTheme()

  return (
    <Stack width="300px">
      <Stack direction="row" gap={2} style={{ background: theme.colors.neutral.background, padding: '1rem' }}>
        <Link {...props} prominence="default">
          Default
        </Link>
        <Link prominence="default" target="_blank">
          External
        </Link>
      </Stack>
      <Stack direction="row" gap={2} style={{ background: theme.colors.neutral.backgroundStronger, padding: '1rem' }}>
        <Link {...props} prominence="strong">
          Default
        </Link>
        <Link prominence="strong" target="_blank">
          External
        </Link>
      </Stack>

      <Stack direction={'row'}>
        {SENTIMENTS.map(sentiment => (
          <Stack
            key={sentiment}
            style={{ background: (theme.colors[sentiment] as any).backgroundStrong, padding: theme.space[2] }}
          >
            <Link key={sentiment} sentiment={sentiment} {...props}>
              {sentiment}
            </Link>
          </Stack>
        ))}
      </Stack>
    </Stack>
  )
}

Prominence.args = {
  prominence: 'strong',
}

Prominence.parameters = {
  docs: {
    description: {
      story: 'On a dark background, use `prominence="strong"` to make the link visible.',
    },
  },
}
