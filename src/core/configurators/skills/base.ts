import os from 'os';
import { FileSystemUtils } from '../../../utils/file-system.js';
import { TemplateManager, AgentSkillId } from '../../templates/index.js';
import { LIGHTSPEC_MARKERS, normalizeToolId } from '../../config.js';

export interface AgentSkillTarget {
  id: AgentSkillId;
  path: string;
  kind: 'skill';
}

export type SkillInstallLocation = 'project' | 'home';

type HomeBase = 'home' | 'codex-home';

interface AgentSkillDescriptor {
  projectSkillDir: string;
  homeSkillDir: string;
  homeBase?: HomeBase;
  aliases?: string[];
  legacyProjectSkillDirs?: string[];
  legacyHomeSkillDirs?: string[];
}

const ALL_SKILL_IDS: AgentSkillId[] = ['proposal', 'apply', 'archive', 'agentsmd-check', 'loop'];

const TOOL_SKILL_DESCRIPTORS: Record<string, AgentSkillDescriptor> = {
  'amazon-q': {
    projectSkillDir: '.amazonq/skills',
    homeSkillDir: '.amazonq/skills',
  },
  adal: {
    projectSkillDir: '.adal/skills',
    homeSkillDir: '.adal/skills',
  },
  augment: {
    projectSkillDir: '.augment/skills',
    homeSkillDir: '.augment/skills',
    aliases: ['auggie'],
    legacyProjectSkillDirs: ['.auggie/skills'],
    legacyHomeSkillDirs: ['.auggie/skills'],
  },
  'claude-code': {
    projectSkillDir: '.claude/skills',
    homeSkillDir: '.claude/skills',
    aliases: ['claude'],
  },
  cline: {
    projectSkillDir: '.agents/skills',
    homeSkillDir: '.agents/skills',
    legacyProjectSkillDirs: ['.cline/skills'],
    legacyHomeSkillDirs: ['.cline/skills'],
  },
  codebuddy: {
    projectSkillDir: '.codebuddy/skills',
    homeSkillDir: '.codebuddy/skills',
  },
  'command-code': {
    projectSkillDir: '.commandcode/skills',
    homeSkillDir: '.commandcode/skills',
  },
  continue: {
    projectSkillDir: '.continue/skills',
    homeSkillDir: '.continue/skills',
  },
  costrict: {
    projectSkillDir: '.cospec/lightspec/skills',
    homeSkillDir: '.cospec/lightspec/skills',
  },
  cortex: {
    projectSkillDir: '.cortex/skills',
    homeSkillDir: '.snowflake/cortex/skills',
  },
  crush: {
    projectSkillDir: '.crush/skills',
    homeSkillDir: '.config/crush/skills',
    legacyHomeSkillDirs: ['.crush/skills'],
  },
  droid: {
    projectSkillDir: '.factory/skills',
    homeSkillDir: '.factory/skills',
    aliases: ['factory'],
  },
  'iflow-cli': {
    projectSkillDir: '.iflow/skills',
    homeSkillDir: '.iflow/skills',
    aliases: ['iflow'],
  },
  junie: {
    projectSkillDir: '.junie/skills',
    homeSkillDir: '.junie/skills',
  },
  kilo: {
    projectSkillDir: '.kilocode/skills',
    homeSkillDir: '.kilocode/skills',
    aliases: ['kilocode'],
  },
  'kiro-cli': {
    projectSkillDir: '.kiro/skills',
    homeSkillDir: '.kiro/skills',
  },
  kode: {
    projectSkillDir: '.kode/skills',
    homeSkillDir: '.kode/skills',
  },
  mcpjam: {
    projectSkillDir: '.mcpjam/skills',
    homeSkillDir: '.mcpjam/skills',
  },
  'mistral-vibe': {
    projectSkillDir: '.vibe/skills',
    homeSkillDir: '.vibe/skills',
  },
  mux: {
    projectSkillDir: '.mux/skills',
    homeSkillDir: '.mux/skills',
  },
  neovate: {
    projectSkillDir: '.neovate/skills',
    homeSkillDir: '.neovate/skills',
  },
  openclaw: {
    projectSkillDir: 'skills',
    homeSkillDir: '.openclaw/skills',
  },
  openhands: {
    projectSkillDir: '.openhands/skills',
    homeSkillDir: '.openhands/skills',
  },
  pochi: {
    projectSkillDir: '.pochi/skills',
    homeSkillDir: '.pochi/skills',
  },
  pi: {
    projectSkillDir: '.pi/skills',
    homeSkillDir: '.pi/agent/skills',
  },
  qoder: {
    projectSkillDir: '.qoder/skills',
    homeSkillDir: '.qoder/skills',
  },
  'qwen-code': {
    projectSkillDir: '.qwen/skills',
    homeSkillDir: '.qwen/skills',
    aliases: ['qwen'],
  },
  roo: {
    projectSkillDir: '.roo/skills',
    homeSkillDir: '.roo/skills',
    aliases: ['roocode'],
    legacyProjectSkillDirs: ['.roocode/skills'],
    legacyHomeSkillDirs: ['.roocode/skills'],
  },
  'trae-cn': {
    projectSkillDir: '.trae/skills',
    homeSkillDir: '.trae-cn/skills',
  },
  trae: {
    projectSkillDir: '.trae/skills',
    homeSkillDir: '.trae/skills',
  },
  universal: {
    projectSkillDir: '.agents/skills',
    homeSkillDir: '.config/agents/skills',
    aliases: [
      'agents',
      'amp',
      'antigravity',
      'codex',
      'cursor',
      'deepagents',
      'gemini',
      'gemini-cli',
      'github-copilot',
      'goose',
      'kimi-cli',
      'opencode',
      'replit',
      'warp',
    ],
    legacyProjectSkillDirs: [
      '.antigravity/skills',
      '.cursor/skills',
      '.codex/skills',
      '.gemini/skills',
      '.github/copilot/skills',
      '.opencode/skills',
    ],
    legacyHomeSkillDirs: [
      '.agents/skills',
      '.antigravity/skills',
      '.cursor/skills',
      '.codex/skills',
      '.deepagents/agent/skills',
      '.gemini/skills',
      '.github/copilot/skills',
      '.copilot/skills',
      '.opencode/skills',
    ],
  },
  windsurf: {
    projectSkillDir: '.windsurf/skills',
    homeSkillDir: '.codeium/windsurf/skills',
    legacyHomeSkillDirs: ['.windsurf/skills'],
  },
  zencoder: {
    projectSkillDir: '.zencoder/skills',
    homeSkillDir: '.zencoder/skills',
  },
};

