import { SupportProductIcon } from '@ultraviolet/icons/product'
import { AvatarV2, Text } from '@ultraviolet/ui'
import { Conversation } from '..'

export const Message = () => (
  <>
    <Conversation.Message
      avatar={<AvatarV2 shape="circle" variant="text" text="MC" size="small" />}
      align="right"
    >
      <Text variant="body" sentiment="neutral" as="div">
        Hi, I’m having trouble logging into my account. It keeps saying invalid
        password, but I’m sure it’s correct.
      </Text>
    </Conversation.Message>
    <Conversation.MessageInfos align="right">
      <Conversation.Tag>1 day ago</Conversation.Tag>
      <Text as="p" variant="bodySmall" prominence="weak">
        sent
      </Text>
    </Conversation.MessageInfos>
    <Conversation.Message avatar={<SupportProductIcon />} align="left">
      <Text variant="body" sentiment="neutral" as="div">
        Hello! I recommend resetting your password using the Forgot Password
        link. If that doesn’t work, let me know, and I’ll assist further.
      </Text>
    </Conversation.Message>
    <Conversation.MessageInfos align="left">
      <Conversation.Tag>10 minutes ago</Conversation.Tag>
      <Text as="p" variant="bodySmall" prominence="weak">
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
