import { AttachIcon } from '@ultraviolet/icons/AttachIcon'
import { NumberInput, Stack, Text } from '@ultraviolet/ui'
import { useContext } from 'react'
import {
  calculateSubCategoryPrice,
  DisplayPrice,
  formatNumber,
} from './helpers'
import { OrderSummaryContext } from './Provider'
import {
  orderSummaryAnchor,
  orderSummaryAnchorIcon,
  orderSummaryCategory,
  orderSummaryDetails,
  orderSummaryNumberInput,
  orderSummaryScrollableContainer,
} from './styles.css'
import type { ItemsType, SubCategoryType } from './types'

const CategoryName = ({ category }: { category: ItemsType }) => {
  const { categoriesPrice } = useContext(OrderSummaryContext)

  const categoryPrice = categoriesPrice[category.category] ?? {
    maxPrice: 0,
    maxPriceWithDiscount: 0,
    timeUnit: 'hours',
    totalPrice: 0,
    totalPriceWithDiscount: 0,
  }

  return category.category ? (
    <Stack alignItems="center" direction="row" justifyContent="space-between">
      {category.additionalInfo ? (
        <Stack alignItems="center" direction="row" gap={1}>
          <Text
            as="span"
            prominence="strong"
            sentiment="neutral"
            variant="bodyStrong"
          >
            {category.anchor ? (
              <a className={orderSummaryAnchor} href={category.anchor}>
                <AttachIcon
                  className={orderSummaryAnchorIcon({ size: 'medium' })}
                  sentiment="info"
                />
                {category.category}
              </a>
            ) : (
              category.category
            )}
          </Text>
          <Text as="span" italic sentiment="primary" variant="bodySmall">
            {category.additionalInfo}
          </Text>
        </Stack>
      ) : (
        <Text
          as="span"
          prominence="strong"
          sentiment="neutral"
          variant="bodyStrong"
        >
          {category.anchor ? (
            <a className={orderSummaryAnchor} href={category.anchor}>
              <AttachIcon
                className={orderSummaryAnchorIcon({ size: 'medium' })}
                sentiment="info"
              />
              {category.category}
            </a>
          ) : (
            category.category
          )}
        </Text>
      )}
      {category.customContent}
      {category.numberInput ? (
        <NumberInput
          className={orderSummaryNumberInput}
          controls={category.numberInputControls}
          onChange={category.onChangeInput}
          size="small"
          unit={category.numberInputUnit}
          value={category.numberInputValue}
        />
      ) : null}
      {!(category.customContent || category.numberInput) &&
      categoryPrice.totalPrice === categoryPrice.totalPriceWithDiscount ? (
        <Text
          as="span"
          prominence="strong"
          sentiment="neutral"
          variant="bodyStrong"
        >
          <DisplayPrice beforeOrAfter="after" price={categoryPrice} />
        </Text>
      ) : null}

      {!(category.customContent || category.numberInput) &&
      categoryPrice.totalPrice !== categoryPrice.totalPriceWithDiscount ? (
        <Stack alignItems="center" direction="row" gap={1}>
          <Text
            as="span"
            prominence="weak"
            sentiment="neutral"
            strikeThrough
            variant="bodySmallStrong"
          >
            <DisplayPrice beforeOrAfter="before" price={categoryPrice} />
          </Text>
          <Text
            as="span"
            prominence="strong"
            sentiment="neutral"
            variant="bodyStrong"
          >
            <DisplayPrice beforeOrAfter="after" price={categoryPrice} />
          </Text>
        </Stack>
      ) : null}
    </Stack>
  ) : null
}

