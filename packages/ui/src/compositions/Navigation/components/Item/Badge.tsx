import { Badge } from '../../../../components/Badge'
import type { ItemExpandedType } from '../ComponentsTypes'
import { navigationStyle } from '../../styles.css'

export const ItemBadge = ({
  badgeText,
  disabled,
  badgeSentiment,
}: Pick<ItemExpandedType, 'badgeText' | 'badgeSentiment' | 'disabled'>) =>
  badgeText ? (
    <Badge
      className={navigationStyle.itemBadge}
      disabled={disabled}
      prominence="strong"
      sentiment={badgeSentiment}
      size="small"
    >
      {badgeText}
    </Badge>
  ) : null
