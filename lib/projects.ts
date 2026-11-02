export type ProjectStatus =
  | "Live"
  | "In Progress"
  | "Experimental"
  | "Coming Soon"
  | "Under Review on Modrinth";

export interface ProjectDetail {
  id: string;
  title: string;
  subtitle: string;
  category: "Full-Stack Web" | "Game Modding";
  status: ProjectStatus;
  description: string;
  techStack: string[];
  features: string[];
  repoUrl: string;
  liveUrl?: string;
  liveLabel?: string;
  featured?: boolean;
}

export const PROJECTS: ProjectDetail[] = [
  {
    id: "filra",
    title: "Filra",
    subtitle: "Movie Discovery & Social Rating Platform",
    category: "Full-Stack Web",
    status: "Live",
    featured: true,
    description:
      "Filra is a fast, responsive movie discovery and personal rating web app. Users can browse trending, top-rated, and upcoming cinema without an account. Authenticating via Clerk unlocks a custom profile, synced user ratings, watchlist curation, and friend activity features with Supabase persistence.",
    techStack: ["Next.js 15", "TMDB API", "Clerk Auth", "Supabase", "Tailwind CSS", "TypeScript"],
    features: [
      "Real-time movie search and TMDB catalog exploration",
      "Seamless guest mode with optional Clerk authentication",
      "Cloud-synced user ratings and personal watchlist",
      "Responsive cinematic UI with dark mode styling",
    ],
    repoUrl: "https://github.com/Dhityavv/Filra",
    liveUrl: "https://filra.vercel.app",
    liveLabel: "Open Live Demo",
  },
  {
    id: "universal-chiseled-bookshelf",
    title: "Universal Chiseled Bookshelf",
    subtitle: "Minecraft Vanilla+ Bookshelf Storage Expansion",
    category: "Game Modding",
    status: "Under Review on Modrinth",
    featured: true,
    description:
      "Universal Chiseled Bookshelf expands the existing Minecraft bookshelf system without adding new blocks or items. Store and organize more useful items inside your bookshelves while keeping the original Minecraft look, feel, and vanilla mechanics intact.",
    techStack: ["Minecraft 26.3", "Vanilla+ Mod"],
    features: [
      "Expands item storage capacity within vanilla chiseled bookshelves",
      "No custom blocks required — 100% vanilla game parity and aesthetics",
      "Clean, non-intrusive implementation for survival worlds",
    ],
    repoUrl: "https://github.com/Dhityavv/Universal-Chiseled-Bookshelf",
    liveUrl: "https://discord.gg/vCZHM2NmA",
    liveLabel: "Download on Discord",
  },
  {
    id: "ai-lab",
    title: "AI-Assisted Web & 3D Interactive Lab",
    subtitle: "Experimental WebGL Sandbox",
    category: "Full-Stack Web",
    status: "Coming Soon",
    featured: false,
    description:
      "An interactive web laboratory testing AI-assisted code generation combined with WebGL/Three.js to present 3D models and character animations directly in modern mobile and desktop browsers.",
    techStack: ["Next.js", "Three.js / WebGL", "AI Prototyping", "Tailwind CSS"],
    features: [
      "In-browser 3D model orbit controls and inspection",
      "Interactive lighting toggle (Sun, Studio, Wireframe)",
      "Automated asset compression pipeline",
    ],
    repoUrl: "https://github.com/Dhityavv",
  },
];
