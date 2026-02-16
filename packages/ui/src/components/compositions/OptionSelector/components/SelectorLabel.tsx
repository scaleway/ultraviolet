import type { ReactNode } from 'react'
import { Text } from '../../../Text'
import { errorFirstSelector, errorSecondSelector } from '../styles.css'

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
    className={isFirst ? errorFirstSelector : errorSecondSelector}
    prominence={isError ? 'default' : 'weak'}
    sentiment={isError ? 'danger' : 'neutral'}
    variant="caption"
  >
    {isError ? error : helper}
  </Text>
)
