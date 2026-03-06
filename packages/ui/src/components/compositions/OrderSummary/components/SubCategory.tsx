import { AttachIcon } from '@ultraviolet/icons/AttachIcon'

import { NumberInput } from '../../../NumberInput'
import { Stack } from '../../../Stack'
import { Text } from '../../../Text'
import { orderSummaryStyle } from '../styles.css'

import { SubCategoryPrice } from './SubCategoryPrice'

import type { SubCategoryType } from '../types'

export const SubCategory = ({
  subCategory,
}: {
  subCategory: SubCategoryType
}) => (
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
              <a className={orderSummaryStyle.anchor} href={subCategory.anchor}>
                <AttachIcon
                  className={orderSummaryStyle.anchorIcon({ size: 'small' })}
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
            <a className={orderSummaryStyle.anchor} href={subCategory.anchor}>
              <AttachIcon
                className={orderSummaryStyle.anchorIcon({ size: 'small' })}
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
          className={orderSummaryStyle.numberInput}
          controls={subCategory.numberInputControls}
          onChange={subCategory.onChangeInput}
          size="small"
          unit={subCategory.numberInputUnit}
          value={subCategory.numberInputValue}
        />
      ) : null}
      <SubCategoryPrice subCategory={subCategory} />
    </Stack>
    <Stack className={orderSummaryStyle.details} direction="column" gap={0.5}>
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
