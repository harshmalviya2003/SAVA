/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          "roboto-mono": ["var(--font-roboto-mono)"], // अगर Roboto Mono फॉन्ट चाहिए
        },
      },
    },
    plugins: [],
    darkMode: "class", // डार्क/लाइट मोड के लिए
  };