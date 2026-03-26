import { CalculatorIcon } from '@ultraviolet/icons/CalculatorIcon'
import { memo } from 'react'

import { estimateCostStyle } from '../styles.css'

import type { LocalesType } from '../types'

export const Title = memo(({ locales }: { locales: LocalesType }) => (
  <h3 className={estimateCostStyle.title}>
    <CalculatorIcon
      className={estimateCostStyle.calculatorIcon}
      sentiment="primary"
      size="medium"
    />
    {locales?.['estimate.cost.label']}
  </h3>
))
