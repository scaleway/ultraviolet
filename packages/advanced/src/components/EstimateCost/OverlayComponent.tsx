import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { useI18n } from '@scaleway/use-i18n'
import { Badge, Icon, Stack } from '@ultraviolet/ui'
import type { ReactNode } from 'react'
import { Children, cloneElement, useMemo } from 'react'
import flattenChildren from 'react-flatten-children'
import { LineThrough } from './LineThrough'
import { OverlayContextProvider } from './OverlayContext'
import { Strong } from './Strong'
import { styles } from './componentStyle'
import { maximumFractionDigits, multiplier } from './constants'
import type { Units } from './types'
import { useEstimateCost } from './EstimateCostProvider'

const OverlayContainer = styled.div<{ inView?: boolean }>`
  position: fixed;
  z-index: 999;
  left: 0;
  right: 0;
  bottom: ${({ inView }) => (inView ? -120 : 0)}px;
  height: 120px;
  background-color: ${({ theme }) => theme.colors.neutral.background};
  margin: 0 0 0 200px;
  display: flex;
  justify-content: center;
  box-shadow: ${({ inView, theme }) =>
    inView ? '0' : theme.shadows.defaultShadow};
  transition:
    bottom 0.3s,
    box-shadow 0.3s;
`

const List = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 24px 0;
`

const SideItem = styled.li`
  display: flex;
  padding: 12px 0;
  min-width: 158px;
`

type OverlayComponentProps = {
  children: ReactNode
  disableOverlayLeft?: boolean
  disableOverlayRight?: boolean
  discount?: number
  inView?: boolean
  isBeta?: boolean
  unit: Units
  OverlayLeft?: (props: {
    children: ReactNode
    disabled?: boolean
  }) => JSX.Element
  OverlayRight?: (props: {
    children?: ReactNode
    disabled?: boolean
  }) => JSX.Element
  totalPrice: {
    maxOverlayHourly: number
    overlayHourly: number
  }
}

export const OverlayComponent = ({
  children,
  inView = false,
  discount = 1,
  OverlayRight,
  disableOverlayRight = false,
  OverlayLeft,
  disableOverlayLeft = false,
  totalPrice,
  unit = 'hours',
  isBeta = false,
}: OverlayComponentProps) => {
  const { formatNumber } = useI18n()
  const { t } = useEstimateCost()

  const theme = useTheme()
  const value = useMemo(() => ({ isOverlay: true }), [])
  const list = flattenChildren(children)

  const totalOverlayPrice = {
    days: totalPrice.maxOverlayHourly * multiplier.days,
    hours: totalPrice.maxOverlayHourly,
    minutes: totalPrice.maxOverlayHourly * multiplier.minutes,
    seconds: totalPrice.maxOverlayHourly * multiplier.seconds,
    months: totalPrice.maxOverlayHourly * multiplier.months,
  }[unit]

  const overlayPrice = {
    days: totalPrice.overlayHourly * multiplier.days,
    hours: totalPrice.overlayHourly,
    minutes: totalPrice.overlayHourly * multiplier.minutes,
    seconds: totalPrice.overlayHourly * multiplier.seconds,
    months: totalPrice.overlayHourly * multiplier.months,
  }[unit]

  return (
    <OverlayContextProvider value={value}>
      <OverlayContainer inView={inView} data-testid="summary-overlay">
        <List>
          {OverlayLeft ? (
            <SideItem>
              <OverlayLeft disabled={disableOverlayLeft}>
                {t('estimate.cost.submit.label')}
              </OverlayLeft>
            </SideItem>
          ) : null}
          {Children.map(list, (child, index) =>
            /* @ts-expect-error I'm too dumb to understand this sorcery */
            cloneElement(child, {
              isFirstElement: index === 0,
              isLastElement: index === list.length - 1,
            }),
          )}
          <li css={styles.overlayElement({ theme })}>
            <Stack direction="row" alignItems="center" gap={1}>
              <Icon name="calculator" color="primary" size={20} />
              {t('estimate.cost.label')}
            </Stack>
            <div css={styles.itemResourceName(false)}>
              <Strong variant="big">
                <LineThrough isActive={isBeta && discount === 0}>
                  {formatNumber(overlayPrice, {
                    style: 'currency',
                    currency: 'EUR',
                    maximumFractionDigits: maximumFractionDigits[unit],
                  })}
                  {totalOverlayPrice > 0
                    ? ` - ${formatNumber(totalOverlayPrice, {
                        style: 'currency',
                        currency: 'EUR',
                        maximumFractionDigits: maximumFractionDigits[unit],
                      })}`
                    : null}
                  /{t(`estimate.cost.units.${unit}.label`, { count: 1 })}
                </LineThrough>
              </Strong>
              {isBeta ? (
                <Badge
                  prominence="strong"
                  css={styles.badge}
                  sentiment="warning"
                >
                  {t(
                    `estimate.cost.beta.${discount > 0 ? 'discount' : 'free'}`,
                    {
                      amount: discount * 100,
                    },
                  )}
                </Badge>
              ) : null}
            </div>
          </li>
          {OverlayRight ? (
            <SideItem>
              <OverlayRight disabled={disableOverlayRight}>
                {t('estimate.cost.submit.label')}
              </OverlayRight>
            </SideItem>
          ) : null}
        </List>
      </OverlayContainer>
    </OverlayContextProvider>
  )
}
