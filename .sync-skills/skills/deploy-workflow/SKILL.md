---
name: deploy-workflow
description: Workflow for deploying and bumping a new version of LightSpec
disable-model-invocation: false
metadata:
  sync:
    version: 2
    hash: sha256-73b8634fddeb723c7fb88dcc90c0475c91f802ed3a0a8e0764db12c48270a3c5
---

Follow these step closely.

1. run `pnpm changeset`
2. run `./scripts/release-manual.sh`
3. run `npm publish`
