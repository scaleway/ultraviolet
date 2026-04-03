import { AttachIcon } from '@ultraviolet/icons/AttachIcon'
import { useContext } from 'react'

import { NumberInput } from '../../../components/NumberInput'
import { Stack } from '../../../components/Stack'
import { Text } from '../../../components/Text'
import { DisplayPrice } from '../helpers'
import { OrderSummaryContext } from '../Provider'
import { orderSummaryStyle } from '../styles.css'

import type { ItemsType } from '../types'

export const CategoryName = ({ category }: { category: ItemsType }) => {
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
              <a className={orderSummaryStyle.anchor} href={category.anchor}>
                <AttachIcon
                  className={orderSummaryStyle.anchorIcon({ size: 'medium' })}
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
            <a className={orderSummaryStyle.anchor} href={category.anchor}>
              <AttachIcon
                className={orderSummaryStyle.anchorIcon({ size: 'medium' })}
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
          className={orderSummaryStyle.numberInput}
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
