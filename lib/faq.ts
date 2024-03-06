export type Faq = {
  question: string;
  answer: string;
};

const faqs: Faq[] = [
  {
    question: "What do I need to join the Hackathon?",
    answer:
      "To join the Hackathon, you'll need a computer. No specific coding experience is required, and participants from all skill levels are welcome!"
  },
  {
    question: "When and where is the Hackathon?",
    answer:
      "The Hackathon is scheduled for March 12th, from 12:00pm to 7:00pm. The event will take place at Sharon High School."
  },
  {
    question: "How can I register for the Hackathon?",
    answer: "Registration details will be available soon."
  },
  {
    question: "What are the prizes?",
    answer: "We have exciting prizes, including 15 small Arduino kits!"
  },
  {
    question: "How can I contribute as a sponsor?",
    answer:
      "Sponsors play a crucial role by contributing food and prizes. If you or your organization are interested in becoming a sponsor, please contact us through the form on our website."
  }
];

export default faqs;
