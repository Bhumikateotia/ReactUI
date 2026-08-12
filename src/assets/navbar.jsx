function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <div>
          <Link to="/" className="text-2xl font-bold text-blue-600">
            MyWebsite
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="text-gray-700 transition hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            to="/about"
            className="text-gray-700 transition hover:text-blue-600"
          >
            About
          </Link>

          <Link
            to="/projects"
            className="text-gray-700 transition hover:text-blue-600"
          >
            Projects
          </Link>

          <Link
            to="/skills"
            className="text-gray-700 transition hover:text-blue-600"
          >
            Skills
          </Link>

          <Link
            to="/contact"
            className="text-gray-700 transition hover:text-blue-600"
          >
            Contact
          </Link>
        </div>

        {/* Button */}
        <Link
          to="/contact"
          className="rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
        >
          Hire Me
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;   