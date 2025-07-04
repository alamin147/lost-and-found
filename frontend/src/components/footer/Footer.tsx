import { FaLinkedin, FaFacebook, FaGithub, FaYoutube } from "react-icons/fa";
const Footers = () => {
  return (
    <footer className="relative bottom-0 pt-10 md:pt-20 p-4 bg-white sm:p-6 dark:bg-gray-900">
      {/* <hr className="mb-5 md:mb-12" /> */}
      <div className="mx-auto max-w-screen-xl">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="" className="flex items-center">
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Lost & Found
              </span>
            </a>
            <p className="mt-2 text-gray-400 ">
              Connecting people with their lost belongings, one item at a time.
              <br />
              We are here to help you find what you have lost.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Follow us
              </h2>
              <ul className="text-gray-600 dark:text-gray-400">
                <li className="mb-4">
                  <a
                    href="https://github.com/alamin147"
                    className="hover:underline "
                  >
                    Github
                  </a>
                </li>
                <li>
                  <a href="" className="hover:underline">
                    Discord
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Legal
              </h2>
              <ul className="text-gray-600 dark:text-gray-400">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Terms and Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2022 <a href="#" className="hover:underline"></a>
            All Rights Reserved.
          </span>
          <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
            <a
              href="https://github.com/alamin147"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <FaGithub size={25} />
            </a>
            <a
              href="https://www.linkedin.com/in/alamin-developer/"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <FaLinkedin size={25} />
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <FaFacebook size={25} />
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <FaYoutube size={25} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footers;
