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

const UNIVERSAL_AGENTS_SUPPORTED_PROVIDERS = [
  'Codex',
  'Amp',
  'VS Code',
  'Zed',
  'Warp',
  'Goose',
];

const UNIVERSAL_AGENTS_PROVIDER_PREVIEW_COUNT = 5;

const universalAgentsProviderPreview = UNIVERSAL_AGENTS_SUPPORTED_PROVIDERS.slice(
  0,
  UNIVERSAL_AGENTS_PROVIDER_PREVIEW_COUNT
).join(', ');

const universalAgentsProviderSuffix =
  UNIVERSAL_AGENTS_SUPPORTED_PROVIDERS.length > UNIVERSAL_AGENTS_PROVIDER_PREVIEW_COUNT
    ? ', ...'
    : '';

const UNIVERSAL_AGENTS_OPTION_LABEL = `Universal agent skills (${universalAgentsProviderPreview}${universalAgentsProviderSuffix})`;

export const LEGACY_TOOL_ALIASES: Record<string, string> = {
  agents: 'universal',
  amp: 'universal',
  antigravity: 'universal',
  auggie: 'augment',
  claude: 'claude-code',
  codex: 'universal',
  cursor: 'universal',
  deepagents: 'universal',
  factory: 'droid',
  gemini: 'universal',
  'gemini-cli': 'universal',
  goose: 'universal',
  'github-copilot': 'universal',
  iflow: 'iflow-cli',
  'kimi-cli': 'universal',
  kilocode: 'kilo',
  opencode: 'universal',
  qwen: 'qwen-code',
  replit: 'universal',
  roocode: 'roo',
  warp: 'universal',
};

export function normalizeToolId(toolId: string): string {
  const normalized = toolId.trim().toLowerCase();
  return LEGACY_TOOL_ALIASES[normalized] ?? normalized;
}

export const AI_TOOLS: AIToolOption[] = [
  { name: UNIVERSAL_AGENTS_OPTION_LABEL, value: 'universal', available: true, successLabel: 'Universal agent skills' },
  { name: 'Amazon Q Developer', value: 'amazon-q', available: true, successLabel: 'Amazon Q Developer' },
  { name: 'Augment', value: 'augment', available: true, successLabel: 'Augment' },
  { name: 'Claude Code', value: 'claude-code', available: true, successLabel: 'Claude Code' },
  { name: 'Cline', value: 'cline', available: true, successLabel: 'Cline' },
  { name: 'CodeBuddy', value: 'codebuddy', available: true, successLabel: 'CodeBuddy' },
  { name: 'Command Code', value: 'command-code', available: true, successLabel: 'Command Code' },
  { name: 'Continue', value: 'continue', available: true, successLabel: 'Continue' },
  { name: 'CoStrict', value: 'costrict', available: true, successLabel: 'CoStrict' },
  { name: 'Cortex Code', value: 'cortex', available: true, successLabel: 'Cortex Code' },
  { name: 'Crush', value: 'crush', available: true, successLabel: 'Crush' },
  { name: 'Droid', value: 'droid', available: true, successLabel: 'Droid' },
  { name: 'iFlow CLI', value: 'iflow-cli', available: true, successLabel: 'iFlow CLI' },
  { name: 'Junie', value: 'junie', available: true, successLabel: 'Junie' },
  { name: 'Kilo Code', value: 'kilo', available: true, successLabel: 'Kilo Code' },
  { name: 'Kiro CLI', value: 'kiro-cli', available: true, successLabel: 'Kiro CLI' },
  { name: 'Kode', value: 'kode', available: true, successLabel: 'Kode' },
  { name: 'MCPJam', value: 'mcpjam', available: true, successLabel: 'MCPJam' },
  { name: 'Mistral Vibe', value: 'mistral-vibe', available: true, successLabel: 'Mistral Vibe' },
  { name: 'Mux', value: 'mux', available: true, successLabel: 'Mux' },
  { name: 'Neovate', value: 'neovate', available: true, successLabel: 'Neovate' },
  { name: 'OpenClaw', value: 'openclaw', available: true, successLabel: 'OpenClaw' },
  { name: 'OpenHands', value: 'openhands', available: true, successLabel: 'OpenHands' },
  { name: 'Pochi', value: 'pochi', available: true, successLabel: 'Pochi' },
  { name: 'Pi', value: 'pi', available: true, successLabel: 'Pi' },
  { name: 'Qoder', value: 'qoder', available: true, successLabel: 'Qoder' },
  { name: 'Qwen Code', value: 'qwen-code', available: true, successLabel: 'Qwen Code' },
  { name: 'Roo Code', value: 'roo', available: true, successLabel: 'Roo Code' },
  { name: 'Trae', value: 'trae', available: true, successLabel: 'Trae' },
  { name: 'Trae CN', value: 'trae-cn', available: true, successLabel: 'Trae CN' },
  { name: 'Windsurf', value: 'windsurf', available: true, successLabel: 'Windsurf' },
  { name: 'Zencoder', value: 'zencoder', available: true, successLabel: 'Zencoder' },
  { name: 'AdaL', value: 'adal', available: true, successLabel: 'AdaL' },
];
