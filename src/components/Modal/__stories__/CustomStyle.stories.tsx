import { css } from '@emotion/react'
import { Story } from '@storybook/react'
import Modal from '..'
import Button from '../../Button'

export const CustomStyle: Story = props => {
  const customDialogBackdropStyles = css`
    background-color: aliceblue;
  `
  const customDialogStyles = css`
    background: radial-gradient(circle, #8b2fe6 0%, #4f0599 50%, #30015a 100%);
  `

  return (
    <Modal
      {...props}
      disclosure={<Button>Custom style</Button>}
      bordered={false}
      customDialogBackdropStyles={customDialogBackdropStyles}
      customDialogStyles={customDialogStyles}
    >
      <p>Your Modal has some custom styling</p>
    </Modal>
  )
}
