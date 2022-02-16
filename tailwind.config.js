module.exports = {
  purge: {
    content: [ // A aplicação vai utilizar apenas as pastas com os componentes React especificados que vão usar as classes 'tailwind'.
      "./src/pages/**/*.{js,ts,jsx,tsx}",
      "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    safeList: [
      /^bg-/,
      /^to-/,
      /^from-/,
      'from-green-400',
      'from-blue-400',
      'from-gray-400',
      'to-gray-700',
      'to-blue-700',
      'to-green-700',
    ]
  },  
  theme: {
    extend: {},
  },
  plugins: [],
}