const SubCategory = ({ subCategory }: { subCategory: SubCategoryType }) => {
  const {
    currency,
    localeFormat,
    hideTimeUnit,
    timePeriodAmount,
    timePeriodUnit,
    fractionDigits,
  } = useContext(OrderSummaryContext)
  const subCategoryPrice = calculateSubCategoryPrice(
    subCategory,
    hideTimeUnit,
    timePeriodAmount,
    timePeriodUnit,
  )

  return (
    <Stack direction="column" gap={1}>
      <Stack alignItems="center" direction="row" justifyContent="space-between">
        {subCategory.additionalInfo || subCategory.icon ? (
          <Stack alignItems="center" direction="row" gap={1}>
            {subCategory.icon}
            <Text
              as="span"
              prominence="strong"
              sentiment="neutral"
              variant="bodySmallStrong"
            >
              {subCategory.anchor ? (
                <a className={orderSummaryAnchor} href={subCategory.anchor}>
                  <AttachIcon
                    className={orderSummaryAnchorIcon({ size: 'small' })}
                    sentiment="info"
                  />
                  {subCategory.title}
                </a>
              ) : (
                subCategory.title
              )}
            </Text>
            <Text as="span" italic sentiment="primary" variant="bodySmall">
              {subCategory.additionalInfo}
            </Text>
          </Stack>
        ) : (
          <Text
            as="span"
            prominence="strong"
            sentiment="neutral"
            variant="bodySmallStrong"
          >
            {subCategory.anchor ? (
              <a className={orderSummaryAnchor} href={subCategory.anchor}>
                <AttachIcon
                  className={orderSummaryAnchorIcon({ size: 'small' })}
                  sentiment="info"
                />
                {subCategory.title}
              </a>
            ) : (
              subCategory.title
            )}
          </Text>
        )}
        {subCategory.customContent ? (
          <Text
            as="span"
            prominence="strong"
            sentiment="neutral"
            variant="bodySmallStrong"
          >
            {subCategory.customContent}
          </Text>
        ) : null}
        {subCategory.numberInput ? (
          <NumberInput
            className={orderSummaryNumberInput}
            controls={subCategory.numberInputControls}
            onChange={subCategory.onChangeInput}
            size="small"
            unit={subCategory.numberInputUnit}
            value={subCategory.numberInputValue}
          />
        ) : null}
        {subCategory.price !== undefined &&
        !subCategory.hidePrice &&
        subCategoryPrice.default[0] === subCategoryPrice.discounted[1] ? (
          <Text
            as="span"
            prominence="strong"
            sentiment="neutral"
            variant="bodySmallStrong"
          >
            {subCategoryPrice.discounted[0] ===
              subCategoryPrice.discounted[1] || subCategory.priceUnit
              ? formatNumber(
                  subCategory.priceUnit
                    ? subCategory.price
                    : subCategoryPrice.discounted[0],
                  localeFormat,
                  currency,
                  fractionDigits,
                )
              : `${formatNumber(
                  subCategoryPrice.discounted[0],
                  localeFormat,
                  currency,
                  fractionDigits,
                )} - ${formatNumber(
                  subCategoryPrice.discounted[1],
                  localeFormat,
                  currency,
                  fractionDigits,
                )}`}
            {subCategory.priceUnit ? ` /${subCategory.priceUnit}` : ''}
          </Text>
        ) : null}
        {subCategory.price !== undefined &&
        !subCategory.hidePrice &&
        subCategoryPrice.default[0] !== subCategoryPrice.discounted[1] ? (
          <Stack alignItems="center" direction="row" gap={1}>
            <Text
              as="span"
              prominence="weak"
              sentiment="neutral"
              strikeThrough
              variant="bodySmallStrong"
            >
              {subCategoryPrice.default[0] === subCategoryPrice.default[1] ||
              subCategory.priceUnit
                ? formatNumber(
                    subCategory.priceUnit
                      ? subCategory.price
                      : subCategoryPrice.default[0],
                    localeFormat,
                    currency,
                    fractionDigits,
                  )
                : `${formatNumber(
                    subCategoryPrice.default[0],
                    localeFormat,
                    currency,
                    fractionDigits,
                  )} - ${formatNumber(
                    subCategoryPrice.default[1],
                    localeFormat,
                    currency,
                    fractionDigits,
                  )}`}
              {subCategory.priceUnit ? ` /${subCategory.priceUnit}` : ''}
            </Text>

            <Text
              as="span"
              prominence="strong"
              sentiment="neutral"
              variant="bodySmallStrong"
            >
              {subCategoryPrice.discounted[0] ===
                subCategoryPrice.discounted[1] || subCategory.priceUnit
                ? formatNumber(
                    subCategory.priceUnit
                      ? subCategory.price
                      : subCategoryPrice.discounted[0],
                    localeFormat,
                    currency,
                    fractionDigits,
                  )
                : `${formatNumber(
                    subCategoryPrice.discounted[0],
                    localeFormat,
                    currency,
                    fractionDigits,
                  )} - ${formatNumber(
                    subCategoryPrice.discounted[1],
                    localeFormat,
                    currency,
                    fractionDigits,
                  )}`}
              {subCategory.priceUnit ? ` /${subCategory.priceUnit}` : ''}
            </Text>
          </Stack>
        ) : null}
      </Stack>
      <Stack className={orderSummaryDetails} direction="column" gap={0.5}>
        {subCategory.details?.map((detail, index) =>
          detail ? (
            <Text
              as="span"
              // oxlint-disable-next-line react/no-array-index-key
              key={`${subCategory.title}-${index}`}
              sentiment="neutral"
              variant="bodySmall"
            >
              {detail}
            </Text>
          ) : null,
        )}
      </Stack>
    </Stack>
  )
}

export const ScrollableContent = () => {
  const { items } = useContext(OrderSummaryContext)

  return (
    <Stack className={orderSummaryScrollableContainer} gap={3}>
      {items.map(category =>
        Object.keys(category).length > 0 && category.category ? (
          <Stack
            className={orderSummaryCategory}
            gap={1.5}
            key={category.category}
          >
            {category.subTitle ? (
              <Stack direction="column">
                <CategoryName category={category} />
                {category.subTitle}
              </Stack>
            ) : (
              <CategoryName category={category} />
            )}
            {category.subCategories &&
            Object.keys(category.subCategories).length > 0 ? (
              <Stack gap={1}>
                {category.subCategories.map((subCategory, index) => (
                  <SubCategory
                    // oxlint-disable-next-line react/no-array-index-key
                    key={subCategory.title ?? `${index}`}
                    subCategory={subCategory}
                  />
                ))}
              </Stack>
            ) : null}
          </Stack>
        ) : null,
      )}
    </Stack>
  )
}
