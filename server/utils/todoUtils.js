export const escapeRegex = (str = "") => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

export const normalizeSpaces = (str = "") => {
  return str.replace(/\s+/g, " ").trim();
};

// ✅ Flexible search: handles both "task23" → "task 23" and "task 23" → "task23"
export const buildSearchQuery = (search = "") => {
  if (!search.trim()) return {};

  const normalized = normalizeSpaces(search);
  const escaped = escapeRegex(normalized);

  // Example: "task23" becomes /t\s*a\s*s\s*k\s*2\s*3/i
  const flexible = escaped.split("").join("\\s*");

  const regex = new RegExp(flexible, "i");
  console.log("✅ Flexible regex query:", regex);

  return { text: regex };
};
