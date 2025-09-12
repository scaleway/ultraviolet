import { Template } from './Template.stories'

export const Indented = Template.bind({})

Indented.args = {
  children: `{
  "name": "John Doe",
  "age": 30,
  "email": "john.doe@example.com",
  "isActive": true,
  "roles": ["admin", "user"],
  "address": {
    "street": "123 Main St",
    "city": "Metropolis",
    "zip": "12345"
  }
}`,
}

Indented.parameters = {
  docs: {
    description: {
      story:
        'If you add indentation to the code snippet, it will be preserved.',
    },
  },
}
