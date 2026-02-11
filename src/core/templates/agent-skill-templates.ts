export type AgentSkillId = 'proposal' | 'apply' | 'archive' | 'agentsmd-check';
import { applyTemplate, applyFrontmatter } from './apply-template.js';
import { archiveTemplate, archiveFrontmatter } from './archive-template.js';
import { proposalTemplate, proposalFrontmatter } from './proposal-template.js';
import {
  agentsmdCheckTemplate,
  agentsmdCheckFrontmatter,
} from './agentsmd-check-template.js';

export const agentSkillBodies: Record<AgentSkillId, string> = {
  proposal: proposalTemplate,
  apply: applyTemplate,
  archive: archiveTemplate,
  'agentsmd-check': agentsmdCheckTemplate,
};

export const agentSkillFrontmatter: Record<AgentSkillId, string> = {
  proposal: proposalFrontmatter,
  apply: applyFrontmatter,
  archive: archiveFrontmatter,
  'agentsmd-check': agentsmdCheckFrontmatter,
};

export function getAgentSkillBody(id: AgentSkillId): string {
  return agentSkillBodies[id];
}

export function getAgentSkillFrontmatter(id: AgentSkillId): string {
  return agentSkillFrontmatter[id];
}
