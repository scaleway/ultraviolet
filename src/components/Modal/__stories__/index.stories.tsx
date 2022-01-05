import { css } from '@emotion/react'
import { Meta, Story } from '@storybook/react'
import React, { ComponentProps } from 'react'
import Modal, { MODAL_ANIMATION, MODAL_PLACEMENT, MODAL_WIDTH } from '..'
import { Button, Switch as SWUISwitch } from '../..'

export default {
  component: Modal,
  parameters: {
    docs: {
      description: {
        component: `Documentation is here https://reakit.io/docs/dialog/#props

By default now our modal is a portal. If you want to change this you can disabled modal props but be aware of https://reakit.io/docs/dialog/#non-modal-dialogs`,
      },
    },
  },
  title: 'Components/Container/Modal',
} as Meta

const defaultDisclosure = <Button>Open Modal</Button>

const Template: Story<ComponentProps<typeof Modal>> = ({
  disclosure = defaultDisclosure,
  ...props
}) => (
  <Modal disclosure={disclosure} {...props}>
    <div>Content should be present in center of the modal</div>
  </Modal>
)

export const Default = Template.bind({})

export const Switch = Template.bind({})
Switch.decorators = [
  () => (
    <Modal
      disclosure={dialog => (
        <SWUISwitch name="switch" onChange={() => dialog.toggle?.()} />
      )}
    >
      <div>Content should be present in center of the modal</div>
    </Modal>
  ),
]

export const WithLotsOfContent = Template.bind({})
WithLotsOfContent.parameters = {
  docs: {
    storyDescription: 'Having a lot of content automatically adds a scroll',
  },
}
WithLotsOfContent.decorators = [
  () => (
    <Modal
      animated
      animation="scaleUp"
      disclosure={<Button>Open Modal with lot of content</Button>}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        <div>Content should be present in center of the modal</div>
        <div>Content should be present in center of the modal</div>
        <div>Content should be present in center of the modal</div>
        <div>Content should be present in center of the modal</div>
        <div>Content should be present in center of the modal</div>
        <div>Content should be present in center of the modal</div>
        <div>Content should be present in center of the modal</div>
        <div>Content should be present in center of the modal</div>
        <div>Content should be present in center of the modal</div>
        <div>Content should be present in center of the modal</div>
        <div>Content should be present in center of the modal</div>
        <div>Content should be present in center of the modal</div>
        <div>Content should be present in center of the modal</div>
      </div>
    </Modal>
  ),
]

export const Animated = Template.bind({})
Animated.parameters = {
  docs: {
    storyDescription: 'Here is a list of all the animated values we support',
  },
}
Animated.decorators = [
  () => (
    <>
      {Object.keys(MODAL_ANIMATION).map(animation => (
        <div style={{ display: 'inline-block', padding: 16 }} key={animation}>
          <Modal
            animated
            animation={animation as keyof typeof MODAL_ANIMATION}
            disclosure={<Button>{animation}</Button>}
          >
            <div style={{ padding: 32 }}>Modal should be animated</div>
          </Modal>
        </div>
      ))}
    </>
  ),
]

export const Width = Template.bind({})
Width.parameters = {
  docs: {
    storyDescription: 'Here is a list of all the width values we support',
  },
}
Width.decorators = [
  () => (
    <>
      {Object.keys(MODAL_WIDTH).map(width => (
        <div style={{ display: 'inline-block', padding: 16 }} key={width}>
          <Modal
            width={width as keyof typeof MODAL_WIDTH}
            disclosure={<Button>{width}</Button>}
          >
            <div style={{ padding: 32 }}>Content of the {width} modal</div>
          </Modal>
        </div>
      ))}
    </>
  ),
]

export const Placement = Template.bind({})
Placement.parameters = {
  docs: {
    storyDescription: 'Here is a list of all the placement values we support',
  },
}
Placement.decorators = [
  () => (
    <>
      {Object.keys(MODAL_PLACEMENT).map(placement => (
        <div style={{ display: 'inline-block', padding: 16 }} key={placement}>
          <Modal
            placement={placement as keyof typeof MODAL_PLACEMENT}
            disclosure={<Button>{placement}</Button>}
          >
            <div style={{ padding: 32 }}>Content of the {placement} modal</div>
          </Modal>
        </div>
      ))}
    </>
  ),
]

export const Height = Template.bind({})
Height.parameters = {
  docs: {
    storyDescription: 'You can customise the `height` of the modal',
  },
}
Height.decorators = [
  () => (
    <Modal disclosure={<Button>Height 100%</Button>} height="100%">
      <div style={{ padding: 32 }}>
        Hello there this a modal with a full height
      </div>
    </Modal>
  ),
]