const TOOL_ID_ALIASES = Object.freeze(
  Object.fromEntries(
    Object.entries(TOOL_SKILL_DESCRIPTORS).flatMap(([toolId, descriptor]) =>
      (descriptor.aliases ?? []).map((alias) => [alias, toolId])
    )
  )
);

export function normalizeAgentSkillToolId(toolId: string): string {
  const normalized = normalizeToolId(toolId);
  return TOOL_ID_ALIASES[normalized] ?? normalized;
}

export const AGENT_SKILL_TOOL_IDS = Object.freeze(
  Object.keys(TOOL_SKILL_DESCRIPTORS)
);

const TOOL_BODY_SUFFIX: Partial<Record<string, string>> = {
  droid: '\n\n$ARGUMENTS',
};

export class AgentSkillConfigurator {
  readonly toolId: string;
  readonly isAvailable: boolean;

  private installLocation: SkillInstallLocation = 'project';

  constructor(toolId: string, isAvailable = true) {
    this.toolId = normalizeAgentSkillToolId(toolId);
    this.isAvailable = isAvailable;

    if (!TOOL_SKILL_DESCRIPTORS[this.toolId]) {
      throw new Error(`No skill root directory configured for tool '${toolId}'`);
    }
  }

  setInstallLocation(location: SkillInstallLocation): void {
    this.installLocation = location;
  }

  getTargets(): AgentSkillTarget[] {
    return ALL_SKILL_IDS.map((id) => ({
      id,
      path: this.getRelativeSkillPath(id),
      kind: 'skill',
    }));
  }

  async generateAll(projectPath: string, _lightspecDir: string): Promise<string[]> {
    const createdOrUpdated: string[] = [];

    for (const target of this.getTargets()) {
      const body = this.getBody(target.id);
      const filePath = this.resolveAbsolutePath(projectPath, target.id);

      if (await FileSystemUtils.fileExists(filePath)) {
        await this.updateBody(filePath, body);
      } else {
        const frontmatter = TemplateManager.getAgentSkillFrontmatter(target.id).trim();
        const content = this.buildSkillFile(frontmatter, body);
        await FileSystemUtils.writeFile(filePath, content);
      }

      createdOrUpdated.push(target.path);
    }

    return createdOrUpdated;
  }

