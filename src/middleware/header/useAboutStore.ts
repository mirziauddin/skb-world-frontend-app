import create from "zustand";

interface AboutState {
  workTitle: string;
  workDescription: string;
  companyTitle: string;
  companyDescription: string;
}

export const useAboutStore = create<AboutState>(() => ({
  workTitle: "Our Work",
  workDescription:
    "We are dedicated to delivering high-quality software solutions that meet the unique needs of our clients. Our team specializes in developing innovative applications using the latest technologies.",
  companyTitle: "Our Company",
  companyDescription:
    "Our company focuses on using responsive design, React.js, Tailwind CSS, and TypeScript to create efficient and scalable web applications. We strive to stay at the forefront of technology to provide the best possible solutions to our clients.",
}));
