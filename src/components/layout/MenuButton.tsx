import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useUser } from "../../components/UserContext";
import { useRouter } from "next/router";

const links = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Sign Up", href: "/registerUser", hideWhenLoggedIn: true },
  { name: "Log In", href: "/login", hideWhenLoggedIn: true },
  { name: "Log Out", href: "/../", hideWhenLoggedOut: true },
];

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userRole, logout ,setUserRole} = useUser(); // Include the logout function
  const router = useRouter();

  const handleMenuToggle = () => setIsOpen(!isOpen);
  const handleLogout = async () => {
    if (userRole) {
      setUserRole("")
      router.push("/../login"); // Redirect to the login page after logout
    }
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 md:justify-start md:space-x-10">
      <div className="-my-2 -mr-2 md:hidden">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
          onClick={handleMenuToggle}
        >
          {isOpen ? (
            <svg
              className="h-6 w-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      <nav className="hidden space-x-10 md:flex ">
        {links.map((link) =>
          (userRole && !link.hideWhenLoggedIn) ||
          (!userRole && !link.hideWhenLoggedOut) ? (
            <Link href={link.href} key={link.name} passHref>
              <span className="cursor-pointer">{link.name}</span>
            </Link>
          ) : null
        )}
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="absolute inset-x-0 z-20 top-10 origin-top-right transform p-2 transition md:hidden z-10"
          >
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-md">
              {links.map((link) =>
                (userRole && !link.hideWhenLoggedIn) ||
                (!userRole && !link.hideWhenLoggedOut) ? (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={link.name === "Log Out" ? handleLogout : undefined}
                    className="block px-4 py-2 text-base font-medium text-gray-700 transition duration-150 ease-in-out hover:bg-gray-50 hover:text-gray-900 focus:bg-gray-50 focus:text-gray-900 focus:outline-none"
                  >
                    {link.name}
                  </a>
                ) : null
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HamburgerMenu;