  async updateExisting(projectPath: string, _lightspecDir: string): Promise<string[]> {
    const updated: string[] = [];

    for (const target of this.getTargets()) {
      const candidatePaths = this.resolveExistingAbsolutePaths(projectPath, target.id);

      for (const candidate of candidatePaths) {
        if (!await FileSystemUtils.fileExists(candidate.absolutePath)) {
          continue;
        }

        const body = this.getBody(target.id);
        await this.updateBody(candidate.absolutePath, body);
        updated.push(candidate.relativePath);
      }
    }

    return updated;
  }

  protected getBody(id: AgentSkillId): string {
    const baseBody = TemplateManager.getAgentSkillBody(id).trim();
    const suffix = TOOL_BODY_SUFFIX[this.toolId] ?? '';
    return `${baseBody}${suffix}`;
  }

  resolveAbsolutePath(projectPath: string, id: AgentSkillId): string {
    const relativePath = this.getRelativeSkillPath(id);
    return this.resolvePathFromRelative(projectPath, relativePath);
  }

  resolveExistingAbsolutePaths(
    projectPath: string,
    id: AgentSkillId
  ): Array<{ absolutePath: string; relativePath: string }> {
    const relativePaths = this.getAllRelativeSkillPaths(id);
    return relativePaths.map((relativePath) => ({
      absolutePath: this.resolvePathFromRelative(projectPath, relativePath),
      relativePath,
    }));
  }

  private getRelativeSkillPath(id: AgentSkillId): string {
    const descriptor = this.getDescriptor();
    const skillName = this.getSkillName(id);
    const skillDir = this.installLocation === 'project'
      ? descriptor.projectSkillDir
      : descriptor.homeSkillDir;
    return `${skillDir}/${skillName}/SKILL.md`;
  }

  private getAllRelativeSkillPaths(id: AgentSkillId): string[] {
    const descriptor = this.getDescriptor();
    const skillName = this.getSkillName(id);
    const skillDirs = this.installLocation === 'project'
      ? [descriptor.projectSkillDir, ...(descriptor.legacyProjectSkillDirs ?? [])]
      : [descriptor.homeSkillDir, ...(descriptor.legacyHomeSkillDirs ?? [])];

    return Array.from(new Set(skillDirs.map((dir) => `${dir}/${skillName}/SKILL.md`)));
  }

  private resolvePathFromRelative(projectPath: string, relativePath: string): string {
    if (this.installLocation === 'project') {
      return FileSystemUtils.joinPath(projectPath, relativePath);
    }

    const homeRoot = this.getHomeRootPath();
    return FileSystemUtils.joinPath(homeRoot, relativePath);
  }

  private getDescriptor(): AgentSkillDescriptor {
    const descriptor = TOOL_SKILL_DESCRIPTORS[this.toolId];
    if (!descriptor) {
      throw new Error(`No skill root directory configured for tool '${this.toolId}'`);
    }
    return descriptor;
  }

  private getHomeRootPath(): string {
    const descriptor = this.getDescriptor();
    if (descriptor.homeBase === 'codex-home') {
      const codexHome = process.env.CODEX_HOME?.trim();
      return codexHome && codexHome.length > 0
        ? codexHome
        : FileSystemUtils.joinPath(os.homedir(), '.codex');
    }

    return os.homedir();
  }

  private getSkillName(id: AgentSkillId): string {
    return `lightspec-${id}`;
  }

  private buildSkillFile(frontmatter: string | undefined, body: string): string {
    const sections: string[] = [];
    if (frontmatter) {
      sections.push(frontmatter);
    }
    sections.push(`${LIGHTSPEC_MARKERS.start}\n${body}\n${LIGHTSPEC_MARKERS.end}`);
    return `${sections.join('\n\n')}\n`;
  }

  protected async updateBody(filePath: string, body: string): Promise<void> {
    const content = await FileSystemUtils.readFile(filePath);
    const startIndex = content.indexOf(LIGHTSPEC_MARKERS.start);
    const endIndex = content.indexOf(LIGHTSPEC_MARKERS.end);

    if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
      throw new Error(`Missing LightSpec markers in ${filePath}`);
    }

    const before = content.slice(0, startIndex + LIGHTSPEC_MARKERS.start.length);
    const after = content.slice(endIndex);
    const updatedContent = `${before}\n${body}\n${after}`;

    await FileSystemUtils.writeFile(filePath, updatedContent);
  }
}
