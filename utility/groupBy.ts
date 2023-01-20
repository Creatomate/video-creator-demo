export function groupBy<K, V>(items: V[], iteratee: (value: V) => K): Map<K, V[]> {
  return items.reduce((map, value) => {

    const key = iteratee(value);

    let array = map.get(key);
    if (!array) {
      array = [];
      map.set(key, array);
    }

    array.push(value);

    return map;

  }, new Map<K, V[]>());
}
