import styled from '@emotion/styled'
import CopyButton, { CopyButtonProps } from '../CopyButton'
import Text from '../Text'

const PreText = styled(Text, {
  shouldForwardProp: prop => !['multiline'].includes(prop),
})<{ multiline?: boolean }>`
  margin: 0;
  padding: ${({ theme }) => theme.space[2]};
  padding-right: ${({ theme }) => theme.space[7]};
  overflow-y: auto;
  ${({ multiline }) => (!multiline ? 'white-space: nowrap;' : '')}
`

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: ${({ theme }) => theme.colors.neutral.backgroundStrong};
  border-radius: ${({ theme }) => theme.radii.default};
`

const ButtonContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: ${({ theme }) => theme.space[1]};
  background: ${({ theme }) => theme.colors.neutral.backgroundStrong};
  border-radius: ${({ theme }) => theme.radii.default};
`

const StyledCopyButton = styled(CopyButton)``

type SnippetProps = {
  value: string
  multiline?: boolean
  /**
   * Mode display an element at the beginning of the snippet that is not copiable or selectable.
   * For `lines` mode it will display the line number.
   * For `command` mode it will display a `$` sign.
   */
  mode?: 'lines' | 'command'
} & Pick<CopyButtonProps, 'copyText' | 'copiedText'>

const Snippet = ({
  value,
  copyText,
  copiedText,
  multiline = false,
  mode,
}: SnippetProps) => {
  return (
    <Container>
      <PreText as="pre" variant="code" multiline={multiline}>
        {value}
      </PreText>
      <ButtonContainer>
        <StyledCopyButton
          value={value}
          copyText={copyText}
          copiedText={copiedText}
          noBorder
          variant="neutral"
        />
      </ButtonContainer>
    </Container>
  )
}

export default Snippet
