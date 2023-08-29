import styled from '@emotion/styled'
import type { DisclosureProps } from './types'

const DisclosureContainer = styled.button`
  display: contents;
`

export const Disclosure = ({
  disclosure,
  handleOpen,
  visible,
  handleClose,
  toggle,
  id,
}: DisclosureProps) =>
  typeof disclosure === 'function' ? (
    disclosure({
      visible,
      onClose: handleClose,
      toggle,
      onOpen: handleOpen,
      modalId: id,
    })
  ) : (
    <DisclosureContainer onClick={handleOpen} type="button" aria-controls={id}>
      {disclosure}
    </DisclosureContainer>
  )
