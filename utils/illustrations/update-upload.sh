aws s3 sync packages/illustrations/src s3://test-bucket-illustrations/ --exclude "*" --include "*.webp" --include "*.svg" --acl public-read
node utils/illustrations/uploadIllustrations.js
pnpm prettier --write packages/illustrations/src