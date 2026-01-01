import { Metadata } from "next";
import Link from "next/link";
import { Github, Mail, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us - Allogo",
  description: "Get in touch with the Allogo team",
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
      <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-12">
        Have a question, found a bug, or want to contribute? Here are the best ways to reach us.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Support Email */}
        <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
              <Mail className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-semibold">General Support</h2>
          </div>
          <p className="text-neutral-500 dark:text-neutral-400 mb-4">
            For general inquiries, account issues, or legal questions.
          </p>
          <a
            href="mailto:contact@allogo.org"
            className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
          >
            contact@allogo.org
          </a>
        </div>

        {/* Technical Support Email */}
        <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-semibold">Technical Support</h2>
          </div>
          <p className="text-neutral-500 dark:text-neutral-400 mb-4">
            For specific technical assistance or feedback.
          </p>
          <a
            href="mailto:support@allogo.org"
            className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
          >
            support@allogo.org
          </a>
        </div>

        {/* GitHub */}
        <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100">
              <Github className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-semibold">GitHub Community</h2>
          </div>
          <p className="text-neutral-500 dark:text-neutral-400 mb-4">
            The best place for bug reports, feature requests, and code contributions.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="https://github.com/callback-io/allogo/issues"
              target="_blank"
              className="px-4 py-2 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-medium hover:opacity-90 transition-opacity"
            >
              Open an Issue
            </Link>
            <Link
              href="https://github.com/callback-io/allogo/discussions"
              target="_blank"
              className="px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
            >
              Join Discussion
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
