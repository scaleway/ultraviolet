import type { ReactNode } from 'react'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { textInputStyle } from './styles.css'
import type { TextInputProps } from './type'

export const PrefixSuffix = ({
  size,
  content,
  disabled,
  type,
}: Pick<TextInputProps, 'size' | 'disabled'> & {
  type: 'prefix' | 'suffix'
  content: ReactNode
}) =>
  content ? (
    <Stack
      alignItems="center"
      className={
        textInputStyle[type === 'prefix' ? 'basicPrefix' : 'basicSuffix']
      }
      data-size={size}
      direction="row"
    >
      {typeof content === 'string' ? (
        <Text
          as="span"
          disabled={disabled}
          sentiment="neutral"
          variant="bodySmall"
        >
          {content}
        </Text>
      ) : (
        content
      )}
    </Stack>
  ) : null
