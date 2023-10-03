import styled from '@emotion/styled'
import { useI18n } from '@scaleway/use-i18n'
import { Alert, Badge, Icon, Stack, Text } from '@ultraviolet/ui'
import type { ComponentProps, ReactNode } from 'react'
import { Children, cloneElement, useEffect, useMemo, useState } from 'react'
import flattenChildren from 'react-flatten-children'
import { useInView } from 'react-intersection-observer'
import { CustomUnitInput } from './CustomUnitInput'
import { Item } from './Item'
import { LineThrough } from './LineThrough'
import { NumberInput } from './NumberInput'
import { OverlayComponent } from './OverlayComponent'
import { OverlayContextProvider, useOverlay } from './OverlayContext'
import { Region } from './Region'
import { Regular } from './Regular'
import { Strong } from './Strong'
import { Unit } from './Unit'
import { Zone } from './Zone'
import { StyledFeesTable, StyledTable, styles } from './componentStyle'
import { maximumFractionDigits, maximumFractionDigitsLong } from './constants'
import { calculatePrice } from './helper'
import type {
  BareEstimateProduct,
  EstimateProduct,
  Iteration,
  Units,
} from './types'
import EstimateCostLocales from './locales/en'
import { EstimateCostProvider, useEstimateCost } from './EstimateCostProvider'

const FeesText = styled(Text)`
  margin-top: ${({ theme }) => theme.space['3']};
`

const StyledText = styled(Text)<{ isBeta?: boolean }>`
  text-align: right;
  ${({ isBeta, theme }) =>
    isBeta ? `margin-left: ${theme.space['2']};` : null}
`

const RightAlignedText = styled(Text)`
  text-align: right;
`

const MaxWidthText = styled(Text)<{ maxWidth?: number }>`
  max-width: ${({ maxWidth }) => maxWidth}px;
`

const StyledIcon = styled(Icon)`
  margin-right: ${({ theme }) => theme.space['1']};
`

type EstimateCostProps = {
  /**
   * Text to display into an alert on the top of the EstimateCost component.
   */
  alert?: ReactNode
  /**
   * Type of the alert defined by the Scaleway UI Alert component.
   */
  alertVariant?: ComponentProps<typeof Alert>['sentiment']
  children: ReactNode
  /**
   * Individual fees to display at the bottom of the EstimateCost component.
   */
  commitmentFees?: number
  /**
   * Content to display into the fees part, it can be any component but in order to have a consistent design, it is recommended to use `<EstimateCost.Regular>` and `<EstimateCost.Strong>` components.
   */
  commitmentFeesContent?: ReactNode
  /**
   * By default, a description exists but if you need you can customize it with this prop.
   */
  description?: ReactNode
  /**
   * Hide the floating estimate cost overlay shown in the bottom of the page.
   */
  hideOverlay?: boolean
  /**
   * Disable left button on the overlay.
   */
  disableOverlayLeft?: boolean
  /**
   * Disable right button (submit) on the overlay.
   */
  disableOverlayRight?: boolean
  /**
   * This is a global discount for all estimate cost, all sub items will be impacted by this discount.
   * The discount is a percentage, so 0.1 means 10% discount. Discount = 1 means 100% so it means free.
   * This is usually associate with beta products and prop `isBeta`.
   */
  discount?: number
  /**
   * The default time unit to select.
   */
  defaultTimeUnit?: Units
  /**
   * List of time unit the price can be calculated with. Can only be an array of `seconds`, `minutes`, `hours`, `days` or `months`.
   */
  timeUnits?: Units[]
  /**
   * Hide the selectable time unit on the top of the component.
   */
  hideTimeUnit?: boolean
  /**
   * Hide the total price at the bottom of the component.
   */
  hideTotal?: boolean
  /**
   * Show a badge beta on the total price with how much discount is applied.
   */
  isBeta?: boolean
  /**
   * It will display another individual line at the bottom of the component with a monthly price. It can be used when you display hourly price, but you have one or many items that are billed monthly.
   */
  monthlyFees?: number
  /**
   * Content to display into monthly fees part, it can be any component but in order to have a consistent design, it is recommended to use `<EstimateCost.Regular>` and `<EstimateCost.Strong>` components.
   */
  monthlyFeesContent?: ReactNode
  /**
   * Label of the item, it describes what kind of fees is related to. (ex: "Installation fee")
   */
  monthlyFeesLabel?: string
  /**
   * Content that will be shown on the left side of the overlay.
   */
  OverlayLeft?: (props: {
    children: ReactNode
    disabled?: boolean
  }) => JSX.Element
  /**
   * Content that will be shown on the left side of the overlay.
   */
  OverlayRight?: (props: {
    children?: ReactNode
    disabled?: boolean
  }) => JSX.Element
  /**
   * Time unit to use on the overlay. It can be different from estimate cost.
   */
  overlayUnit?: Units
  /**
   * Locales for the component. By default, it will use the english locales.
   */
  locales?: typeof EstimateCostLocales
}

