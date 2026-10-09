import icon1 from "./public/images/c1.png";
import icon2 from "./public/images/c2.png";
import icon3 from "./public/images/c3.png";
import icon4 from "./public/images/c4.png";
import icon5 from "./public/images/c5.png";
import icon6 from "./public/images/c6.png";

import job1 from "./public/images/icon1.png";
import job2 from "./public/images/icon2.png";
import job3 from "./public/images/icon3.png";
import job4 from "./public/images/icon4.png";
import medical from "./public/images/doctor_9165999.png";
import pharma from "./public/images/pharmacist_2212156.png";

import type { StaticImageData } from "next/image";

export type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  image: StaticImageData;
  salary: string;
  description: string;
  requirements: string;
};

export type JobCategory = {
  id: number;
  name: string;
  description: string;
  icon: StaticImageData;
  jobs: Job[];
  open: number;
};

export const JobData: JobCategory[] = [
  {
    id: 1,
    name: "Technology",
    description: "Explore job opportunities in the tech industry.",
    icon: icon1,
    open: 25,
    jobs: [
      {
        id: 1,
        title: "Software Engineer",
        company: "Tech Solutions Inc.",
        location: "San Francisco, CA",
        image: job1,
        salary: "$80k - $100k",
        description:
          "Design and develop software applications using various programming languages.",
        requirements:
          "Bachelor's degree in Computer Science or related field, proficiency in Java, Python, or C++.",
      },
      {
        id: 2,
        title: "Data Scientist",
        company: "Data Insights Co.",
        location: "New York, NY",
        image: job1,
        salary: "$90k - $110k",
        description:
          "Analyze complex data sets to uncover insights and drive decision-making.",
        requirements:
          "Master's degree in Statistics, Mathematics, or Computer Science, experience with machine learning algorithms.",
      },
      {
        id: 3,
        title: "Web Developer",
        company: "Web Solutions Co.",
        location: "Seattle, WA",
        image: job2,
        salary: "$70k - $90k",
        description:
          "Build and maintain websites and web applications using HTML, CSS, and JavaScript.",
        requirements:
          "Bachelor's degree in Computer Science or related field, proficiency in front-end technologies like React or Angular.",
      },
      {
        id: 4,
        title: "UX/UI Designer",
        company: "Design Innovations Inc.",
        location: "Los Angeles, CA",
        image: job1,
        salary: "$75k - $95k",
        description:
          "Create user-friendly interfaces and designs for digital products and applications.",
        requirements:
          "Bachelor's degree in Design or related field, proficiency in design tools like Adobe XD or Sketch.",
      },
      {
        id: 5,
        title: "Network Engineer",
        company: "Network Solutions Ltd.",
        location: "Chicago, IL",
        image: job4,
        salary: "$85k - $110k",
        description:
          "Design, implement, and manage computer networks to ensure smooth communication and connectivity.",
        requirements:
          "Bachelor's degree in Network Engineering or related field, experience with network protocols and hardware.",
      },
      {
        id: 6,
        title: "Product Manager",
        company: "Product Innovations Co.",
        location: "San Jose, CA",
        image: job2,
        salary: "$100k - $130k",
        description:
          "Lead the development and launch of new products by collaborating with cross-functional teams.",
        requirements:
          "Bachelor's degree in Business, Engineering, or related field, experience in product management.",
      },
    ],
  },
  {
    id: 2,
    name: "Healthcare",
    description: "Find rewarding careers in the healthcare sector.",
    icon: icon2,
    open: 233,
    jobs: [
      {
        id: 7,
        title: "Registered Nurse",
        company: "Healthcare Services LLC",
        location: "Chicago, IL",
        image: medical,
        salary: "$60k - $80k",
        description:
          "Provide patient care, administer medications, and assist in medical procedures.",
        requirements: "Bachelor of Science in Nursing (BSN), valid RN license.",
      },
      {
        id: 8,
        title: "Medical Doctor",
        company: "General Hospital",
        location: "Los Angeles, CA",
        image: job4,
        salary: "$150k - $200k",
        description:
          "Diagnose and treat illnesses, injuries, and other medical conditions.",
        requirements:
          "Doctor of Medicine (MD) or Doctor of Osteopathic Medicine (DO) degree, valid medical license.",
      },
      {
        id: 9,
        title: "Licensed Practical Nurse",
        company: "Care Providers Inc.",
        location: "New York, NY",
        image: medical,
        salary: "$40k - $60k",
        description:
          "Provide basic nursing care under the supervision of registered nurses or physicians.",
        requirements:
          "Completion of a state-approved LPN program, valid LPN license.",
      },
      {
        id: 10,
        title: "Medical Assistant",
        company: "Healthcare Clinics Ltd.",
        location: "Houston, TX",
        image: medical,
        salary: "$30k - $40k",
        description:
          "Assist healthcare professionals in medical offices or clinics with administrative and clinical tasks.",
        requirements:
          "Completion of a medical assistant program, certification is preferred.",
      },
      {
        id: 11,
        title: "Pharmacist",
        company: "Pharmacy Solutions Inc.",
        location: "Philadelphia, PA",
        image: pharma,
        salary: "$90k - $120k",
        description:
          "Dispense medications, provide drug information, and ensure safe medication use.",
        requirements:
          "Doctor of Pharmacy (PharmD) degree, valid pharmacist license.",
      },
      {
        id: 12,
        title: "Physical Therapist",
        company: "Rehabilitation Center",
        location: "Miami, FL",
        image: job3,
        salary: "$70k - $90k",
        description:
          "Assess and treat patients with physical injuries or disabilities to improve movement and function.",
        requirements:
          "Doctor of Physical Therapy (DPT) degree, valid physical therapy license.",
      },
    ],
  },
  {
    id: 3,
    name: "Sales",
    description: "Exciting opportunities in the sales field.",
    icon: icon3,
    open: 313,
    jobs: [
      {
        id: 13,
        title: "Sales Representative",
        company: "Sales Solutions Inc.",
        location: "New York, NY",
        image: job3,
        salary: "$50k - $70k",
        description:
          "Identify and pursue new sales leads, build relationships with clients, and close deals.",
        requirements:
          "Bachelor's degree in Business Administration or related field, strong communication and negotiation skills.",
      },
      {
        id: 14,
        title: "Sales Manager",
        company: "Global Sales Corp.",
        location: "Chicago, IL",
        image: pharma,
        salary: "$80k - $120k",
        description:
          "Lead and motivate sales teams, develop sales strategies, and oversee sales operations.",
        requirements:
          "Bachelor's degree in Marketing, Business Administration, or related field, proven experience in sales management.",
      },
    ],
  },
  {
    id: 4,
    name: "Marketing",
    description: "Explore dynamic careers in the marketing industry.",
    icon: icon4,
    open: 63,
    jobs: [
      {
        id: 15,
        title: "Marketing Coordinator",
        company: "Marketing Solutions Agency",
        location: "Los Angeles, CA",
        image: medical,
        salary: "$45k - $60k",
        description:
          "Assist in the development and implementation of marketing campaigns, analyze market trends, and coordinate promotional activities.",
        requirements:
          "Bachelor's degree in Marketing, Communications, or related field, experience with marketing tools and platforms.",
      },
      {
        id: 16,
        title: "Digital Marketing Specialist",
        company: "Tech Marketing Group",
        location: "San Francisco, CA",
        image: job3,
        salary: "$60k - $80k",
        description:
          "Manage digital marketing campaigns, optimize online presence, and analyze digital marketing performance.",
        requirements:
          "Bachelor's degree in Marketing, Advertising, or related field, proficiency in digital marketing tools and platforms.",
      },
    ],
  },
  {
    id: 5,
    name: "Front Desk",
    description:
      "Welcome guests, handle reservations, and provide excellent customer service.",
    icon: icon5,
    open: 113,
    jobs: [
      {
        id: 17,
        title: "Front Desk Agent",
        company: "Hospitality Suites",
        location: "Los Angeles, CA",
        image: job2,
        salary: "$30k - $40k",
        description:
          "Check-in and check-out guests, handle inquiries, and assist with various administrative tasks.",
        requirements:
          "High school diploma or equivalent, customer service experience preferred.",
      },
      {
        id: 18,
        title: "Front Office Manager",
        company: "Luxury Hotels Inc.",
        location: "Miami, FL",
        image: medical,
        salary: "$50k - $60k",
        description:
          "Oversee front desk operations, manage staff, and ensure smooth guest experiences.",
        requirements:
          "Bachelor's degree in Hospitality Management or related field, previous front desk experience.",
      },
    ],
  },
  {
    id: 6,
    name: "Housekeeping",
    description:
      "Maintain cleanliness and order in guest rooms and common areas.",
    icon: icon6,
    open: 132,
    jobs: [
      {
        id: 19,
        title: "Housekeeper",
        company: "Clean Sweep Resorts",
        location: "Orlando, FL",
        image: pharma,
        salary: "$50k - $70k",
        description:
          "Clean and tidy guest rooms, replenish amenities, and ensure high standards of cleanliness.",
        requirements: "Previous housekeeping experience preferred.",
      },
      {
        id: 20,
        title: "Housekeeping Supervisor",
        company: "Grand Hospitality Group",
        location: "Las Vegas, NV",
        image: job4,
        salary: "$55k - $75k",
        description:
          "Supervise housekeeping staff, assign tasks, and maintain inventory of supplies.",
        requirements: "Previous housekeeping experience, leadership skills.",
      },
    ],
  },
  {
    id: 7,
    name: "Customer Service",
    description:
      "Opportunities to provide excellent customer support and assistance.",
    icon: icon4,
    open: 43,
    jobs: [
      {
        id: 21,
        title: "Service Representative",
        company: "Service First Corporation",
        location: "Chicago, IL",
        image: medical,
        salary: "$50k - $60k",
        description:
          "Assist customers with inquiries, resolve issues, and ensure high levels of satisfaction.",
        requirements:
          "Strong communication skills, ability to multitask, previous customer service experience preferred.",
      },
      {
        id: 22,
        title: "Customer Support Specialist",
        company: "Supportive Solutions Ltd.",
        location: "Seattle, WA",
        image: job3,
        salary: "$40k - $80k",
        description:
          "Provide technical support, troubleshoot problems, and offer solutions to customers.",
        requirements:
          "Technical background, excellent problem-solving skills, previous customer support experience.",
      },
    ],
  },
  {
    id: 8,
    name: "Engineering",
    description: "Exciting opportunities in the field of engineering.",
    icon: icon5,
    open: 14,
    jobs: [
      {
        id: 23,
        title: "Software Engineer",
        company: "Tech Innovations LLC",
        location: "San Francisco, CA",
        image: job2,
        salary: "$40k - $60k",
        description:
          "Design, develop, and maintain software applications, systems, and solutions.",
        requirements:
          "Bachelor's degree in Computer Science or related field, proficiency in programming languages such as Java, Python, or JavaScript.",
      },
      {
        id: 24,
        title: "Mechanical Engineer",
        company: "Precision Engineering Corp.",
        location: "Houston, TX",
        image: medical,
        salary: "$50k - $70k",
        description:
          "Design and analyze mechanical systems and components, create prototypes, and oversee manufacturing processes.",
        requirements:
          "Bachelor's degree in Mechanical Engineering or related field, proficiency in CAD software.",
      },
    ],
  },
  {
    id: 9,
    name: "Education and Teaching",
    description:
      "Opportunities to make a difference through teaching and education.",
    icon: icon3,
    open: 13,
    jobs: [
      {
        id: 25,
        title: "Elementary School Teacher",
        company: "Sunshine Elementary School",
        location: "Austin, TX",
        image: job4,
        salary: "$45k - $65k",
        description:
          "Plan and deliver engaging lessons, assess student progress, and create a positive learning environment.",
        requirements:
          "Bachelor's degree in Education, teaching certification, strong communication and organizational skills.",
      },
      {
        id: 26,
        title: "High School Math Teacher",
        company: "Bright Minds High School",
        location: "New York, NY",
        image: job3,
        salary: "$50k - $60k",
        description:
          "Teach math concepts to high school students, differentiate instruction, and provide support to students as needed.",
        requirements:
          "Bachelor's degree in Mathematics or Education, teaching certification, subject-specific knowledge.",
      },
    ],
  },
  {
    id: 10,
    name: "Legal",
    icon: icon2,
    open: 70,
    jobs: [
      {
        id: 27,
        title: "Associate Attorney",
        company: "Smith & Associates Law Firm",
        location: "Washington, D.C.",
        image: pharma,
        salary: "$80k - $90k",
        description:
          "Assist with legal research, draft legal documents, and represent clients in court proceedings.",
        requirements:
          "Juris Doctor (J.D.) degree, admission to the bar, strong analytical and communication skills.",
      },
      {
        id: 28,
        title: "Legal Assistant",
        company: "Legal Support Services Inc.",
        location: "Boston, MA",
        image: medical,
        salary: "$40k - $55k",
        description:
          "Provide administrative support to legal professionals, organize files, and prepare documents.",
        requirements:
          "Associate degree in Paralegal Studies or related field, attention to detail, proficiency in legal software.",
      },
    ],
  },
];
