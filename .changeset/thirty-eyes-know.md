---
"@ultraviolet/icons": patch
---

`Flags`: fix `GitlabRunnerLogo` by updating the icons generation files. It now keeps inner `height` and `weight`. No visual impact for other components. Beware, this may break snapshots (`SwedenFlag`, `BaaiLogo`, `GitlabRUnnerLogo`, `NodeJsLogo` and `POwerBiLogo` svg content has been updated)