const DEFAULT_UNIT_LIST: Units[] = ['hours', 'days', 'months']

const EstimateCostContent = ({
  description,
  alert,
  alertVariant = 'warning',
  defaultTimeUnit = 'hours',
  timeUnits = DEFAULT_UNIT_LIST,
  hideOverlay = false,
  disableOverlayLeft = false,
  disableOverlayRight = false,
  hideTimeUnit = false,
  hideTotal = false,
  discount = 0,
  OverlayRight,
  OverlayLeft,
  isBeta = false,
  commitmentFees,
  commitmentFeesContent,
  monthlyFees,
  monthlyFeesLabel,
  monthlyFeesContent,
  overlayUnit = 'hours',
  children = null,
}: EstimateCostProps) => {
  const { formatNumber } = useI18n()
  const { t } = useEstimateCost()
  const [ref, inView] = useInView()
  const [products, setProducts] = useState<EstimateProduct[]>([]) // product is used to store each items with their price and amount
  const [totalPrice, setTotalPrice] = useState({
    overlayHourly: 0,
    maxOverlayHourly: 0,
    hourly: 0,
    maxHourly: 0,
    total: 0,
    maxTotal: 0,
  })
  const [iteration, setIteration] = useState<Iteration>({
    value: 1,
    unit: defaultTimeUnit ?? 'hours',
  })

  const [isLongFractionDigits, setIsLongFractionDigits] = useState(false)
  const providerValue = useMemo(() => ({ isOverlay: false }), [])
  const list = flattenChildren(children)

  const productsCallback = useMemo(
    () => ({
      add: (newProduct: EstimateProduct) => {
        setProducts(total => {
          if (total.find(product => product.id === newProduct.id)) {
            return total.map(product =>
              product.id === newProduct.id ? newProduct : product,
            )
          }

          return [...total, newProduct]
        })
      },

      remove: ({ id }: BareEstimateProduct) => {
        setProducts(total => total.filter(product => product.id !== id))
      },
    }),
    [setProducts],
  )

  useEffect(() => {
    // this variable check if there is a maxAmount in each product
    // if not we do not need to calculate maxTotal, maxHourly, maxOverlayHourly
    const isMaxAmountInProducts = products.find(product => product.maxAmount)
    setIsLongFractionDigits(
      !!products.find(product => product.longFractionDigits),
    )
    setTotalPrice({
      total: !hideTotal
        ? products.reduce(
            (acc, product) =>
              acc +
              calculatePrice({
                price: product.price,
                amount: product.amount,
                amountFree: product.amountFree,
                timeUnit: product.noIteration ? 'hours' : iteration.unit,
                timeAmount: product.noIteration ? 1 : iteration.value,
                discount: product.discount,
              }),
            0,
          )
        : 0,
      maxTotal: isMaxAmountInProducts
        ? products.reduce(
            (acc, product) =>
              acc +
              calculatePrice({
                price: product.price,
                amount: product.maxAmount || product.amount, // Not all products have maxAmount, so we need to check both
                amountFree: product.amountFree,
                timeUnit: product.noIteration ? 'hours' : iteration.unit,
                timeAmount: product.noIteration ? 1 : iteration.value,
                discount: product.discount,
              }),
            0,
          )
        : 0,
      hourly: products.reduce(
        (acc, product) =>
          acc +
          (product.noIteration
            ? 0
            : (product.price - product.price * product.discount) *
              Math.max(product.amount - product.amountFree, 0)),
        0,
      ),
      maxHourly: isMaxAmountInProducts
        ? products.reduce(
            (acc, product) =>
              acc && product.noIteration
                ? 0
                : (product.price - product.price * product.discount) *
                  Math.max(product.maxAmount - product.amountFree, 0),

            0,
          )
        : 0,
      overlayHourly: products.reduce(
        (acc, product) =>
          acc +
          (product.noIteration
            ? 0
            : (product.price - product.price * product.discount) *
              Math.max(product.amount - product.amountFree, 0)),
        0,
      ),
      maxOverlayHourly: isMaxAmountInProducts
        ? products.reduce(
            (acc, product) =>
              acc +
              (product.noIteration
                ? 0
                : (product.price - product.price * product.discount) *
                  Math.max(product.maxAmount - product.amountFree, 0)),
            0,
          )
        : 0,
    })
  }, [hideTotal, products, iteration, setTotalPrice])

  useEffect(() => {
    if (
      hideTimeUnit &&
      (iteration.value > 1 || iteration.unit !== (defaultTimeUnit ?? 'hours'))
    ) {
      setIteration({ unit: defaultTimeUnit ?? 'hours', value: 1 })
    }
  }, [hideTimeUnit, iteration, defaultTimeUnit])

  return (
    <Stack gap={2}>
      {!hideOverlay ? (
        <OverlayComponent
          inView={inView}
          totalPrice={totalPrice}
          disableOverlayLeft={disableOverlayLeft}
          disableOverlayRight={disableOverlayRight}
          OverlayLeft={OverlayLeft}
          OverlayRight={OverlayRight}
          isBeta={isBeta}
          discount={discount}
          unit={overlayUnit ?? 'hours'}
        >
          {children}
        </OverlayComponent>
      ) : null}
      {typeof description === 'string' || !description ? (
        <Text as="span" variant="body">
          {description || t('estimate.cost.description')}
        </Text>
      ) : (
        description
      )}
      {alert ? <Alert sentiment={alertVariant}>{alert}</Alert> : null}
      <OverlayContextProvider value={providerValue}>
        <div>
          {children ? (
            <StyledTable
              cellPadding="0"
              cellSpacing="0"
              ref={ref}
              data-testid="summary"
              noTotal={hideTotal}
            >
              <colgroup>
                <col />
                <col css={styles.priceCol} />
              </colgroup>
              {!hideTimeUnit ? (
                <thead>
                  <tr>
                    <th css={styles.title}>
                      <h3>
                        <StyledIcon
                          name="calculator"
                          color="primary"
                          size={20}
                        />
                        {t('estimate.cost.label')}
                      </h3>
                    </th>
                    <th css={styles.priceCell}>
                      <div css={styles.time}>
                        <CustomUnitInput
                          defaultTimeUnit={defaultTimeUnit}
                          setIteration={setIteration}
                          iteration={iteration}
                          timeUnits={timeUnits}
                        />
                      </div>
                    </th>
                  </tr>
                </thead>
              ) : null}
              <tbody>
                {Children.map(list, (child, index) =>
                  /* @ts-expect-error I'm too dumb to understand this sorcery */
                  cloneElement(child, {
                    isLastElement: index === list.length - 1,
                    productsCallback,
                    iteration,
                    discount:
                      discount &&
                      !(
                        (child as { props: Record<string, unknown> }).props as {
                          discount?: number
                        }
                      ).discount
                        ? discount
                        : (
                            (child as { props: Record<string, unknown> })
                              .props as {
                              discount?: number
                            }
                          ).discount,
                  }),
                )}
              </tbody>
            </StyledTable>
          ) : null}
          {!hideTotal ? (
            <table
              css={styles.emptyTable}
              width="100%"
              cellPadding="0"
              cellSpacing="0"
            >
              <colgroup>
                <col />
                <col css={styles.priceCol} />
              </colgroup>
              <tbody>
                <tr>
                  <td css={[styles.emptyCell]} aria-label="control" />
                  <td
                    css={[
                      styles.cell({ hasBorder: false }),
                      styles.totalPriceCell,
                    ]}
                  >
                    {isBeta ? (
                      <Badge
                        prominence="strong"
                        css={
                          t(
                            `estimate.cost.beta.${
                              discount > 0 ? 'discount' : 'free'
                            }`,
                            {
                              amount: discount * 100,
                            },
                          ).length < 25
                            ? styles.badgeBeta
                            : styles.longTextBadgeBeta
                        }
                        sentiment="warning"
                      >
                        {t(
                          `estimate.cost.beta.${
                            discount > 0 ? 'discount' : 'free'
                          }`,
                          {
                            amount: discount * 100,
                          },
                        )}
                      </Badge>
                    ) : null}
                    <StyledText
                      as="h3"
                      variant="heading"
                      color="primary"
                      isBeta={isBeta}
                    >
                      <EstimateCost.LineThrough
                        isActive={isBeta && (discount === 0 || discount >= 1)}
                      >
                        {formatNumber(totalPrice.total, {
                          style: 'currency',
                          currency: 'EUR',
                          maximumFractionDigits: isLongFractionDigits
                            ? maximumFractionDigitsLong[iteration.unit]
                            : maximumFractionDigits[iteration.unit],
                        })}
                        {totalPrice.maxTotal > 0
                          ? ` - ${formatNumber(totalPrice.maxTotal, {
                              style: 'currency',
                              currency: 'EUR',
                              maximumFractionDigits: isLongFractionDigits
                                ? maximumFractionDigitsLong[iteration.unit]
                                : maximumFractionDigits[iteration.unit],
                            })}`
                          : null}
                      </EstimateCost.LineThrough>
                    </StyledText>
                    {totalPrice.hourly > 0 &&
                    totalPrice.hourly !== totalPrice.total &&
                    totalPrice.total > 0 ? (
                      <RightAlignedText as="p" variant="body">
                        <EstimateCost.LineThrough
                          isActive={isBeta && (discount === 0 || discount >= 1)}
                        >
                          {formatNumber(totalPrice.hourly, {
                            style: 'currency',
                            currency: 'EUR',
                            maximumFractionDigits: isLongFractionDigits
                              ? maximumFractionDigitsLong.hours
                              : maximumFractionDigits.hours,
                          })}
                          {totalPrice.maxHourly > 0
                            ? ` - ${formatNumber(totalPrice.maxHourly, {
                                style: 'currency',
                                currency: 'EUR',
                                maximumFractionDigits: isLongFractionDigits
                                  ? maximumFractionDigitsLong.hours
                                  : maximumFractionDigits.hours,
                              })}`
                            : null}
                          /
                          {t(`estimate.cost.units.hours.label`, {
                            count: 1,
                          }).toLowerCase()}
                        </EstimateCost.LineThrough>
                      </RightAlignedText>
                    ) : null}
                  </td>
                </tr>
              </tbody>
            </table>
          ) : null}
          {commitmentFees !== undefined || monthlyFees !== undefined ? (
            <>
              <FeesText as="h3" variant="headingSmall">
                {t(
                  `estimate.cost.fees.${
                    commitmentFees ? 'oneTime' : 'monthly'
                  }.title`,
                )}
              </FeesText>
              <StyledFeesTable>
                <tbody>
                  <Item
                    label={
                      commitmentFees
                        ? t('estimate.cost.fees.commitment')
                        : monthlyFeesLabel
                    }
                    noIteration
                    isLastElement
                    price={commitmentFees || monthlyFees}
                    productsCallback={{
                      add: () => {},
                      remove: () => {},
                    }}
                  >
                    {commitmentFees
                      ? commitmentFeesContent
                      : monthlyFeesContent}
                  </Item>
                </tbody>
              </StyledFeesTable>
            </>
          ) : null}
        </div>
      </OverlayContextProvider>
    </Stack>
  )
}

