import type { StoryFn } from '@storybook/react'
import { VerificationCode, verificationCodeSizes } from '..'
import { Stack } from '../..'

export const Size: StoryFn<typeof VerificationCode> = args => (
  <Stack alignItems="center" gap={2} direction="row">
    {verificationCodeSizes.map(size => (
      <VerificationCode
        {...args}
        key={size}
        size={size}
        fields={1}
        initialValue="1"
      />
    ))}
  </Stack>
)

Size.parameters = {
  docs: {
    description: { story: 'use `size` prop to change the size of the input' },
  },
}
