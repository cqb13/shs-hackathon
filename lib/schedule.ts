export type Event = {
  name: string;
  time: string;
};

const schedule: Event[] = [
  {
    name: "Registration & Introduction",
    time: "12:00pm - 12:30"
  },
  {
    name: "Work Period",
    time: "12:30 - 12:00"
  },
  {
    name: "Check-in & Afternoon Snack",
    time: "12:00 - 1:00"
  },
  {
    name: "Working Period & Submission",
    time: "1:00 - 5:00"
  },
  {
    name: "Showcase & Judging & Dinner",
    time: "5:00 - 6:30"
  },
  {
    name: "Closing Ceremony",
    time: "6:30 - 7:00"
  }
];

export default schedule;
