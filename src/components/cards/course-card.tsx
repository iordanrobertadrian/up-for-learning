import Image from "next/image";

import { IconCircle } from "@/components/ui/icon-circle";
import { cn } from "@/lib/utils";
import type { Course } from "@/types";

export function CourseCard({ course }: { course: Course }) {
  return (
    <article className="group flex h-full flex-col rounded-3xl bg-white text-center shadow-card ring-1 ring-black/[0.03] transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative">
        <div className="relative aspect-[16/10] overflow-hidden rounded-t-3xl">
          <Image
            src={course.image}
            alt={`Curs ${course.name} la Up for Learning`}
            fill
            sizes="(max-width: 768px) 100vw, 420px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <span className="absolute -bottom-7 left-6 z-10">
          <IconCircle
            icon={course.icon}
            accent={course.accent}
            size="lg"
            className="rounded-full ring-4 ring-white shadow-soft"
          />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 pt-10">
        <h3
          className={cn(
            "text-xl font-bold uppercase tracking-tight",
            course.accent === "gold" ? "text-gold-600" : "text-brand-700",
          )}
        >
          {course.name}
        </h3>
        <p className="mt-1.5 text-sm font-semibold text-gold-600">
          {course.tags}
        </p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
          {course.description}
        </p>
        <span className="mx-auto mt-5 inline-flex rounded-full bg-sage px-4 py-1.5 text-sm font-semibold text-brand-700">
          {course.grades}
        </span>
      </div>
    </article>
  );
}
