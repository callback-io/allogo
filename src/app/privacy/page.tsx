import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Allogo",
  description: "Privacy Policy for Allogo",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

      <div className="prose dark:prose-invert max-w-none space-y-6 text-neutral-600 dark:text-neutral-400">
        <p>Last updated: January 1, 2026</p>

        <section>
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
            1. Introduction
          </h2>
          <p>
            Welcome to Allogo (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We respect your
            privacy and are committed to protecting your personal data. This Privacy Policy explains
            how we handle your information when you visit our website (allogo.org).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
            2. Data Collection
          </h2>
          <p>
            We adhere to a strict &quot;No-Logs&quot; policy regarding your personal activity.
            Allogo is a static website and an open-source project. We do not create user accounts,
            store personal profiles, or track individual usage behavior.
          </p>
          <p>
            However, our hosting provider (Cloudflare) and code repository (GitHub) may collect
            standard server logs (such as IP addresses) for security and performance purposes.
            Please refer to their respective privacy policies for more details.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
            3. Cookies
          </h2>
          <p>
            We use minimal cookies necessary for the functioning of the website, such as storing
            your theme preference (Light/Dark mode). We do not use tracking cookies or third-party
            advertising cookies.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
            4. Third-Party Links
          </h2>
          <p>
            Our website contains links to third-party websites (e.g., brand official sites, GitHub).
            We are not responsible for the privacy practices or content of these external sites.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
            5. Contact Us
          </h2>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
          <ul className="list-disc pl-6">
            <li>
              Email:{" "}
              <a
                href="mailto:contact@allogo.org"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                contact@allogo.org
              </a>
            </li>
            <li>
              GitHub Issues:{" "}
              <a
                href="https://github.com/callback-io/allogo/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                callback-io/allogo
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
