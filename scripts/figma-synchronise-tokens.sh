#!/bin/bash

# Raw JSON file containing all design tokens passed as first parameter of script
URL=$1

# Global is an alternative object that contains general values applied in any chosen theme
GLOBAL="global"

# We declarer all theme from where to generate tokens
declare -a themes=("light" "dark")

# This function will get JSON, parse it with jq and create all necessary tokens
function generateTokens {
  THEME=$1
  JSON=$(curl "${URL}")
  PARSED_SHADES=$(echo "${JSON}" | jq --sort-keys --arg theme "${THEME}" 'reduce (.[$theme].shades | to_entries | .[]) as $sentiment ({}; . + {"\($sentiment.key)": (reduce($sentiment.value | to_entries | .[]) as $shade ({}; . + { "\($shade.key)": $shade.value.value })) })')
  GENERATED_TOKENS_COLOR=$(echo "${JSON}" | jq --sort-keys --arg theme "${THEME}" --arg global "${GLOBAL}" --argjson shades "${PARSED_SHADES}" '.[$global] | with_entries(select(.value | has("backgroundStrong"))) | reduce (. | to_entries | .[]) as $sentiment ({}; . + {"\($sentiment.key)": (reduce($sentiment.value | to_entries | .[]) as $token ({}; . + { "\($token.key)": ($token.value.value | gsub("[$]"; ".") | split(".") as $number | "\($number[2]).\($number[3])") })) })')
}

# Generate theme tokens and create file into "src/theme/tokens"
for i in "${themes[@]}"
do
   echo "Generating theme: $i"
   generateTokens "$i"

   # Generate shades files for all themes
   (printf "/* Generated file, please do not edit here */\nexport default "; echo "${PARSED_SHADES}") > src/theme/tokens/shades/"${i}".ts
done

# Generate colors tokens associated with shade value
(printf "/* Generated file, please do not edit here */\nexport default "; echo "${GENERATED_TOKENS_COLOR}") > src/theme/tokens/colors/index.ts

yarn run format
