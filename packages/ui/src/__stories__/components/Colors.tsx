import { useTheme } from '@ultraviolet/themes'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import { Row } from '../../components'
import { Card } from '../../components/Card'
import { Separator } from '../../components/Separator'
import { Stack } from '../../components/Stack'
import { Text } from '../../components/Text'
import type lightTheme from '../../theme'
import type { Color } from '../../theme'
import {
  capitalizedText,
  card,
  computedBackground,
  noMarginText,
  paddingCard,
  separator,
} from './styles.css'
import ThemeWrapper from './ThemeWrapper'

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
            <Text
              as="h3"
              className={capitalizedText}
              variant="headingSmallStrong"
            >
              {sentiment}
            </Text>
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

                      <Card
                        className={`${card} ${paddingCard.default}`}
                        key={context}
                        style={assignInlineVars({
                          [computedBackground]:
                            theme.colors[sentiment][context],
                        })}
                      >
                        {' '}
                      </Card>
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
                      <Card
                        className={`${card} ${paddingCard.default}`}
                        style={assignInlineVars({
                          [computedBackground]:
                            theme.colors[sentiment][context],
                        })}
                      >
                        {' '}
                      </Card>
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
                      <Card
                        className={`${card} ${paddingCard.default}`}
                        style={assignInlineVars({
                          [computedBackground]:
                            theme.colors[sentiment][context],
                        })}
                      >
                        {' '}
                      </Card>
                    </Stack>
                  ))}
              </Stack>
            </Row>
            <Separator className={separator} />
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
                <Card
                  className={`${card} ${paddingCard.default}`}
                  style={assignInlineVars({
                    [computedBackground]: dataColors[data],
                  })}
                >
                  {' '}
                </Card>
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
                  ).map(background => {
                    // @ts-expect-error can't infer properly
                    const gradient = gradientBackgroundColors[type][
                      background
                    ].replace(/;$/, '')

                    return (
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
                        <Card
                          className={`${card} ${paddingCard.large}`}
                          style={{
                            ...assignInlineVars({
                              [computedBackground]: gradient as string,
                            }),
                          }}
                        >
                          {' '}
                        </Card>
                      </Stack>
                    )
                  })}
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
                        <Text
                          as="h4"
                          className={noMarginText}
                          variant="bodyStrong"
                        >
                          {sentiment}
                        </Text>
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
                                <Text
                                  as="p"
                                  className={noMarginText}
                                  variant="body"
                                >
                                  {value}
                                </Text>
                                <Text as="small" variant="caption">
                                  {
                                    // @ts-expect-error can't infer properly
                                    iconColors[type][sentiment][value]
                                  }
                                </Text>
                              </Stack>
                              <Card
                                className={`${card} ${paddingCard.default}`}
                                style={assignInlineVars({
                                  [computedBackground]:
                                    // @ts-expect-error can't infer properly
                                    iconColors[type][sentiment][value],
                                })}
                              >
                                {' '}
                              </Card>
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
