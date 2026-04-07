import { CopyButton } from '../../../components/CopyButton'
import { Row } from '../../../components/Row'
import { Text } from '../../../components/Text'

import { InfoTableCell } from './Cell'

import type { CellProps } from './Cell'
import type { ComponentProps } from 'react'

export const CellWithCopyButton = ({
  copyContent,
  title,
  multiline,
  style,
  children,
  buttonSize,
  copiedText,
  copyText,
  onCopy,
}: {
  copyContent: string
  buttonSize?: ComponentProps<typeof CopyButton>['size']
} & CellProps &
  Pick<
    ComponentProps<typeof CopyButton>,
    'copiedText' | 'copyText' | 'onCopy'
  >) => (
  <InfoTableCell multiline={multiline} style={style} title={title}>
    <Row alignItems="center" gap={1} templateColumns="1fr auto">
      <Text as="p" oneLine variant="body">
        {children}
      </Text>
      <CopyButton
        copiedText={copiedText}
        copyText={copyText}
        onCopy={onCopy}
        sentiment="neutral"
        size={buttonSize}
        value={copyContent}
      />
    </Row>
  </InfoTableCell>
)
