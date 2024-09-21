/** @type {import("prettier").Config} */
const config = {
  semi: true,
  tabWidth: 2,
  trailingComma: "all",

  tailwindFunctions: ["cn", "clsx", "cva", "twJoin", "twMerge"],
  plugins: ["prettier-plugin-tailwindcss"],
};

export default config;
