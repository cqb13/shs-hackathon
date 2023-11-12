export type Event = {
  name: string;
  time: string;
};

const schedule: Event[] = [
  {
    name: "Registration & Introduction",
    time: "9:00 - 9:30"
  },
  {
    name: "Work Period",
    time: "9:30 - 12:00"
  },
  {
    name: "Check-in & Lunch",
    time: "12:00 - 1:30"
  },
  {
    name: "Working Period & Submission",
    time: "1:30 - 7:00"
  },
  {
    name: "Showcase & Judging & Dinner",
    time: "7:00 - 8:30"
  },
  {
    name: "Closing Ceremony",
    time: "8:30 - 9:00"
  }
];

export default schedule;
