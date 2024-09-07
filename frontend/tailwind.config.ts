import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        taipeiPass: '#5AB4C5',
      },
      clipPath: {
        'trapezoid-left': 'polygon(0 0, 60% 0, 40% 100%, 0 100%)',
        'trapezoid-right': 'polygon(60% 0, 100% 0, 100% 100%, 40% 100%)',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
};
export default config;
