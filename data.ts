import { Interval } from "luxon";
import { DefenseCommitee, Project, Teacher } from "./types";

export const defenseCommitee: DefenseCommitee = {
  id: 1,
  course: "Ciência da computação",
  semester: "2022/02",
  defensePeriodStart: new Date(2022, 12, 1),
  defensePeriodEnd: new Date(2022, 12, 20),
  defenseTimeInMinutes: 60,
  endOfDay: 20,
  startOfDay: 8,
  teachersPerCommitee: 2,
};

export const teacherLucas: Teacher = {
  name: "Lucas Heim",
  availablePeriods: [
    {
      defenseCommitee: 1,
      availability: [
        Interval.fromDateTimes(
          new Date(2022, 12, 2, 8, 0, 0),
          new Date(2022, 12, 2, 12, 0, 0)
        ),
        Interval.fromDateTimes(
          new Date(2022, 12, 2, 15, 0, 0),
          new Date(2022, 12, 2, 17, 0, 0)
        ),
      ],
    },
  ],
};

export const teacherMateus: Teacher = {
  name: "Mateus Raeder",
  availablePeriods: [
    {
      defenseCommitee: 1,
      availability: [
        Interval.fromDateTimes(
          new Date(2022, 12, 2, 13, 0, 0),
          new Date(2022, 12, 2, 17, 0, 0)
        ),
      ],
    },
  ],
};

export const project: Project = {
  advisor: teacherLucas,
  preferredTeachers: [teacherMateus],
  defenseCommitee: defenseCommitee,
};
