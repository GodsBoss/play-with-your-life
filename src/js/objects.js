export function sorted(criterium) {
  return (objects) => {
    const sortedObjects = objects.slice()
    sortedObjects.sort(criterium)
    return sortedObjects
  }
}

export const sortCriteria = {
  // byZ sorts objects by Z, with smaller Zs before bigger ones.
  byZ: (first, second) => {
    const firstZ = typeof first.z === 'number' ? first.z : 0
    const secondZ = typeof second.z === 'number' ? second.z : 0
    return firstZ - secondZ
  },
  // reversed takes an existing criterium and reverses it.
  reversed: (criterium) => (first, second) => criterium(second, first)
}

export const filters = {
  // byPosition assumes every object is square.
  byPosition: (position) => (obj) => position.x >= obj.x && position.y >= obj.y && position.x <= obj.x + obj.w && position.y <= obj.y + obj.h,
  byType: (type) => (obj) => obj.type === type,
  byTypes: (...types) => (obj) => types.some((type) => type === obj.type),
  // every takes other predicates and creates a conjunctional filter, essentially creating the intersection of the filtered results.
  every: (...predicates) => (obj) => predicates.every((pred) => pred(obj)),
  // is filters for a specific object.
  is: (pivot) => (obj) => pivot === obj,
  // not negates another predicate.
  not: (predicate) => (obj) => !predicate(obj),
  // every takes other predicates and creates a disjunctional filter, essentialy creating the union of the filtered results.
  some: (...predicates) => (obj) => predicates.some((pred) => pred(obj))
}
