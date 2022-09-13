import { Interval } from "luxon";

export interface TeacherAvailability {
  defenseCommitee: number;
  availability: Interval[];
}

export interface Teacher {
  name: string;
  availablePeriods: TeacherAvailability[];
}

export interface Project {
  advisor: Teacher;
  defenseCommitee: DefenseCommitee;
  preferredTeachers: Teacher[];
}

export interface DefenseCommitee {
  id: number;
  course: string;
  semester: string;
  defensePeriodStart: Date;
  defensePeriodEnd: Date;
  startOfDay: number;
  endOfDay: number;
  defenseTimeInMinutes: number;
  teachersPerCommitee: number;
}
