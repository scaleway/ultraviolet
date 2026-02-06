import { SupportProductIcon } from '@ultraviolet/icons/product/SupportProductIcon'
import { Conversation } from '..'
import { Avatar } from '../../../Avatar'
import { Text } from '../../../Text'

export const Message = () => (
  <>
    <Conversation.Message
      align="right"
      avatar={<Avatar shape="circle" size="small" text="MC" variant="text" />}
    >
      <Text as="div" sentiment="neutral" variant="body">
        Hi, I’m having trouble logging into my account. It keeps saying invalid
        password, but I’m sure it’s correct.
      </Text>
    </Conversation.Message>
    <Conversation.MessageInfos align="right">
      <Conversation.Tag>1 day ago</Conversation.Tag>
      <Text as="p" prominence="weak" variant="bodySmall">
        sent
      </Text>
    </Conversation.MessageInfos>
    <Conversation.Message align="left" avatar={<SupportProductIcon />}>
      <Text as="div" sentiment="neutral" variant="body">
        Hello! I recommend resetting your password using the Forgot Password
        link. If that doesn’t work, let me know, and I’ll assist further.
      </Text>
    </Conversation.Message>
    <Conversation.MessageInfos align="left">
      <Conversation.Tag>10 minutes ago</Conversation.Tag>
      <Text as="p" prominence="weak" variant="bodySmall">
        read
      </Text>
    </Conversation.MessageInfos>
  </>
)

Message.parameters = {
  docs: {
    description: {
      story:
        'To display an avatar, you can use the prop `avatar` in the message. It is also possible to add details to the message using the subcomponents `Conversation.Tag` and `Conversation.MessageInfos`.',
    },
  },
}
