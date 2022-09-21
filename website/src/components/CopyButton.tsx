import styled from '@emotion/styled'
import { Button, Icon } from '@scaleway/ui'
import useClipboard from 'react-use-clipboard'

const StyledDiv = styled.div`
  display: flex;
`

type CopyButtonProps = {
  text: string
  className?: string
}

const CopyButton = ({ text, className }: CopyButtonProps) => {
  const [isCopied, setCopied] = useClipboard(text, {
    successDuration: 2000,
  })

  return (
    <StyledDiv className={className}>
      <Button
        icon={<Icon name={isCopied ? 'check' : 'copy-content'} size={20} />}
        variant="secondary"
        onClick={setCopied}
        size="xsmall"
        display="flex"
      />
    </StyledDiv>
  )
}

export default CopyButton
