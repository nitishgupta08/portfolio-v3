export const SITE_CONFIG = {
  version: "3.0.0",
  name: "Nitish Gupta Portfolio",
  description: "Software engineer who loves creating beautiful code to power beautiful designs",
  author: "Nitish Gupta",
  url: "https://nitishgupta.dev", // Update with your domain
  github: {
    username: "nitishgupta08",
    repo: "portfolio-v3", // Update with your repo name
  },
  previousVersions: [
    {
      version: "2.0.0",
      url: "https://nitishgupta.netlify.app/",
      label: "v2"
    },
    {
      version: "1.0.0", 
      url: "https://v1-nitishgupta.netlify.app/",
      label: "v1"
    }
  ]
} as const;

// Helper function to get GitHub release URL
export const getGitHubReleaseUrl = (version: string) => {
  return `https://github.com/${SITE_CONFIG.github.username}/${SITE_CONFIG.github.repo}/releases/tag/v${version}`;
};
