import { UploadIcon } from '@ultraviolet/icons/UploadIcon'
import type { RefObject } from 'react'
import { Text } from '../Text'
import type { FileInputProps } from './types'
import { fileInputStyle } from './styles.css'

export const DropzoneContent = ({
  disabled,
  isSmall,
  inputId,
  title,
  inputRef,
}: {
  disabled?: boolean
  isSmall: boolean
  inputId: string
  title: FileInputProps['title']
  inputRef: RefObject<HTMLInputElement | null>
}) => (
  <>
    <UploadIcon disabled={disabled} sentiment={isSmall ? 'neutral' : 'primary'} size={isSmall ? 'small' : 'xlarge'} />
    <Text
      as={isSmall ? 'p' : 'div'}
      className={isSmall ? fileInputStyle.titleSmall[disabled ? 'disabled' : 'default'] : undefined}
      disabled={disabled}
      placement="left"
      sentiment="neutral"
      variant={isSmall ? 'bodySmallStrong' : 'headingSmallStrong'}
    >
      {typeof title === 'function' ? title(inputId, inputRef) : title}
    </Text>
  </>
)
