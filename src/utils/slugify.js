function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric with dashes
    .replace(/(^-|-$)+/g, ""); // Remove leading/trailing dashes
}

export { slugify };
