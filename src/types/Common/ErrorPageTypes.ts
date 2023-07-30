const ErrorPageTypes = [
  'FORBIDDEN',
  'NOT_FOUND',
  'INTERNAL_SERVER_ERROR',
] as const;

export function isErrorPageType(type: unknown) {
  if (typeof type !== 'string') return false;
  return ErrorPageTypes.includes(type as ErrorPageType);
}

export type ErrorPageType = (typeof ErrorPageTypes)[number];
