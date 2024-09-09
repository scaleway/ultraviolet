import { SupportProductIcon } from '@ultraviolet/icons/product'
import { Avatar, Text } from '@ultraviolet/ui'
import { Conversation } from '..'

export const Message = () => (
  <>
    <Conversation.Message
      avatar={<SupportProductIcon size="medium" />}
      align="left"
    >
      <Text variant="body" sentiment="neutral" as="div">
        Message left
      </Text>
    </Conversation.Message>
    <Conversation.MessageInfos align="left">
      <Conversation.Tag>tag</Conversation.Tag>
      <Text as="p" variant="bodySmall" prominence="weak">
        info
      </Text>
    </Conversation.MessageInfos>

    <Conversation.Message
      avatar={
        <Avatar
          size={40}
          image="static/media/packages/ui/src/components/Avatar/__stories__/avatar.svg"
        />
      }
      align="right"
    >
      <Text variant="body" sentiment="neutral" as="div">
        Message right
      </Text>
    </Conversation.Message>
    <Conversation.MessageInfos align="right">
      <Conversation.Tag>tag</Conversation.Tag>
      <Text as="p" variant="bodySmall" prominence="weak">
        info
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
