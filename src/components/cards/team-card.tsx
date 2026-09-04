import Image from "next/image";

import type { TeamMember } from "@/types";

export function TeamCard({ member }: { member: TeamMember }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-black/[0.03] transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-[4/5] overflow-hidden bg-beige-light">
        <Image
          src={member.image}
          alt={`${member.name}, ${member.role.split(" · ")[0]} la Up for Learning`}
          fill
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 300px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg font-bold text-brand-700">
          {member.name}
        </h3>
        <p className="mt-1 text-sm font-semibold text-gold-600">
          {member.role}
        </p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
          {member.description}
        </p>
      </div>
    </article>
  );
}
