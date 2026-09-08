import { Template } from './Template.stories'

export const LongSingleLine = Template.bind({})

LongSingleLine.args = {
  children:
    'pnpm add @ultraviolet/ui; pnpm install; pnpm start; pnpm build; pnpm test:unit; pnpm test:visual; pnpm build:storybook;',
}
