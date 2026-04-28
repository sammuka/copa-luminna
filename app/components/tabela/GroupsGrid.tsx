import { GROUPS } from "@/app/types";
import GroupCard from "./GroupCard";
import CornerOrnaments from "./CornerOrnaments";

export default function GroupsGrid() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 md:px-8 py-10 md:py-14">
      <CornerOrnaments />
      <div className="grid gap-5 md:gap-7 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {GROUPS.map((g, i) => (
          <GroupCard key={g.letter} group={g} index={i} />
        ))}
      </div>
    </section>
  );
}
