export type TUserProfile = {
  id: number;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  gender: "MALE" | "FEMALE";
  role: number;
  highestEducationLevel: string | null;
  majorSubject: string;
  subjectsToTeach: string | null;
  educationLevel: number;
  medium: number;
  classLevel: string;
  degree: string | null;
  major: string | null;
  semesterOrYear: string;
  user: number;
};
export type TPayload = {
  subject: string;
  message: string;
};
