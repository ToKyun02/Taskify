export type HexColor = `#${string}`;

export const DEFAULT_COLORS = ['#7AC555', '#760DDE', '#FFA500', '#76A5EA', '#E876EA'] as const satisfies HexColor[];
export type DEFAULT_COLOR = (typeof DEFAULT_COLORS)[number];
