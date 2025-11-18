import { Template } from './Template.stories'

export const Playground = Template.bind({})

Playground.args = { ...Template.args }

Playground.parameters = {
  docs: {
    description: {
      story: `Use prop \`item\` to define the element to add in the order summary. Items are defined by categories, and each category have a few prop
- \`category\` (**required**): name of the category (*string*)
- \`additionalInfo\`: data to add right next to the category title (*ReactNode*) 
- \`discount\`: discount to apply to the whole category (if <1, in %, else absolute value). The price without discount is displayed struck through next to the discounted price (*number*)
- \`customContent\`: hide the price of the category and display this content instead (*ReactNode*)
- \`allowNegative\`: set to \`true\` if the category price can be < 0 (e.g coupons) (*boolean*)
- \`subCategories\`: list of the sub-categories in the category. A sub-category consists of :
        - \`title\`: title of the sub-category (*string*)
        - \`price\`: price of the sub-category. When a price is defined as a range, the final cost will be displayed as a range too (*number* for a fixed price, *[number, number]* for a range).
        - \`details\`: list of elements to be displayed in the subCategory (*string[]*)
        - \`amount\`: quantity. The price is computed taking into account the amount : \`finalPrice = amount * price\` (*number*)
        - \`amountFree\`: quantity free: \`finalPrice = (amount - amountFree) * price\` (*number*)
        - \`fixedPrice\`: when set to \`true\`, the final price does not depend on the time (*boolean*)
        - \`priceUnit\`: Suffix to be displayed after the price (generally, the unit). Be careful, when \`priceUnit\` is defined, the overall price displayed next to the **sub-category** does not taking into account the amount - see Story \`Price Unit\` for an example (*string*)
        - \`hidePrice\`: set to \`true\` to hide the price of the sub-category (*boolean*)
        - \`customContent\`: content to display next to the price (*ReactNode*)
        - \`numberInput\`: set to \`true\` to display a number input (*boolean*)
        - \`numberInputValue\`: value of the number input (*number*)
        - \`numberInputUnit\`: unit of the number input (*string*)
        - \`numberInputControls\`: set to \`true\` to display controls for the number input (*boolean*)
        - \`onChangeInput\`: function to call when the number input changes (*function*)
        - \`additionalInfo\`: data to add right next to the subcategory title (*ReactNode*)


The price of the category is computed automatically. For a category without sub-category, set the price like so: \`{ category: "categoryName", subCategories: {[ price: 10, hidePrice: true ]}}\`
    `,
    },
  },
}
