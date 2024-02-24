// /** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
			'grotesk-regular': ['grotesk-regular'],
      'grotesk-light': ['grotesk-light'],
      'grotesk-medium': ['grotesk-medium'],
      'grotesk-bold': ['grotesk-bold'],

		},
    extend: {
      colors: {
        background: "#fefae0",
        foreground: "hsl(var(--foreground))",
        btn: {
          background: "hsl(var(--btn-background))",
          "background-hover": "hsl(var(--btn-background-hover))",
        },
        moss_green: {
					DEFAULT: '#283618',
          secondary: '#1c8035'
				},
        white: {
					DEFAULT: '#FEFDFD',
				},
				beige: {
					DEFAULT: '#fefae0',
				}
      },
    },
  },
  plugins: [],
};
