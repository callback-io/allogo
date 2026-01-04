import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - Allogo",
  description: "Terms of Service for Allogo",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>

      <div className="prose dark:prose-invert max-w-none space-y-6 text-neutral-600 dark:text-neutral-400">
        <p>Last updated: January 1, 2026</p>

        <section>
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
            1. Agreement to Terms
          </h2>
          <p>
            By accessing or using Allogo, you agree to be bound by these Terms of Service. If you do
            not agree to these terms, please do not use our services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
            2. Intellectual Property Rights
          </h2>
          <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
            Project Code
          </h3>
          <p>
            The source code of Allogo is licensed under the MIT License. You are free to use, copy,
            modify, merge, publish, distribute, sublicense, and/or sell copies of the software,
            subject to the conditions of the license.
          </p>

          <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2 mt-4">
            Logos and Trademarks
          </h3>
          <p>
            Allogo acts as a directory for vector logos.{" "}
            <strong>We do not own the copyrights or trademarks to the logos displayed.</strong>
            All logos remain the intellectual property of their respective owners.
          </p>
          <p>
            The logos provided on this site are for reference, educational, and development purposes
            only (e.g., for use in a UI mockup or a &quot;Powered by&quot; section). You must verify
            that your intended use complies with the trademark owner&apos;s brand guidelines.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
            3. Disclaimer of Warranties
          </h2>
          <p>
            The service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis.
            Allogo makes no warranties, whether express or implied, regarding the accuracy,
            completeness, or reliability of the logos or content provided.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
            4. Limitation of Liability
          </h2>
          <p>
            In no event shall Allogo, its maintainers, or contributors be liable for any indirect,
            incidental, special, consequential, or punitive damages arising out of or related to
            your use of the service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
            5. Contact Information
          </h2>
          <p>
            For any questions about these Terms, please contact us at:{" "}
            <a
              href="mailto:support@allogo.org"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              support@allogo.org
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
