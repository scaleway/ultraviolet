import { Text } from '../../../components/Text'
import { optionSelectorStyle } from '../styles.css'

import type { ReactNode } from 'react'

export const SelectorHelper = ({
  isError,
  error,
  helper,
  isFirst,
}: {
  isError: boolean
  helper?: ReactNode
  error?: boolean | string
  isFirst?: boolean
}) => (
  <Text
    as="p"
    className={
      isFirst
        ? optionSelectorStyle.errorFirstSelector
        : optionSelectorStyle.errorSecondSelector
    }
    prominence={isError ? 'default' : 'weak'}
    sentiment={isError ? 'danger' : 'neutral'}
    variant="caption"
  >
    {isError ? error : helper}
  </Text>
)
