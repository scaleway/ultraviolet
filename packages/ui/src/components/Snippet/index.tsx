import styled from '@emotion/styled'
import { Icon } from '@ultraviolet/icons'
import type { ComponentProps } from 'react'
import { Children, useState } from 'react'
import { CopyButton } from '../CopyButton'
import { Expandable } from '../Expandable'
import { Stack } from '../Stack'
import { Text } from '../Text'

const LINES_BREAK_REGEX = /\r\n|\r|\n/

type Prefixes = 'lines' | 'command'

const PreText = styled(Text, {
  shouldForwardProp: prop =>
    !['multiline', 'hasShowMoreButton', 'showMore'].includes(prop),
})<{
  multiline?: boolean
  hasShowMoreButton?: boolean
  showMore?: boolean
}>`
  margin: 0;
  padding: ${({ theme }) => theme.space['2']};
  padding-right: ${({ theme }) => theme.space['9']};
  overflow-x: ${({ hasShowMoreButton, showMore }) =>
    hasShowMoreButton && !showMore ? 'hidden' : 'auto'};
  overflow-y: hidden;
  ${({ multiline }) => (!multiline ? 'white-space: nowrap;' : '')}
  height: auto;
  counter-reset: section;
`

const StyledSpan = styled('span', {
  shouldForwardProp: prop =>
    !['linePrefix', 'multiline', 'prefix'].includes(prop),
})<{ linePrefix?: string; multiline?: boolean; prefix?: Prefixes }>`
  display: block;

  &:after {
    content: '';
    ${({ theme, multiline }) =>
      multiline
        ? `padding: ${theme.space['4']}`
        : `padding-right: ${theme.space['8']}`};
  }

  ${({ prefix, theme }) =>
    prefix
      ? `
    &:before {
      color: ${theme.colors.neutral.textWeak};
      width: ${prefix === 'lines' ? '35px' : ''};
      display: inline-flex;
      justify-content: flex-end;
      counter-increment: section;
      content: ${prefix === 'lines' ? 'counter(section)' : "'$'"};
      padding-right: ${theme.space['1']};
    }
  `
      : null}
`

const Container = styled('div', {
  shouldForwardProp: prop => !['multiline'].includes(prop),
})<{ multiline?: boolean }>`
  position: relative;
  display: flex;
  justify-content: start;
  max-width: 100%;
  ${({ multiline }) => (multiline ? 'width: 100%;' : '')}
  background: ${({ theme }) => theme.colors.neutral.backgroundWeak};
  border-radius: ${({ theme }) => theme.radii.default};
`

const StyledStack = styled(Stack)`
  width: 100%;
`

const ButtonContainer = styled('div', {
  shouldForwardProp: prop => !['multiline'].includes(prop),
})<{ multiline?: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  padding: ${({ theme, multiline }) =>
    `${theme.space[multiline ? '2' : '1']} ${theme.space['2']} 0 0`};
  background: ${({ theme }) => theme.colors.neutral.backgroundWeak};
  border-radius: ${({ theme }) => theme.radii.default};
  border: 2px solid transparent;
  ${({ multiline, theme }) =>
    !multiline
      ? `box-shadow: -27px 0 19px -11px ${theme.colors.neutral.backgroundWeak}`
      : ''};
`

const ShowMoreContainer = styled('div', {
  shouldForwardProp: prop => !['showMore'].includes(prop),
})<{ showMore?: boolean }>`
  width: 100%;
  box-shadow: ${({ theme, showMore }) =>
    !showMore
      ? `0px -22px 19px -6px
    ${theme.colors.neutral.backgroundWeak}`
      : 'none'};
`

const StyledButton = styled.button`
  width: 100%;
  background: none;
  border: none;
  padding: ${({ theme }) => theme.space['2']};
  padding-top: ${({ theme }) => theme.space['1']};
  cursor: pointer;
`

const AlignCenterText = styled(Text)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const AnimatedArrowIcon = styled(Icon, {
  shouldForwardProp: prop => !['showMore'].includes(prop),
})<{ showMore?: boolean }>`
  transform: ${({ showMore }) =>
    showMore ? 'rotate(180deg)' : 'rotate(0deg)'};
  transform-origin: center;
  transition: transform 300ms ease-in-out;
`

type CodeContentProps = {
  children: string
  prefix?: Prefixes
  multiline?: boolean
  showMore?: boolean
  hasShowMoreButton?: boolean
  lines?: string[]
}

const CodeContent = ({
  children,
  prefix,
  multiline,
  showMore,
  hasShowMoreButton,
  lines,
}: CodeContentProps) => (
  <PreText
    as="pre"
    variant="code"
    multiline={multiline}
    hasShowMoreButton={hasShowMoreButton}
    showMore={showMore}
  >
    {multiline ? (
      Children.map(lines, child => (
        <StyledSpan multiline prefix={prefix}>
          {child}
        </StyledSpan>
      ))
    ) : (
      <StyledSpan prefix={prefix}>{children}</StyledSpan>
    )}
  </PreText>
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
}: SnippetProps) => {
  const [showMore, setShowMore] = useState(false)

  const lines = children.split(LINES_BREAK_REGEX).filter(Boolean)
  const numberOfLines = lines.length
  const multiline = numberOfLines > 1
  const hasShowMoreButton = numberOfLines > 4 && multiline

  return (
    <Container
      multiline={multiline}
      className={className}
      data-testid={dataTestId}
    >
      <StyledStack>
        {hasShowMoreButton ? (
          <Expandable minHeight={120} opened={showMore}>
            <CodeContent prefix={prefix} multiline={multiline} lines={lines}>
              {children}
            </CodeContent>
          </Expandable>
        ) : (
          <CodeContent prefix={prefix} multiline={multiline} lines={lines}>
            {children}
          </CodeContent>
        )}
        <ButtonContainer multiline={multiline && numberOfLines > 1}>
          <CopyButton
            value={children}
            copyText={copyText}
            copiedText={copiedText}
            noBorder
            sentiment="neutral"
          />
        </ButtonContainer>
        {hasShowMoreButton ? (
          <ShowMoreContainer showMore={showMore}>
            <StyledButton
              type="button"
              onClick={() => setShowMore(!showMore)}
              aria-expanded={showMore}
            >
              <AlignCenterText as="span" variant="bodySmallStrong">
                {showMore ? hideText : showText}
                &nbsp;
                <AnimatedArrowIcon name="arrow-down" showMore={showMore} />
              </AlignCenterText>
            </StyledButton>
          </ShowMoreContainer>
        ) : null}
      </StyledStack>
    </Container>
  )
}
