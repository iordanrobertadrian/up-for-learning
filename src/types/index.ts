import type { LucideIcon } from "lucide-react";

export type EnrollmentStatus = "new" | "contacted" | "enrolled" | "archived";

export interface EnrollmentDTO {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  childAge: string;
  childGrade: string;
  course: string;
  preferredDays: string[];
  preferredSchedule: string;
  message: string;
  status: EnrollmentStatus;
  consent: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ProcessStep {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
  accent: "brand" | "gold";
}

export interface ValueItem {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: "brand" | "gold";
}

export interface Course {
  slug: string;
  name: string;
  icon: LucideIcon;
  image: string;
  tags: string;
  description: string;
  grades: string;
  accent: "brand" | "gold";
}

export interface ProgramHighlight {
  slug: string;
  title: string;
  tags: string;
  description: string;
  badge: string;
  icon: LucideIcon;
  accent: "brand" | "gold";
}

export interface CategoryItem {
  slug: string;
  title: string;
  icon: LucideIcon;
  image: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
}
