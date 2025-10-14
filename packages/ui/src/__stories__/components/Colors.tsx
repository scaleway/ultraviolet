import styled from '@emotion/styled'
import { useTheme } from '@ultraviolet/themes'
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
      <Text as="h2" variant="heading">
        Sentiments
      </Text>
      {filteredColors.map(sentiment => {
        const colorContextKeys = Object.keys(
          theme.colors[sentiment],
        ) as AvailableContexts[]

        return (
          <Stack gap={1} key={sentiment}>
            <CapitalizedText as="h3" variant="headingSmallStrong">
              {sentiment}
            </CapitalizedText>
            <Row gap={2} templateColumns="repeat(3, 1fr)">
              <Stack direction="column" gap={2}>
                {colorContextKeys
                  .filter(context => context.includes('background'))
                  .map(context => (
                    <Stack key={context}>
                      <Stack
                        alignItems="center"
                        direction="row"
                        justifyContent="space-between"
                      >
                        <Text as="p" variant="body">
                          {context}
                        </Text>
                        <Text as="small" variant="caption">
                          {theme.colors[sentiment][context]}
                        </Text>
                      </Stack>

                      <StyledCard
                        context={context}
                        key={context}
                        sentiment={sentiment}
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
                        alignItems="center"
                        direction="row"
                        justifyContent="space-between"
                      >
                        <Text as="p" variant="body">
                          {context}
                        </Text>
                        <Text as="small" variant="caption">
                          {theme.colors[sentiment][context]}
                        </Text>
                      </Stack>
                      <StyledCard context={context} sentiment={sentiment}>
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
                        alignItems="center"
                        direction="row"
                        justifyContent="space-between"
                      >
                        <Text as="p" variant="body">
                          {context}
                        </Text>
                        <Text as="small" variant="caption">
                          {theme.colors[sentiment][context]}
                        </Text>
                      </Stack>
                      <StyledCard context={context} sentiment={sentiment}>
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
        <Text as="h2" variant="heading">
          Other
        </Text>
        <Text as="h3" variant="headingSmall">
          Data
        </Text>
        <Row gap={2} templateColumns="repeat(3, 1fr)">
          {(Object.keys(dataColors) as (keyof typeof dataColors)[]).map(
            data => (
              <Stack key={dataColors[data]}>
                <Stack
                  alignItems="center"
                  direction="row"
                  justifyContent="space-between"
                >
                  <Text as="p" variant="body">
                    {data}
                  </Text>
                  <Text as="small" variant="caption">
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
        <Text as="h3" variant="headingSmall">
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
                <Row gap={2} templateColumns="repeat(3, 1fr)">
                  {Object.keys(
                    gradientBackgroundColors[
                      type as keyof typeof gradientBackgroundColors
                    ],
                  ).map(background => (
                    <Stack key={background}>
                      <Stack
                        alignItems="center"
                        direction="row"
                        justifyContent="space-between"
                      >
                        <Text as="p" variant="body">
                          {background}
                        </Text>
                      </Stack>
                      <StyledCard
                        color={
                          // @ts-expect-error can't infer properly
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
        <Text as="h3" variant="headingSmall">
          Icon
        </Text>
        <Stack gap={3}>
          {Object.keys(iconColors).map(type => (
            <Stack key={type}>
              <Stack direction="column">
                <Text as="h4" variant="bodyStronger">
                  {type}
                </Text>
                <Stack gap={3}>
                  {Object.keys(iconColors[type as keyof typeof iconColors]).map(
                    sentiment => (
                      <Stack direction="column" key={sentiment}>
                        <NoMarginText as="h4" variant="bodyStrong">
                          {sentiment}
                        </NoMarginText>
                        <Row gap={2} templateColumns="repeat(3, 1fr)">
                          {Object.keys(
                            // @ts-expect-error can't infer properly
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                            iconColors[type][sentiment],
                          ).map(value => (
                            <Stack gap={1} key={value}>
                              <Stack
                                alignItems="center"
                                direction="row"
                                justifyContent="space-between"
                              >
                                <NoMarginText as="p" variant="body">
                                  {value}
                                </NoMarginText>
                                <Text as="small" variant="caption">
                                  {
                                    // @ts-expect-error can't infer properly

                                    iconColors[type][sentiment][value]
                                  }
                                </Text>
                              </Stack>
                              <StyledCard
                                color={
                                  // @ts-expect-error can't infer properly
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
