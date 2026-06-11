import { ArrowDownIcon, ArrowUpIcon } from '@ultraviolet/icons'
import { Button, Label, Row, Stack, Text } from '@ultraviolet/ui'
import type { ReactNode } from 'react'
import { useState } from 'react'

export const ExpandableFilterGroup = ({
  label,
  children,
  defaultExpanded = true,
  onReset,
  clearText,
}: {
  label: string
  children: ReactNode
  defaultExpanded?: boolean
  onReset?: () => void
  clearText: string
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded)

  return (
    <Stack gap={2}>
      <Row gap={1} templateColumns="1fr auto">
        <Label size="medium">{label}</Label>
        <Stack direction="row" gap={1}>
          {typeof onReset === 'function' ? (
            <Button onClick={onReset} sentiment="neutral" size="xsmall" variant="ghost">
              <Text as="span" variant="captionStrong">
                {clearText}
              </Text>
            </Button>
          ) : null}
          <Button
            onClick={() => {
              setExpanded(current => !current)
            }}
            sentiment="neutral"
            size="xsmall"
            variant="ghost"
          >
            {expanded ? <ArrowUpIcon /> : <ArrowDownIcon />}
          </Button>
        </Stack>
      </Row>
      {expanded ? <Stack>{children}</Stack> : null}
    </Stack>
  )
}
