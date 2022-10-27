import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { useState } from 'react'
import CopyButton, { CopyButtonProps } from '../CopyButton'
import Icon from '../Icon'
import Stack from '../Stack'
import Text from '../Text'

type Prefixes = 'lines' | 'command'

const PreText = styled(Text, {
  shouldForwardProp: prop =>
    ![
      'multiline',
      'hasShowMoreButton',
      'showMore',
      'maxHeightExtended',
    ].includes(prop),
})<{
  multiline?: boolean
  hasShowMoreButton?: boolean
  showMore?: boolean
  maxHeightExtended: number
}>`
  margin: 0;
  padding: ${({ theme }) => theme.space['2']};
  padding-right: ${({ theme }) => theme.space['9']};
  overflow-x: ${({ hasShowMoreButton, showMore }) =>
    hasShowMoreButton && !showMore ? 'hidden' : 'auto'};
  overflow-y: hidden;
  ${({ multiline }) => (!multiline ? 'white-space: nowrap;' : '')}
  height: auto;
  max-height: ${({ multiline, showMore, maxHeightExtended }) =>
    multiline && !showMore ? '120' : maxHeightExtended}px;
  transition: max-height 300ms ease-in-out;
`

const StyledSpan = styled('span', {
  shouldForwardProp: prop => !['linePrefix', 'multiline'].includes(prop),
})<{ linePrefix?: string; multiline?: boolean }>`
  display: block;

  &:after {
    content: '';
    ${({ theme, multiline }) =>
      multiline
        ? `padding: ${theme.space['4']}`
        : `padding-right: ${theme.space['8']}`};
  }
`

const Prefix = styled(Text, {
  shouldForwardProp: prop => !['prefix'].includes(prop),
})<{ prefix?: Prefixes }>`
  width: ${({ prefix }) => (prefix === 'lines' ? '3%' : '')};
  display: inline-flex;
  justify-content: flex-end;
  text-align: right;
  user-select: none;
  margin-right: ${({ theme }) => theme.space['1']};
`

const Container = styled('div', {
  shouldForwardProp: prop => !['multiline'].includes(prop),
})<{ multiline?: boolean }>`
  position: relative;
  display: flex;
  justify-content: start;
  max-width: 100%;
  ${({ multiline }) => (multiline ? 'width: 100%;' : '')}
  background: ${({ theme }) => theme.colors.neutral.backgroundStrong};
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
    multiline
      ? `${theme.space['2']} ${theme.space['2']} 0 0`
      : `${theme.space['1']} ${theme.space['2']} 0 0`};
  background: ${({ theme }) => theme.colors.neutral.backgroundStrong};
  border-radius: ${({ theme }) => theme.radii.default};
  border: 2px solid transparent;
  ${({ multiline, theme }) =>
    !multiline
      ? `box-shadow: -27px 0 19px -11px ${theme.colors.neutral.backgroundStrong}`
      : ''};
`

const ShowMoreContainer = styled('div', {
  shouldForwardProp: prop => !['showMore'].includes(prop),
})<{ showMore?: boolean }>`
  width: 100%;
  box-shadow: ${({ theme, showMore }) =>
    !showMore
      ? `0px -22px 19px -6px
    ${theme.colors.neutral.backgroundStrong}`
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

type SnippetProps = {
  value: string
  multiline?: boolean
  /**
   * prefix display an element at the beginning of the snippet that is not copiable or selectable.
   * For `lines` prefix it will display the line number.
   * For `command` prefix it will display a `$` sign.
   */
  prefix?: Prefixes
  showText?: string
  hideText?: string
} & Pick<CopyButtonProps, 'copyText' | 'copiedText'>

const Snippet = ({
  value,
  copyText,
  copiedText,
  multiline = false,
  showText = 'Show',
  hideText = 'Hide',
  prefix,
}: SnippetProps) => {
  const theme = useTheme()
  const [showMore, setShowMore] = useState(false)

  const lines = value.split(/\r\n|\r|\n/).filter(Boolean)
  const numberOfLines = lines.length
  const hasShowMoreButton = numberOfLines > 4 && multiline

  /**
   * This is used to calculate the max height of the snippet in order to add an animation when the show more button is clicked.
   * The max height is calculated by multiplying the number of lines by the line height of the text plus the padding (2 times).
   */
  const maxHeightExtended =
    numberOfLines * Number(theme.typography.code.lineHeight.replace('px', '')) +
    Number(theme.space['2'].replace('px', '')) * 2

  return (
    <Container multiline={multiline}>
      <StyledStack>
        <PreText
          as="pre"
          variant="code"
          multiline={multiline}
          hasShowMoreButton={hasShowMoreButton}
          showMore={showMore}
          maxHeightExtended={maxHeightExtended}
        >
          {multiline ? (
            lines.map((line, index) => (
              <StyledSpan multiline={multiline} key={line}>
                {prefix ? (
                  <Prefix
                    as="span"
                    variant="code"
                    prefix={prefix}
                    prominence="weak"
                  >
                    {prefix === 'lines' ? (index + 1).toString() : '$'}
                  </Prefix>
                ) : null}
                {line}
              </StyledSpan>
            ))
          ) : (
            <StyledSpan multiline={multiline}>
              {prefix ? (
                <Prefix
                  as="span"
                  variant="code"
                  prefix={prefix}
                  prominence="weak"
                >
                  {prefix === 'lines' ? '1' : '$'}
                </Prefix>
              ) : null}
              {value}
            </StyledSpan>
          )}
        </PreText>
        <ButtonContainer multiline={multiline}>
          <CopyButton
            value={value}
            copyText={copyText}
            copiedText={copiedText}
            noBorder
            variant="neutral"
          />
        </ButtonContainer>
        {hasShowMoreButton ? (
          <ShowMoreContainer showMore={showMore}>
            <StyledButton type="button" onClick={() => setShowMore(!showMore)}>
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

export default Snippet