export const PreventBodyScroll = Template.bind({})
PreventBodyScroll.parameters = {
  docs: {
    storyDescription:
      'To prevent body scroll outside of the modal, use `preventBodyScroll`',
  },
}
PreventBodyScroll.decorators = [
  () => (
    <Modal disclosure={<Button>preventBodyScroll</Button>} preventBodyScroll>
      <div style={{ padding: 32 }}>
        Try to scroll on body ( outside of the Modal ) preventBodyScroll is
        available only when modal props is enabled
        https://reakit.io/docs/dialog/#props
      </div>
    </Modal>
  ),
]

export const HideOnClickOutside = Template.bind({})
HideOnClickOutside.parameters = {
  docs: {
    storyDescription:
      'To close or keep modal on click outside, specify `hideOnClickOutside`',
  },
}
HideOnClickOutside.decorators = [
  () => (
    <Modal
      disclosure={<Button>hideOnClickOutside</Button>}
      width="small"
      hideOnClickOutside={false}
    >
      <div style={{ padding: 32 }}>Try to click outside of the Modal</div>
    </Modal>
  ),
]

export const HideOnEsc = Template.bind({})
HideOnEsc.parameters = {
  docs: {
    storyDescription:
      'To hide or keep modal on ESC key, specify `hideOnEsc`Here is a list of all the HideOnEsc values we support',
  },
}
HideOnEsc.decorators = [
  () => (
    <Modal
      disclosure={<Button>hideOnEsc</Button>}
      width="medium"
      hideOnEsc={false}
    >
      <div style={{ padding: 32 }}>try to ESCAPE</div>
    </Modal>
  ),
]

export const ModalProp = Template.bind({})
ModalProp.storyName = 'Modal'
ModalProp.parameters = {
  docs: {
    storyDescription:
      '`modal` props can set the modal just below the button in the DOM',
  },
}
ModalProp.decorators = [
  () => (
    <Modal disclosure={<Button>modal</Button>} width="medium" modal={false}>
      <div style={{ padding: 32 }}>
        Our modal is just below our Button in the DOM{' '}
      </div>
    </Modal>
  ),
]

export const IsClosable = Template.bind({})
IsClosable.parameters = {
  docs: {
    storyDescription: 'To hide close button at the top, specify `isClosable`',
  },
}
IsClosable.decorators = [
  () => (
    <Modal disclosure={<Button>isClosable</Button>} isClosable={false}>
      {({ hide }: { hide: () => void }) => (
        <>
          <p>You don&apos;t have a close Icon</p>
          <Button
            onClick={() => {
              hide()
            }}
          >
            Close
          </Button>
        </>
      )}
    </Modal>
  ),
]

export const NotBordered = Template.bind({})
NotBordered.parameters = {
  docs: {
    storyDescription: '`bordered` can remove modal borders',
  },
}
NotBordered.decorators = [
  () => (
    <Modal disclosure={<Button>bordered</Button>} bordered={false}>
      <p>Your Modal is not bordered</p>
    </Modal>
  ),
]

export const CustomStyle = Template.bind({})
CustomStyle.decorators = [
  () => {
    const customDialogBackdropStyles = css`
      background-color: aliceblue;
    `
    const customDialogStyles = css`
      background: radial-gradient(
        circle,
        #8b2fe6 0%,
        #4f0599 50%,
        #30015a 100%
      );
    `

    return (
      <Modal
        disclosure={<Button>Custom style</Button>}
        bordered={false}
        customDialogBackdropStyles={customDialogBackdropStyles}
        customDialogStyles={customDialogStyles}
      >
        <p>Your Modal has some custom styling</p>
      </Modal>
    )
  },
]

export const WithDisclosureFunction = Template.bind({})
WithDisclosureFunction.decorators = [
  () => (
    <Modal disclosure={props => <Button>disclosure {props?.baseId}</Button>}>
      Content
    </Modal>
  ),
]

export const WithDisclosureBeingANativeElement = Template.bind({})
WithDisclosureBeingANativeElement.decorators = [
  () => (
    <Modal disclosure={<button type="button">disclosure</button>}>
      Content
    </Modal>
  ),
]

export const FunctionChildren = Template.bind({})
FunctionChildren.decorators = [
  () => (
    <Modal disclosure={<Button>modal</Button>}>
      {({ baseId }: { baseId: string }) => <p>Content {baseId} </p>}
    </Modal>
  ),
]
