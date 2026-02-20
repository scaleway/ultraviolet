'use client'

import {
  EstimateCost as EstimateCostUV,
  estimateCostDefaultLocales as estimateCostDefaultLocalesUV,
} from '@ultraviolet/ui/compositions/EstimateCost'

/**
 * @deprecated Use `EstimateCost` from `@ultraviolet/ui/composition/EstimateCost` instead
 */
export const EstimateCost: typeof EstimateCostUV = EstimateCostUV

/**
 * @deprecated Use `estimateCostDefaultLocales` from `@ultraviolet/ui/composition/EstimateCost` instead
 */
export const estimateCostDefaultLocales: typeof estimateCostDefaultLocalesUV =
  estimateCostDefaultLocalesUV
