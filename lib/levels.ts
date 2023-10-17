export type Level = {
  name: string;
  image: string;
  description: string;
};

const levels: Level[] = [
  {
    name: "Beginner",
    image: "https://via.placeholder.com/150",
    description:
      "Nurture your raw passion for technology and gain a strong foothold in solving real-world problems"
  },
  {
    name: "Intermediate",
    image: "https://via.placeholder.com/150",
    description:
      "Expand your horizons and tackle more complex challenges to hone your problem-solving process"
  },
  {
    name: "Advanced",
    image: "https://via.placeholder.com/150",
    description:
      "Prove your mastery in the ultimate showdown of skill, speed, and innovation"
  }
];

export default levels;
