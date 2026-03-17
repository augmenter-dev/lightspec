export const LIGHTSPEC_DIR_NAME = 'lightspec';

export const LIGHTSPEC_MARKERS = {
  start: '<!-- LIGHTSPEC:START -->',
  end: '<!-- LIGHTSPEC:END -->'
};

export interface LightSpecConfig {
  aiTools: string[];
  skillLocation: 'project' | 'home';
}

export interface AIToolOption {
  name: string;
  value: string;
  available: boolean;
  successLabel?: string;
}

const AGENTS_DIRECTORY_SUPPORTED_PROVIDERS = [
  'Amp',
  'VS Code',
  'Zed',
  'Warp',
  'Aider',
  'Goose',
];

const AGENTS_PROVIDER_PREVIEW_COUNT = 5;

const agentsProviderPreview = AGENTS_DIRECTORY_SUPPORTED_PROVIDERS.slice(
  0,
  AGENTS_PROVIDER_PREVIEW_COUNT
).join(', ');

const agentsProviderSuffix =
  AGENTS_DIRECTORY_SUPPORTED_PROVIDERS.length > AGENTS_PROVIDER_PREVIEW_COUNT
    ? ', ...'
    : '';

const AGENTS_DIRECTORY_OPTION_LABEL = `AGENTS.md + .agents (${agentsProviderPreview}${agentsProviderSuffix})`;

export const LEGACY_TOOL_ALIASES: Record<string, string> = {
  agents: 'universal',
  auggie: 'augment',
  claude: 'claude-code',
  factory: 'droid',
  gemini: 'gemini-cli',
  iflow: 'iflow-cli',
  kilocode: 'kilo',
  qwen: 'qwen-code',
  roocode: 'roo',
};

export function normalizeToolId(toolId: string): string {
  const normalized = toolId.trim().toLowerCase();
  return LEGACY_TOOL_ALIASES[normalized] ?? normalized;
}

export const AI_TOOLS: AIToolOption[] = [
  { name: 'Amazon Q Developer', value: 'amazon-q', available: true, successLabel: 'Amazon Q Developer' },
  { name: 'Amp', value: 'amp', available: true, successLabel: 'Amp' },
  { name: 'Antigravity', value: 'antigravity', available: true, successLabel: 'Antigravity' },
  { name: 'Augment', value: 'augment', available: true, successLabel: 'Augment' },
  { name: 'Claude Code', value: 'claude-code', available: true, successLabel: 'Claude Code' },
  { name: 'Cline', value: 'cline', available: true, successLabel: 'Cline' },
  { name: 'CodeBuddy', value: 'codebuddy', available: true, successLabel: 'CodeBuddy' },
  { name: 'Command Code', value: 'command-code', available: true, successLabel: 'Command Code' },
  { name: 'Continue', value: 'continue', available: true, successLabel: 'Continue' },
  { name: 'CoStrict', value: 'costrict', available: true, successLabel: 'CoStrict' },
  { name: 'Cortex Code', value: 'cortex', available: true, successLabel: 'Cortex Code' },
  { name: 'Crush', value: 'crush', available: true, successLabel: 'Crush' },
  { name: 'Cursor', value: 'cursor', available: true, successLabel: 'Cursor' },
  { name: 'Codex', value: 'codex', available: true, successLabel: 'Codex' },
  { name: 'Deep Agents', value: 'deepagents', available: true, successLabel: 'Deep Agents' },
  { name: 'Droid', value: 'droid', available: true, successLabel: 'Droid' },
  { name: 'Gemini CLI', value: 'gemini-cli', available: true, successLabel: 'Gemini CLI' },
  { name: 'GitHub Copilot', value: 'github-copilot', available: true, successLabel: 'GitHub Copilot' },
  { name: 'Goose', value: 'goose', available: true, successLabel: 'Goose' },
  { name: 'iFlow CLI', value: 'iflow-cli', available: true, successLabel: 'iFlow CLI' },
  { name: 'Junie', value: 'junie', available: true, successLabel: 'Junie' },
  { name: 'Kilo Code', value: 'kilo', available: true, successLabel: 'Kilo Code' },
  { name: 'Kimi Code CLI', value: 'kimi-cli', available: true, successLabel: 'Kimi Code CLI' },
  { name: 'Kiro CLI', value: 'kiro-cli', available: true, successLabel: 'Kiro CLI' },
  { name: 'Kode', value: 'kode', available: true, successLabel: 'Kode' },
  { name: 'MCPJam', value: 'mcpjam', available: true, successLabel: 'MCPJam' },
  { name: 'Mistral Vibe', value: 'mistral-vibe', available: true, successLabel: 'Mistral Vibe' },
  { name: 'Mux', value: 'mux', available: true, successLabel: 'Mux' },
  { name: 'Neovate', value: 'neovate', available: true, successLabel: 'Neovate' },
  { name: 'OpenClaw', value: 'openclaw', available: true, successLabel: 'OpenClaw' },
  { name: 'OpenCode', value: 'opencode', available: true, successLabel: 'OpenCode' },
  { name: 'OpenHands', value: 'openhands', available: true, successLabel: 'OpenHands' },
  { name: 'Pochi', value: 'pochi', available: true, successLabel: 'Pochi' },
  { name: 'Pi', value: 'pi', available: true, successLabel: 'Pi' },
  { name: 'Qoder', value: 'qoder', available: true, successLabel: 'Qoder' },
  { name: 'Qwen Code', value: 'qwen-code', available: true, successLabel: 'Qwen Code' },
  { name: 'Replit', value: 'replit', available: true, successLabel: 'Replit' },
  { name: 'Roo Code', value: 'roo', available: true, successLabel: 'Roo Code' },
  { name: 'Trae', value: 'trae', available: true, successLabel: 'Trae' },
  { name: 'Trae CN', value: 'trae-cn', available: true, successLabel: 'Trae CN' },
  { name: AGENTS_DIRECTORY_OPTION_LABEL, value: 'universal', available: true, successLabel: 'Universal' },
  { name: 'Warp', value: 'warp', available: true, successLabel: 'Warp' },
  { name: 'Windsurf', value: 'windsurf', available: true, successLabel: 'Windsurf' },
  { name: 'Zencoder', value: 'zencoder', available: true, successLabel: 'Zencoder' },
  { name: 'AdaL', value: 'adal', available: true, successLabel: 'AdaL' },
];
