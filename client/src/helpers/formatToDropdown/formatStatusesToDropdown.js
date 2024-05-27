export const formatStatusesToDropdown = (statuses) =>
  statuses.map(({ id, key, displayName }) => ({ id, displayName, value: key }));
