import React from "react";

const HelpSupportPage = () => {
  return (
    <div className="max-w-6lg mx-auto px-4 py-10 text-gray-800 dark:text-white">
      <h2 className="font-kanit mb-4 text-center text-sm font-semibold text-[#003366 ]">
        HELP & SUPPORT
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Column: Support Form */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-center md:text-start">
            Submit a Support Ticket
          </h2>
          <p className="text-sm mb-4 text-center md:text-start">
            If you need technical help or want to report an issue, please fill
            out the form below.
          </p>
          <form className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="mb-4 w-full mt-1 rounded border gap-2 p-2 flex items-center justify-between text-sm decoration-none outline-none"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="mb-4 w-full mt-1 rounded border gap-2 p-2 flex items-center justify-between text-sm decoration-none outline-none"
            />
            <textarea
              name="message"
              rows="4"
              placeholder="Describe your issue"
              className="mb-4 w-full mt-1 rounded border gap-2 p-2 flex items-center justify-between text-sm decoration-none outline-none"
            ></textarea>
            <button
              type="submit"
              className="bg-[#003366 ] text-white py-2 px-4 rounded hover:bg-[#0055aa]"
            >
              Submit Ticket
            </button>
          </form>
        </div>

        {/* Right Column: FAQ & Contact Info */}
        <div>
          {/* FAQ */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4 text-center md:text-start">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <details className="bg-white dark:bg-slate-800 rounded p-4 shadow">
                <summary className="cursor-pointer font-medium">
                  How do I update my profile?
                </summary>
                <p className="mt-2 text-sm">
                  Go to the Profile Settings page and update your details.
                </p>
              </details>
              <details className="bg-white dark:bg-slate-800 rounded p-4 shadow">
                <summary className="cursor-pointer font-medium">
                  I forgot my password. What now?
                </summary>
                <p className="mt-2 text-sm">
                  Click on “Forgot Password” on the login page and follow the
                  instructions.
                </p>
              </details>
              <details className="bg-white dark:bg-slate-800 rounded p-4 shadow">
                <summary className="cursor-pointer font-medium">
                  Can I delete my account?
                </summary>
                <p className="mt-2 text-sm">
                  Yes. Contact support with your request and we’ll guide you
                  through it.
                </p>
              </details>
            </div>
          </section>

          {/* Contact Info */}
          <section>
            <h2 className="text-lg font-semibold mb-4 text-center md:text-start">
              Contact Support
            </h2>
            <ul className="text-sm space-y-1">
              <li>
                <strong>Email:</strong> support@yourdomain.com
              </li>
              <li>
                <strong>Phone:</strong> +234 801 234 5678
              </li>
              <li>
                <strong>WhatsApp:</strong> +234 801 234 5678
              </li>
              <li>
                <strong>Support Hours:</strong> Mon - Fri, 9am - 5pm (WAT)
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HelpSupportPage;
