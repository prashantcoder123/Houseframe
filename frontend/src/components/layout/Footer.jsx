export default function Footer() {
  return (
    <footer className="text-center text-xs md:text-sm text-gray-400 py-6 border-t border-white/10 px-4">
      © {new Date().getFullYear()} HouseFrame Design & Construction Pvt. Ltd.
      <p className="mt-2 text-gray-500">
        Developer and Managed by{" "}
        <a
          href="https://www.linkedin.com/in/prashant-kumar-16b010261/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors duration-200"
        >
          Prashant Kumar
        </a>
      </p>
    </footer>
  );
}
