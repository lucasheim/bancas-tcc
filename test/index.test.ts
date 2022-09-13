import assert from "assert";
import { Interval } from "luxon";
import { getOverlaps } from "..";
import { Teacher } from "../types";

const DEFENSE_COMMITEE_ID = 1;

const createTeacher = (...availability: Interval[]): Teacher => ({
  name: "anyName",
  availablePeriods: [
    {
      defenseCommitee: DEFENSE_COMMITEE_ID,
      availability: availability,
    },
  ],
});

describe("overlaps", () => {
  it("should get overlap between teacher availabilities", () => {
    const firstTeacher: Teacher = createTeacher(
      Interval.fromDateTimes(
        new Date(2022, 8, 1, 13, 0, 0),
        new Date(2022, 8, 1, 15, 0, 0)
      )
    );
    const secondTeacher: Teacher = createTeacher(
      Interval.fromDateTimes(
        new Date(2022, 8, 1, 14, 0, 0),
        new Date(2022, 8, 1, 15, 0, 0)
      )
    );

    assert.deepStrictEqual(
      getOverlaps(firstTeacher, secondTeacher, DEFENSE_COMMITEE_ID),
      [
        Interval.fromDateTimes(
          new Date(2022, 8, 1, 14, 0, 0),
          new Date(2022, 8, 1, 15, 0, 0)
        ),
      ]
    );
  });

  it("should get multiple overlaps", () => {
    const firstTeacher: Teacher = createTeacher(
      Interval.fromDateTimes(
        new Date(2022, 8, 1, 9, 0, 0),
        new Date(2022, 8, 1, 12, 0, 0)
      ),
      Interval.fromDateTimes(
        new Date(2022, 8, 1, 16, 0, 0),
        new Date(2022, 8, 1, 17, 0, 0)
      )
    );
    const secondTeacher: Teacher = createTeacher(
      Interval.fromDateTimes(
        new Date(2022, 8, 1, 10, 0, 0),
        new Date(2022, 8, 1, 11, 0, 0)
      ),
      Interval.fromDateTimes(
        new Date(2022, 8, 1, 15, 0, 0),
        new Date(2022, 8, 1, 18, 0, 0)
      )
    );

    assert.deepStrictEqual(
      getOverlaps(firstTeacher, secondTeacher, DEFENSE_COMMITEE_ID),
      [
        Interval.fromDateTimes(
          new Date(2022, 8, 1, 10, 0, 0),
          new Date(2022, 8, 1, 11, 0, 0)
        ),
        Interval.fromDateTimes(
          new Date(2022, 8, 1, 16, 0, 0),
          new Date(2022, 8, 1, 17, 0, 0)
        ),
      ]
    );
  });
});
