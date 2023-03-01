import { Template } from './Template.stories'

export const Columns = Template.bind({})

Columns.args = Template.args

Columns.parameters = {
  docs: {
    storyDescription:
      'By default List divides width equally available space between rows. To force the `width` of a column you can specify by specify a width (px, em, percent).\n\nThe `label` of a column represents the text of a column in list header.\n\nYou can also `sort` columns, please check the `Sortable` story.',
  },
}
