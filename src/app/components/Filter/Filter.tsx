import React from "react";
import styles from "./Filter.module.css";

type FilterProps = {
  selectedTag: string;
  setSelectedTag: (tag: string) => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (order: "asc" | "desc") => void;
  tags: string[];
};

export function Filter({
  selectedTag,
  setSelectedTag,
  sortOrder,
  setSortOrder,
  tags,
}: FilterProps) {
  return (
    <div className={styles.filters}>
      <label htmlFor="tag-filter">Par état: </label>
      <select
        id="tag-filter"
        value={selectedTag}
        onChange={(e) => setSelectedTag(e.target.value)}
      >
        <option value="">All</option>
        {tags.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>

      <label htmlFor="sort-name">Par date d'ajout: </label>
      <select
        id="sort-name"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
      >
        <option value="asc">Plus ancien</option>
        <option value="desc">Plus récent</option>
      </select>
    </div>
  );
}
