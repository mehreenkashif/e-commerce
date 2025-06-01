export const filterAndSortProducts = (products, deletedIds, filters) => {
  return products
    .filter((p) => !deletedIds.includes(p.id))
    .filter((p) =>
      filters.searchTerm
        ? p.title.toLowerCase().includes(filters.searchTerm.toLowerCase())
        : true
    )
    .filter((p) =>
      filters.category !== "all" ? p.category === filters.category : true
    )
    .sort((a, b) =>
      filters.sortOrder === "low-high"
        ? a.price - b.price
        : filters.sortOrder === "high-low"
        ? b.price - a.price
        : 0
    );
};
