import { Filter } from "@/app/components/Filter";

export default function FilmsPage() {
  return (
    <div>
      <h1>Films</h1>
      <Filter
        selectedTag=""
        setSelectedTag={() => {}}
        sortOrder="asc"
        setSortOrder={() => {}}
        tags={[]}
      />
    </div>
  );
}
