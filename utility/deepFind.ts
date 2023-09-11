export function deepFind(predicate: (value: any) => boolean, value: any): any | undefined {
  if (typeof value === 'object') {
    if (value != null) {
      if (predicate(value)) {
        return value;
      }

      for (const key in value) {
        const foundValue = deepFind(predicate, value[key]);
        if (foundValue) {
          return foundValue;
        }
      }
    }
  }

  return undefined;
}
