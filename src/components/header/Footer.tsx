import React from "react";

type FooterProps = {
  sections: {
    title: string;
    links: { name: string; url: string }[];
  }[];
};

export const Footer: React.FC<FooterProps> = ({ sections }) => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-5 gap-8 text-center md:text-left">
        {sections.map((section, index) => (
          <div key={index}>
            <h2 className="text-lg font-semibold mb-4">{section.title}</h2>
            <ul>
              {section.links.map((link, linkIndex) => (
                <li className="mb-2" key={linkIndex}>
                  <a href={link.url} className="hover:underline">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container mx-auto px-4 text-center mt-8">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} SKB|WORLD. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export const footerSections = [
  {
    title: "Courses",
    links: [
      { name: "Course 1", url: "#" },
      { name: "Course 2", url: "#" },
      { name: "Course 3", url: "#" },
      { name: "Course 4", url: "#" },
    ],
  },
  {
    title: "Terms & Conditions",
    links: [
      { name: "Privacy & Policy", url: "#" },
      { name: "Help and Support", url: "#" },
      { name: "Affiliate", url: "#" },
      { name: "Investors", url: "#" },
    ],
  },
  {
    title: "Terms",
    links: [
      { name: "Privacy policy", url: "#" },
      { name: "Sitemap", url: "#" },
      { name: "Accessibility statement", url: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", url: "#" },
      { name: "Service", url: "#" },
      { name: "Contact", url: "#" },
      { name: "Contact us", url: "#" },
    ],
  },
  {
    title: "Careers",
    links: [
      { name: "Blog", url: "#" },
      { name: "Help and Support", url: "#" },
      { name: "Affiliate", url: "#" },
      { name: "Investors", url: "#" },
    ],
  },
];
