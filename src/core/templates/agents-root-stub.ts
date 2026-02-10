export const agentsRootStubTemplate = `# LightSpec Instructions

These instructions are for AI assistants working in this project.

**If (and only if) the feature is complex** (new capability, breaking change, architecture/performance/security work), follow these steps:

- [ ] Suggest switching to \`/plan\` mode before writing the proposal if it's not already the case
- [ ] Run \`lightspec-proposal\`.
- [ ] Do not implement the feature until the proposal is approved by the user. Implementation MUST be operated using \`lightspec-apply\` to ensure the implementation is properly tracked and documented.
- [ ] If unsure which skill to run, list installed skills.

Keep this managed block so 'lightspec update' can refresh the instructions.
`;