const EstimateCost = ({
  description,
  alert,
  alertVariant = 'warning',
  defaultTimeUnit = 'hours',
  timeUnits = DEFAULT_UNIT_LIST,
  hideOverlay = false,
  disableOverlayLeft = false,
  disableOverlayRight = false,
  hideTimeUnit = false,
  hideTotal = false,
  discount = 0,
  OverlayRight,
  OverlayLeft,
  isBeta = false,
  commitmentFees,
  commitmentFeesContent,
  monthlyFees,
  monthlyFeesLabel,
  monthlyFeesContent,
  overlayUnit = 'hours',
  children = null,
  locales = EstimateCostLocales,
}: EstimateCostProps) => (
  <EstimateCostProvider locales={locales}>
    <EstimateCostContent
      description={description}
      alert={alert}
      alertVariant={alertVariant}
      defaultTimeUnit={defaultTimeUnit}
      timeUnits={timeUnits}
      hideOverlay={hideOverlay}
      disableOverlayLeft={disableOverlayLeft}
      disableOverlayRight={disableOverlayRight}
      hideTimeUnit={hideTimeUnit}
      hideTotal={hideTotal}
      discount={discount}
      OverlayRight={OverlayRight}
      OverlayLeft={OverlayLeft}
      isBeta={isBeta}
      commitmentFees={commitmentFees}
      commitmentFeesContent={commitmentFeesContent}
      monthlyFees={monthlyFees}
      monthlyFeesLabel={monthlyFeesLabel}
      monthlyFeesContent={monthlyFeesContent}
      overlayUnit={overlayUnit}
      locales={locales}
    >
      {children}
    </EstimateCostContent>
  </EstimateCostProvider>
)

EstimateCost.LineThrough = LineThrough

EstimateCost.Item = Item

EstimateCost.NumberInput = NumberInput

EstimateCost.Unit = Unit

EstimateCost.Strong = Strong

EstimateCost.Regular = Regular

EstimateCost.Image = styled.img`
  width: 15px;
  margin-right: ${({ theme }) => theme.space['1']};
`

EstimateCost.Region = Region
EstimateCost.Zone = Zone

const Ellipsis = ({
  children,
  maxWidth = 350,
  'data-testid': dataTestId,
}: {
  children: ReactNode
  maxWidth?: number
  'data-testid'?: string
}) => {
  const { isOverlay } = useOverlay()
  const text = Children.toArray(children).join('').toString()

  return (
    <div
      style={{ display: !isOverlay ? 'inline-flex' : undefined }}
      data-testid={dataTestId}
    >
      <MaxWidthText
        as="p"
        oneLine
        variant="bodyStrong"
        maxWidth={isOverlay ? 200 : maxWidth}
      >
        {text}
      </MaxWidthText>
    </div>
  )
}

EstimateCost.Ellipsis = Ellipsis

export { EstimateCost }
