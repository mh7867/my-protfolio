export const site = {
  name: "Hamza",
  fullName: "Muhammad Hamza",
  role: "Full-stack developer",
  company: "SISPN Technology",
  email: "mh6824213@gmail.com",
  location: "Pakistan",
  timeZone: "Asia/Karachi",
  // Set NEXT_PUBLIC_SITE_URL to the real domain when deploying; used for metadata and the sitemap.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  github: [
    { label: "GitHub", note: "Personal", handle: "mh7867", href: "https://github.com/mh7867" },
    { label: "GitHub", note: "SISPN Technology", handle: "hamzasispn", href: "https://github.com/hamzasispn" },
  ],
  description:
    "Muhammad Hamza — full-stack developer at SISPN Technology. Web apps, Shopify apps and themes, CMS platforms and booking systems built with Next.js, Vue, PHP and Python.",
};

export const nav = [
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
];
