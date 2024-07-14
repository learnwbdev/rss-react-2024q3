type TypeGuardCallback<TValue> = (value: unknown) => value is TValue;

export const jsonParseToType = <TValue>(str: string, guardFn: TypeGuardCallback<TValue>): TValue | null => {
  try {
    const parsed: unknown = JSON.parse(str);

    return guardFn(parsed) ? parsed : null;
  } catch {
    return null;
  }
};
