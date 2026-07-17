import {
  Schema,
  model,
  models,
  type InferSchemaType,
  type Model,
} from "mongoose";

import { ENROLLMENT_STATUSES } from "@/constants/enrollment";

const enrollmentSchema = new Schema(
  {
    fullName: { type: String, required: true, trim: true, maxlength: 120 },
    phone: { type: String, required: true, trim: true, maxlength: 40 },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 160,
    },
    childAge: { type: String, required: true, trim: true, maxlength: 60 },
    childGrade: { type: String, required: true, trim: true, maxlength: 60 },
    course: { type: String, required: true, trim: true, maxlength: 120 },
    preferredDays: { type: [String], default: [] },
    preferredSchedule: { type: String, default: "", trim: true, maxlength: 40 },
    message: { type: String, default: "", trim: true, maxlength: 2000 },
    status: {
      type: String,
      enum: ENROLLMENT_STATUSES,
      default: "new",
      index: true,
    },
    consent: { type: Boolean, required: true },
    source: { type: String, default: "website", trim: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

enrollmentSchema.index({ createdAt: -1 });
enrollmentSchema.index({ fullName: "text", email: "text", phone: "text" });

export type EnrollmentDocument = InferSchemaType<typeof enrollmentSchema>;

export const Enrollment: Model<EnrollmentDocument> =
  (models.Enrollment as Model<EnrollmentDocument>) ??
  model<EnrollmentDocument>("Enrollment", enrollmentSchema);
