const AboutUs = () => {
  return (
    <section
      id="aboutUs"
      className="py-16 lg:py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black"
    >
      <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center mb-12">
          <h2 className="mb-6 text-4xl md:text-5xl tracking-tight font-extrabold leading-tight text-white">
            About{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Us
            </span>
          </h2>
          <p className="mb-8 font-light text-gray-300 text-lg md:text-xl">
            Don't let lost items remain lost. Lost and Found Management bridges
            the gap between lost and found, reuniting you with what matters
            most.
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-xl border border-gray-700 p-8 md:p-12">
            <p className="font-light text-gray-300 text-lg md:text-xl leading-relaxed text-center">
              We emphasize your commitment to reuniting lost items with their
              owners and maintaining a seamless process. We operate with
              honesty, transparency, and empathy. Our commitment to doing what's
              right drives our actions. We understand the emotional impact of
              lost items. Our team treats each case with compassion and care. We
              embrace technology and creative solutions to enhance our services
              continually.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-blue-400 text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Search & Find
                </h3>
                <p className="text-gray-400 text-sm">
                  Advanced search capabilities to help locate lost items quickly
                </p>
              </div>
              <div className="text-center">
                <div className="text-green-400 text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Community
                </h3>
                <p className="text-gray-400 text-sm">
                  Connecting people through our community-driven platform
                </p>
              </div>
              <div className="text-center">
                <div className="text-cyan-400 text-4xl mb-4">🛡️</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Secure
                </h3>
                <p className="text-gray-400 text-sm">
                  Safe and secure item management with privacy protection
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default AboutUs;
