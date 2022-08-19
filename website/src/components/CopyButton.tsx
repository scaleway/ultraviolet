import { Button, FlexBox, Icon } from '@scaleway/ui'
import React from 'react'
import useClipboard from 'react-use-clipboard'

type CopyButtonProps = {
  text: string
  className?: string
}

const CopyButton = ({ text, className }: CopyButtonProps): JSX.Element => {
  const [isCopied, setCopied] = useClipboard(text, {
    successDuration: 2000,
  })

  return (
    <FlexBox className={className}>
      <Button
        icon={<Icon name={isCopied ? 'check' : 'copy-content'} size={20} />}
        variant="secondary"
        onClick={setCopied}
        size="xsmall"
        display="flex"
      />
    </FlexBox>
  )
}

export default CopyButton
