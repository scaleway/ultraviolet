'use client'

import { ArrowDownIcon } from '@ultraviolet/icons'
import { cn } from '@ultraviolet/themes'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import type { ComponentProps, CSSProperties, ReactNode } from 'react'
import { Children, useReducer } from 'react'
import { useTheme } from '../../theme/ThemeProvider'
import { CopyButton } from '../CopyButton'
import { Expandable } from '../Expandable'
import { Label } from '../Label'
import { Stack } from '../Stack'
import { Text } from '../Text'
import {
  animatedArrowIcon,
  buttonContainer,
  centeredText,
  line,
  prefix as prefixStyle,
  pretext,
  rowsVar,
  showMoreButton,
  showMoreContainer,
  snippetContainer,
  stackStyle,
} from './styles.css'

const LINES_BREAK_REGEX = /\r\n|\r|\n/

type Prefixes = 'lines' | 'command'

type CodeContentProps = {
  children: string
  prefix?: Prefixes
  multiline?: boolean
  showMore?: boolean
  hasShowMoreButton?: boolean
  lines?: string[]
  noExpandable: boolean
  rows: number
}

const CodeContent = ({
  children,
  prefix,
  multiline,
  showMore,
  hasShowMoreButton,
  lines,
  noExpandable,
  rows,
}: CodeContentProps) => (
  <Text
    as="pre"
    className={pretext({
      noExpandable,
      showMore: hasShowMoreButton && !showMore,
    })}
    style={assignInlineVars({
      [rowsVar]: rows.toString(),
    })}
    variant="code"
    whiteSpace={!multiline ? 'nowrap' : undefined}
  >
    {multiline ? (
      Children.map(lines, child => (
        <span
          className={cn(
            line({ multiline: true }),
            prefix ? prefixStyle[prefix] : '',
          )}
          key={child}
        >
          {child}
        </span>
      ))
    ) : (
      <span className={cn(line(), prefix ? prefixStyle[prefix] : '')}>
        {children}
      </span>
    )}
  </Text>
)

type SnippetProps = {
  className?: string
  children: string
  /**
   * prefix display an element at the beginning of the snippet that is not copiable or selectable.
   * For `lines` prefix it will display the line number.
   * For `command` prefix it will display a `$` sign.
   */
  prefix?: Prefixes
  showText?: string
  hideText?: string
  'data-testid'?: string
  initiallyExpanded?: boolean
  rows?: number
  noExpandable?: boolean
  onCopy?: () => void
  style?: CSSProperties
  helper?: string
  label?: string
  labelDescription?: ReactNode
} & Pick<ComponentProps<typeof CopyButton>, 'copyText' | 'copiedText'>

/**
 * Snippet component is used to display code snippets with the ability to copy the code.
 * It also has the ability to show/hide the code snippet if it has more than 4 lines.
 */
export const Snippet = ({
  children,
  copyText,
  copiedText,
  showText = 'Show',
  hideText = 'Hide',
  prefix,
  className,
  'data-testid': dataTestId,
  initiallyExpanded,
  rows = 4,
  noExpandable = false,
  onCopy,
  style,
  helper,
  label,
  labelDescription,
}: SnippetProps) => {
  const theme = useTheme()
  const [showMore, setShowMore] = useReducer(
    value => !value,
    initiallyExpanded ?? false,
  )
  const lines = children.split(LINES_BREAK_REGEX)

  const numberOfLines = lines.length
  const multiline = numberOfLines > 1
  const hasShowMoreButton = numberOfLines > rows && multiline && !noExpandable
  // Height of the expandable (when needed) = number of rows * height of a line (from rem to px) + padding (from rem to px)
  const minHeight =
    rows * Number.parseFloat(theme.typography.code.lineHeight) * 16 +
    Number.parseFloat(theme.space[4]) * 16

  return (
    <Stack direction="column" gap={1} width="100%">
      {label ? (
        <Label labelDescription={labelDescription}>{label}</Label>
      ) : null}
      <div
        className={cn(
          className,
          snippetContainer[multiline ? 'multiline' : 'oneLine'],
        )}
        data-testid={dataTestId}
        style={style}
      >
        <Stack className={stackStyle}>
          {hasShowMoreButton ? (
            <Expandable minHeight={minHeight} opened={showMore}>
              <CodeContent
                lines={lines}
                multiline={multiline}
                noExpandable={noExpandable}
                prefix={prefix}
                rows={rows}
              >
                {children}
              </CodeContent>
            </Expandable>
          ) : (
            <CodeContent
              lines={lines}
              multiline={multiline}
              noExpandable={noExpandable}
              prefix={prefix}
              rows={rows}
            >
              {children}
            </CodeContent>
          )}
          <div
            className={
              buttonContainer[
                multiline && numberOfLines > 1 ? 'multiline' : 'oneLine'
              ]
            }
          >
            <CopyButton
              copiedText={copiedText}
              copyText={copyText}
              onCopy={onCopy}
              sentiment="neutral"
              value={children}
            />
          </div>
          {hasShowMoreButton ? (
            <div className={showMoreContainer[showMore ? 'true' : 'false']}>
              <button
                aria-expanded={showMore}
                className={showMoreButton}
                onClick={setShowMore}
                type="button"
              >
                <Text
                  as="span"
                  className={centeredText}
                  sentiment="neutral"
                  variant="bodySmallStrong"
                >
                  {showMore ? hideText : showText}
                  &nbsp;
                  <ArrowDownIcon
                    className={animatedArrowIcon[showMore ? 'true' : 'false']}
                  />
                </Text>
              </button>
            </div>
          ) : null}
        </Stack>
      </div>
      {helper ? (
        <Text as="p" prominence="weak" sentiment="neutral" variant="caption">
          {helper}
        </Text>
      ) : null}
    </Stack>
  )
}
