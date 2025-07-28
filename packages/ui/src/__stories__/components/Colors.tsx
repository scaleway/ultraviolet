import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { Row } from '../../components'
import { Card } from '../../components/Card'
import { Separator } from '../../components/Separator'
import { Stack } from '../../components/Stack'
import { Text } from '../../components/Text'
import type lightTheme from '../../theme'
import type { Color } from '../../theme'
import ThemeWrapper from './ThemeWrapper'

const StyledSeparator = styled(Separator)`
  margin: ${({ theme }) => `${theme.space['3']} 0`};
`

const CapitalizedText = styled(Text)`
  text-transform: capitalize;
`

const NoMarginText = styled(Text)`
  margin: 0;
`

const StyledCard = styled(Card, {
  shouldForwardProp: prop =>
    !['sentiment', 'context', 'color', 'padding'].includes(prop),
})<{
  sentiment?: Color
  color?: string
  context: keyof (typeof lightTheme)['colors'][Color]
  padding?: string
}>`
  align-items: center;
  background: ${({ sentiment, context, theme, color }) =>
    sentiment ? theme.colors[sentiment][context] : color};
  display: flex;
  justify-content: space-between;
  padding: ${({ padding }) => padding ?? '8px'};
  width: 100%;
`

type AvailableContexts = keyof (typeof lightTheme)['colors'][Color]

const Colors = () => {
  const theme = useTheme()

  const filteredColors = Object.keys(theme.colors).filter(
    color => !['other', 'overlay'].includes(color),
  ) as Color[]

  const dataColors = theme.colors.other.data.charts
  const iconColors = theme.colors.other.icon
  const gradientBackgroundColors = theme.colors.other.gradients.background

  return (
    <Stack gap={2}>
      <Text variant="heading" as="h2">
        Sentiments
      </Text>
      {filteredColors.map(sentiment => {
        const colorContextKeys = Object.keys(
          theme.colors[sentiment],
        ) as AvailableContexts[]

        return (
          <Stack key={sentiment} gap={1}>
            <CapitalizedText variant="headingSmallStrong" as="h3">
              {sentiment}
            </CapitalizedText>
            <Row templateColumns="repeat(3, 1fr)" gap={2}>
              <Stack direction="column" gap={2}>
                {colorContextKeys
                  .filter(context => context.includes('background'))
                  .map(context => (
                    <Stack key={context}>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Text variant="body" as="p">
                          {context}
                        </Text>
                        <Text variant="caption" as="small">
                          {theme.colors[sentiment][context]}
                        </Text>
                      </Stack>

                      <StyledCard
                        key={context}
                        sentiment={sentiment}
                        context={context}
                      >
                        {' '}
                      </StyledCard>
                    </Stack>
                  ))}
              </Stack>
              <Stack direction="column" gap={2}>
                {colorContextKeys
                  .filter(context => context.includes('text'))
                  .map(context => (
                    <Stack key={context}>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Text variant="body" as="p">
                          {context}
                        </Text>
                        <Text variant="caption" as="small">
                          {theme.colors[sentiment][context]}
                        </Text>
                      </Stack>
                      <StyledCard sentiment={sentiment} context={context}>
                        {' '}
                      </StyledCard>
                    </Stack>
                  ))}
              </Stack>
              <Stack direction="column" gap={2}>
                {colorContextKeys
                  .filter(context => context.includes('border'))
                  .map(context => (
                    <Stack key={context}>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Text variant="body" as="p">
                          {context}
                        </Text>
                        <Text variant="caption" as="small">
                          {theme.colors[sentiment][context]}
                        </Text>
                      </Stack>
                      <StyledCard sentiment={sentiment} context={context}>
                        {' '}
                      </StyledCard>
                    </Stack>
                  ))}
              </Stack>
            </Row>
            <StyledSeparator />
          </Stack>
        )
      })}

      <Stack gap={2}>
        <Text variant="heading" as="h2">
          Other
        </Text>
        <Text variant="headingSmall" as="h3">
          Data
        </Text>
        <Row templateColumns="repeat(3, 1fr)" gap={2}>
          {(Object.keys(dataColors) as (keyof typeof dataColors)[]).map(
            data => (
              <Stack key={dataColors[data]}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Text variant="body" as="p">
                    {data}
                  </Text>
                  <Text variant="caption" as="small">
                    {dataColors[data]}
                  </Text>
                </Stack>
                <StyledCard color={dataColors[data]} context="background">
                  {' '}
                </StyledCard>
              </Stack>
            ),
          )}
        </Row>
        <Text variant="headingSmall" as="h3">
          Gradients
        </Text>
        <Stack direction="column" gap={2}>
          {Object.keys(gradientBackgroundColors)
            .filter(
              background =>
                ![
                  'gold',
                  'purple',
                  'strong',
                  'accent',
                  'aqua',
                  'blue',
                  'emerald',
                  'fuschia',
                  'magenta',
                  'primary',
                ].includes(background),
            )
            .map(type => (
              <Stack key={type}>
                <Text as="h4" variant="bodyStrong">
                  {type}
                </Text>
                <Row templateColumns="repeat(3, 1fr)" gap={2}>
                  {Object.keys(
                    gradientBackgroundColors[
                      type as keyof typeof gradientBackgroundColors
                    ],
                  ).map(background => (
                    <Stack key={background}>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Text variant="body" as="p">
                          {background}
                        </Text>
                      </Stack>
                      <StyledCard
                        color={
                          // @ts-expect-error can't infer properly
                          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                          gradientBackgroundColors[type][background]
                        }
                        context="background"
                        padding="32px"
                      >
                        {' '}
                      </StyledCard>
                    </Stack>
                  ))}
                </Row>
              </Stack>
            ))}
        </Stack>
        <Text variant="headingSmall" as="h3">
          Icon
        </Text>
        <Stack gap={3}>
          {Object.keys(iconColors).map(type => (
            <Stack key={type}>
              <Stack direction="column">
                <Text variant="bodyStronger" as="h4">
                  {type}
                </Text>
                <Stack gap={3}>
                  {Object.keys(iconColors[type as keyof typeof iconColors]).map(
                    sentiment => (
                      <Stack key={sentiment} direction="column">
                        <NoMarginText variant="bodyStrong" as="h4">
                          {sentiment}
                        </NoMarginText>
                        <Row templateColumns="repeat(3, 1fr)" gap={2}>
                          {Object.keys(
                            // @ts-expect-error can't infer properly
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                            iconColors[type][sentiment],
                          ).map(value => (
                            <Stack key={value} gap={1}>
                              <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                              >
                                <NoMarginText variant="body" as="p">
                                  {value}
                                </NoMarginText>
                                <Text variant="caption" as="small">
                                  {
                                    // @ts-expect-error can't infer properly

                                    iconColors[type][sentiment][value]
                                  }
                                </Text>
                              </Stack>
                              <StyledCard
                                color={
                                  // @ts-expect-error can't infer properly
                                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                                  iconColors[type][sentiment][value]
                                }
                                context="background"
                              >
                                {' '}
                              </StyledCard>
                            </Stack>
                          ))}
                        </Row>
                      </Stack>
                    ),
                  )}
                </Stack>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Stack>
  )
}

const Container = () => (
  <ThemeWrapper>
    <Colors />
  </ThemeWrapper>
)

export default Container
