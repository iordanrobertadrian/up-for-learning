import "server-only";

import type { FilterQuery } from "mongoose";

import { connectToDatabase } from "@/lib/db";
import {
  Enrollment,
  type EnrollmentDocument,
} from "@/models/enrollment.model";
import type { EnrollmentDTO, EnrollmentStatus } from "@/types";

type EnrollmentLean = EnrollmentDocument & {
  _id: unknown;
  createdAt: Date;
  updatedAt: Date;
};

function toDTO(doc: EnrollmentLean): EnrollmentDTO {
  return {
    id: String(doc._id),
    fullName: doc.fullName,
    phone: doc.phone,
    email: doc.email,
    childAge: doc.childAge,
    childGrade: doc.childGrade,
    course: doc.course,
    preferredDays: Array.isArray(doc.preferredDays) ? doc.preferredDays : [],
    preferredSchedule: doc.preferredSchedule ?? "",
    message: doc.message ?? "",
    status: doc.status as EnrollmentStatus,
    consent: doc.consent,
    createdAt: doc.createdAt.toISOString(),
    updatedAt: doc.updatedAt.toISOString(),
  };
}

export interface CreateEnrollmentData {
  fullName: string;
  phone: string;
  email: string;
  childAge: string;
  childGrade: string;
  course: string;
  preferredDays: string[];
  preferredSchedule: string;
  message: string;
  consent: boolean;
}

export interface FindEnrollmentsParams {
  page: number;
  perPage: number;
  search?: string;
  status?: EnrollmentStatus;
}

export interface FindEnrollmentsResult {
  items: EnrollmentDTO[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export async function createEnrollment(
  data: CreateEnrollmentData,
): Promise<EnrollmentDTO> {
  await connectToDatabase();
  const created = await Enrollment.create({ ...data, source: "website" });
  return toDTO(created.toObject() as EnrollmentLean);
}

export async function findEnrollments(
  params: FindEnrollmentsParams,
): Promise<FindEnrollmentsResult> {
  await connectToDatabase();

  const { page, perPage, search, status } = params;
  const filter: FilterQuery<EnrollmentDocument> = {};

  if (status) {
    filter.status = status;
  }

  if (search && search.trim()) {
    const safe = search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(safe, "i");
    filter.$or = [
      { fullName: regex },
      { email: regex },
      { phone: regex },
      { course: regex },
    ];
  }

  const skip = (page - 1) * perPage;

  const [docs, total] = await Promise.all([
    Enrollment.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(perPage)
      .lean<EnrollmentLean[]>()
      .exec(),
    Enrollment.countDocuments(filter).exec(),
  ]);

  return {
    items: docs.map(toDTO),
    total,
    page,
    perPage,
    totalPages: Math.max(1, Math.ceil(total / perPage)),
  };
}

export async function countByStatus(): Promise<
  Record<EnrollmentStatus, number> & { total: number }
> {
  await connectToDatabase();
  const grouped = await Enrollment.aggregate<{
    _id: EnrollmentStatus;
    count: number;
  }>([{ $group: { _id: "$status", count: { $sum: 1 } } }]).exec();

  const result = {
    new: 0,
    contacted: 0,
    enrolled: 0,
    archived: 0,
    total: 0,
  };

  for (const row of grouped) {
    result[row._id] = row.count;
    result.total += row.count;
  }

  return result;
}

export async function updateEnrollmentStatus(
  id: string,
  status: EnrollmentStatus,
): Promise<EnrollmentDTO | null> {
  await connectToDatabase();
  const updated = await Enrollment.findByIdAndUpdate(
    id,
    { status },
    { new: true },
  )
    .lean<EnrollmentLean>()
    .exec();
  return updated ? toDTO(updated) : null;
}

export async function deleteEnrollment(id: string): Promise<boolean> {
  await connectToDatabase();
  const deleted = await Enrollment.findByIdAndDelete(id).lean().exec();
  return Boolean(deleted);
}
