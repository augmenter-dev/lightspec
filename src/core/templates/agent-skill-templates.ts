export type AgentSkillId =
  | 'proposal'
  | 'apply'
  | 'archive'
  | 'agentsmd-check'
  | 'loop';
import { applyTemplate, applyFrontmatter } from './apply-template.js';
import { archiveTemplate, archiveFrontmatter } from './archive-template.js';
import { proposalTemplate, proposalFrontmatter } from './proposal-template.js';
import {
  agentsmdCheckTemplate,
  agentsmdCheckFrontmatter,
} from './agentsmd-check-template.js';
import { loopTemplate, loopFrontmatter } from './loop-template.js';

export const agentSkillBodies: Record<AgentSkillId, string> = {
  proposal: proposalTemplate,
  apply: applyTemplate,
  archive: archiveTemplate,
  'agentsmd-check': agentsmdCheckTemplate,
  loop: loopTemplate,
};

export const agentSkillFrontmatter: Record<AgentSkillId, string> = {
  proposal: proposalFrontmatter,
  apply: applyFrontmatter,
  archive: archiveFrontmatter,
  'agentsmd-check': agentsmdCheckFrontmatter,
  loop: loopFrontmatter,
};

export function getAgentSkillBody(id: AgentSkillId): string {
  return agentSkillBodies[id];
}

export function getAgentSkillFrontmatter(id: AgentSkillId): string {
  return agentSkillFrontmatter[id];
}
