#!/bin/bash

if [ -z "$1" ]; then
    echo "Error: one parameter is missing, you should pass an url that contains JSON tokens as parameter: ./figma-synchronisetokens.sh [URL]"
    exit 1
fi

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

  # We get unit value
  UNIT=$(echo "${JSON}" | jq --sort-keys --arg global "${GLOBAL}" '.[$global].unit.value | tonumber')

  # Gives all shades and their colors in hexadecimal values
  PARSED_SHADES=$(echo "${JSON}" | jq --sort-keys --arg theme "${THEME}" '
  reduce (.[$theme].shades | to_entries | .[]) as $sentiment
    ({}; . + {"\($sentiment.key)": (
      reduce($sentiment.value | to_entries | .[]) as $shade
        ({}; . + { "\($shade.key)": ($shade.value.value | ascii_downcase) })) })
  ')
  # Match tokens and shades colors
  GENERATED_TOKENS_COLOR=$(echo "${JSON}" | jq --sort-keys --arg global "${GLOBAL}" --argjson shades "${PARSED_SHADES}" '
  .[$global] | with_entries(select(.value | has("backgroundStrong"))) |
    reduce (. | to_entries | .[]) as $sentiment
      ({}; . + {"\($sentiment.key)": (reduce($sentiment.value | to_entries | .[]) as $token
        ({}; . + { "\($token.key)": ($token.value.value | gsub("[$]"; ".") | split(".") as $number | $shades[$number[2]][$number[3]]) })) }) |
          {"colors": .}
  ')
  # Overload of tokens colors specific to each theme, depending
  GENERATED_OVERLOADED_COLORS=$(echo "${JSON}" | jq --sort-keys --arg theme "${THEME}" --argjson shades "${PARSED_SHADES}" '
  .[$theme] | with_entries(select(.value | has("backgroundWeakElevated"))) |
    reduce (. | to_entries | .[]) as $sentiment
      ({}; . + {"\($sentiment.key)": (reduce($sentiment.value | to_entries | .[]) as $token
        ({}; . + { "\($token.key)": ($token.value.value | gsub("[$]"; ".") | split(".") as $number | $shades[$number[2]][$number[3]]) })) }) |
          {"colors": .}
  ')

  # Gives all colors of shadows
  SHADOWS_COLOR=$(echo "${JSON}" | jq --sort-keys --arg theme "${THEME}" '
    reduce (.[$theme].shadows | to_entries | .[]) as $sentiment
      ({}; . + {"\($sentiment.key)": (reduce($sentiment.value | to_entries | .[]) as $shade
        ({}; . + { "\($shade.key)": $shade.value.value })) })
  ')
  # Match all shadows properties including color in one line
  GENERATED_SHADOW_TOKENS=$(echo "${JSON}" | jq --sort-keys --arg global "${GLOBAL}" --argjson shadows_color "${SHADOWS_COLOR}" '
  .[$global] | with_entries(select(.value.type == "boxShadow")) |
    reduce (. | to_entries | .[]) as $sentiment
      ({}; . + {"\($sentiment.key)": "\($sentiment.value.value.x)px \($sentiment.value.value.y)px \($sentiment.value.value.blur)px \($sentiment.value.value.spread)px \($sentiment.value.value.color | gsub("[$]shadows."; "") |
          split(".") as $number |
            $shadows_color[$number[0]][$number[1]])"}) |
              {"shadows": .}
  ')

  # There are others colors for overlay for example
  GENERATED_OTHERS_TOKENS=$(echo "${JSON}" | jq --sort-keys --arg theme "${THEME}" '
    reduce (.[$theme].others | to_entries | .[]) as $sentiment
      ({}; . + {"\($sentiment.key)": $sentiment.value.value}) | {"colors": .}
  ')

  # Line height generated used for typography
  GENERATED_LINE_HEIGHT=$(echo "${JSON}" | jq --sort-keys --arg global "${GLOBAL}" --argjson unit "${UNIT}" '
  .[$global].lineHeight |
    reduce (. | to_entries | .[]) as $size ({}; . + {"\($size.key)": ($size.value.value | split("*") as $param | $param[1] | tonumber * $unit | tostring + "px")})')

  # Font size generated used for typography
  GENERATED_FONT_SIZES=$(echo "${JSON}" | jq --sort-keys --arg global "${GLOBAL}" '.[$global].fontSize | reduce (. | to_entries | .[]) as $size ({}; . + {"\($size.key)": ($size.value.value + "px")})')

  # Fully generated typography properties
  GENERATED_TYPOGRAPHY=$(echo "${JSON}" | jq --sort-keys --arg global "${GLOBAL}" --argjson lineHeight "${GENERATED_LINE_HEIGHT}" --argjson fontSize "${GENERATED_FONT_SIZES}" '
  .[$global] | with_entries(select(.value.type == "typography")) |
    reduce (. | to_entries | .[]) as $typography
      ({}; . + {"\($typography.key)": (reduce($typography.value.value | to_entries | .[]) as $property
        ({}; . + {"\($property.key)": ($property.value | split(".") as $value | if $value[1] != null then ($value[0] | gsub("[$]"; "") as $variableName | if $variableName == "fontSize" then $fontSize[$value[1]] else $lineHeight[$value[1]] end) else $value[0] end)
          }))}) | {"typography": .}')

  FINAL_RESULT=$(echo "${GENERATED_TOKENS_COLOR}" "${GENERATED_OVERLOADED_COLORS}" "${GENERATED_SHADOW_TOKENS}" "${GENERATED_OTHERS_TOKENS}" "${GENERATED_TYPOGRAPHY}" | jq --slurp --sort-keys '.[0] * .[1] * .[2] * .[3] * .[4]')
}

# Generate theme tokens and create file into "src/theme/tokens"
for i in "${themes[@]}"
do
   echo "Generating theme: $i"
   generateTokens "$i"

   # Generate colors tokens
   (printf "/**
 * Provides all tokens of a specific theme edited by design team.
 * This file is automatically generated from /scripts/figma-synchronise-tokens.sh.
 * PLEASE DO NOT EDIT HERE
 */
export default "; echo "${FINAL_RESULT}") > packages/ui/src/theme/tokens/"${i}".ts
done
