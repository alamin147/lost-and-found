import { FaLinkedin, FaFacebook, FaGithub, FaYoutube } from "react-icons/fa";

const Footers = () => {
  return (
    <footer className="relative bottom-0 pt-16 pb-8 bg-gradient-to-br from-gray-900 via-gray-800 to-black border-t border-gray-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:justify-between">
          <div className="mb-8 md:mb-0">
            <a href="/" className="flex items-center">
              <span className="self-center text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Lost & Found
              </span>
            </a>
            <p className="mt-4 text-gray-300 max-w-md">
              Connecting people with their lost belongings, one item at a time.
              <br />
              We are here to help you find what you have lost.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-white uppercase">
                Follow us
              </h2>
              <ul className="text-gray-400 space-y-3">
                <li>
                  <a
                    href="https://github.com/alamin147"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Github
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Discord
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-white uppercase">
                Quick Links
              </h2>
              <ul className="text-gray-400 space-y-3">
                <li>
                  <a
                    href="/foundItems"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Found Items
                  </a>
                </li>
                <li>
                  <a
                    href="/lostItems"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Lost Items
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-white uppercase">
                Legal
              </h2>
              <ul className="text-gray-400 space-y-3">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Terms and Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-8 border-gray-700" />

        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-400 sm:text-center">
            © 2025 Lost & Found Management. All Rights Reserved.
          </span>
          <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
            <a
              href="https://github.com/alamin147"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/alamin-developer/"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
            >
              <FaFacebook size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
            >
              <FaYoutube size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footers;
