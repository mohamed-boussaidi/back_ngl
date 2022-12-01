export default function omit<T>(obj: T, property: keyof T | (keyof T)[]) {
  if (Array.isArray(property)) {
    const rest = { ...obj };
    property.forEach((prop) => {
      delete rest[prop];
    });
    return rest;
  }
  const { [property]: unused, ...rest } = obj;
  return rest;
}
