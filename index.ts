import { Interval } from "luxon";
import { Project, Teacher } from "./types";
import { project } from "./data";

const getAvailability = (project: Project) => {
  const advisorAvailability = project.advisor.availablePeriods.find(
    (availablePeriod) =>
      availablePeriod.defenseCommitee === project.defenseCommitee.id
  )?.availability;
  const preferredTeachersAvailability = project.preferredTeachers.flatMap(
    ({ availablePeriods }) =>
      availablePeriods.find(
        (availablePeriod) =>
          availablePeriod.defenseCommitee === project.defenseCommitee.id
      )?.availability
  );
  console.log(preferredTeachersAvailability);
  // .flatMap((v) => v?.availability); //errado
  const firstIntersection = advisorAvailability?.find((interval) => {
    for (let i of preferredTeachersAvailability) {
      let intersec = i?.intersection(interval);
      if (intersec) return intersec;
    }
  });
  return firstIntersection;
};

// pega os horarios do orientador
// bate com os horarios do primeiro prof, pega intersec
//     se não bate, vai pro segundo
// bate intersec com horarios do segundo prof -> done

const intersectionSome = (...intervals: Interval[]) => {
  // @ts-ignore next
  return intervals.reduce((prev, curr) => {
    if (!prev) {
      return null;
    }
    return prev.intersection(curr);
  });
};

// console.log(
//   intersectionSome(
//     Interval.fromDateTimes(
//       new Date(2022, 12, 2, 8, 0, 0),
//       new Date(2022, 12, 2, 12, 0, 0)
//     ),
//     Interval.fromDateTimes(
//       new Date(2022, 12, 2, 9, 0, 0),
//       new Date(2022, 12, 2, 11, 0, 0)
//     )
//     // Interval.fromDateTimes(
//     //   new Date(2022, 12, 2, 13, 0, 0),
//     //   new Date(2022, 12, 2, 17, 0, 0)
//     // )
//   ).start.toISOTime()
// );

const availability = getAvailability(project);
console.log(availability?.start.toISOTime());
console.log(availability?.end.toISOTime());

// pega os horarios do orientador
// bate com os horarios do primeiro prof, pega intersec
//     se não bate, vai pro segundo
// bate intersec com horarios do segundo prof -> done

export const getOverlaps = (
  firstTeacher: Teacher,
  secondTeacher: Teacher,
  defenseCommiteeId: number
): Interval[] => {
  const firstAvailability = firstTeacher.availablePeriods.find(
    (record) => (record.defenseCommitee = defenseCommiteeId)
  );
  const secondAvailability = secondTeacher.availablePeriods.find(
    (record) => (record.defenseCommitee = defenseCommiteeId)
  );
  const overlaps: Interval[] = [];
  if (!firstAvailability || !secondAvailability) return overlaps;
  for (let i of firstAvailability.availability) {
    for (let j of secondAvailability.availability) {
      const intersection = i.intersection(j);
      if (intersection) {
        overlaps.push(intersection);
      }
    }
  }
  return overlaps;
};
