export type TypeGuardCallback<TValue> = (value: unknown) => value is TValue;

export const jsonParseToType = <TValue>(str: string | null, guardFn: TypeGuardCallback<TValue>): TValue | null => {
  if (str === null) return null;

  try {
    const parsed: unknown = JSON.parse(str);

    return guardFn(parsed) ? parsed : null;
  } catch {
    return null;
  }
};
