export type Event = {
  name: string;
  time: string;
};

const schedule: Event[] = [
  {
    name: "Registration",
    time: "12:00pm - 12:30"
  },
  {
    name: "Opening Ceremony",
    time: "12:30 - 1:00"
  },
  {
    name: "Work Period",
    time: "1:00 - 5:30"
  },
  {
    name: "Judging & Activity",
    time: "5:30 - 6:00"
  },
  {
    name: "Closing Ceremony",
    time: "6:00 - 7:00pm"
  }
];

export default schedule;
