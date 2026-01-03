import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal & DMCA - Allogo",
  description: "Legal disclaimer and DMCA takedown policy for Allogo.",
};

export default function LegalPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Legal Disclaimer & DMCA Policy</h1>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">1. Disclaimer</h2>
        <div className="prose dark:prose-invert text-neutral-600 dark:text-neutral-400">
          <p className="mb-4">
            <strong>Allogo</strong> is an open-source project created for educational and developer
            productivity purposes.
          </p>
          <p className="mb-4">
            All product names, logos, and brands displayed on this website are property of their
            respective owners. All company, product and service names used in this website are for
            identification purposes only. Use of these names, logos, and brands does not imply
            endorsement.
          </p>
          <p>
            We are not affiliated, associated, authorized, endorsed by, or in any way officially
            connected with any of the companies whose logos are displayed on this website.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">2. DMCA Takedown Request</h2>
        <div className="prose dark:prose-invert text-neutral-600 dark:text-neutral-400">
          <p className="mb-4">
            We respect the intellectual property rights of others. If you are a copyright or
            trademark owner (or an agent thereof) and believe that any content on this website
            strikes your intellectual property rights, you may submit a notification.
          </p>
          <p className="mb-4">
            Upon receipt of a valid notice, we will remove the infringing material immediately.
          </p>

          <div className="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-lg mt-6">
            <h3 className="font-medium mb-2">How to report:</h3>
            <p className="mb-2">
              Please report any concerns via GitHub Issues using the link below:
            </p>
            <a
              href="https://github.com/callback-io/allogo/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Report via GitHub Issues
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
