import React from "react";

const TermCondition = () => {
  return (
    <main className="mx-auto min-h-[60vh] max-w-4xl px-5 py-10 sm:px-6 lg:px-8">
      <article className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-600 shadow-sm sm:p-10 [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:tracking-tight [&>h1]:text-slate-900 [&>h2]:mt-8 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-slate-900 [&>p]:mt-4 [&>p]:leading-7 [&>ul]:mt-4 [&>ul]:list-disc [&>ul]:space-y-2 [&>ul]:pl-6 [&_a]:font-semibold [&_a]:text-orange-600 [&_a:hover]:text-orange-700 [&_a:hover]:underline">
      <h1>Terms and Conditions</h1>
      <p><strong>Effective Date:</strong> July 14, 2025</p>

      <h2>1. Introduction</h2>
      <p>
        Welcome to PhoneFinder AI. By accessing or using our website, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use the website.
      </p>

      <h2>2. Use of the Website</h2>
      <ul>
        <li>This site is intended for personal, non-commercial use only.</li>
        <li>You agree not to misuse the content, data, or services provided.</li>
        <li>Any scraping, reverse-engineering, or duplication of data is strictly prohibited.</li>
      </ul>

      <h2>3. AI Recommendations Disclaimer</h2>
      <p>
        Our phone recommendations are powered by AI models trained on available data and user interactions. While we strive for accuracy, we do not guarantee that the results will be 100% error-free or suitable for all use cases.
      </p>

      <h2>4. User Data</h2>
      <p>
        We may use anonymized user queries and favorite selections to improve our AI models and user experience. For more details, please refer to our <a href="/privacy-policy">Privacy Policy</a>.
      </p>

      <h2>5. Intellectual Property</h2>
      <p>
        All content, logos, and AI models used on this website are the property of PhoneFinder AI unless otherwise noted. Unauthorized use or reproduction is not allowed without permission.
      </p>

      <h2>6. Third-Party Links</h2>
      <p>
        Our site may include links to third-party websites such as phone brands, sellers, or review platforms. We are not responsible for their content or policies.
      </p>

      <h2>7. Limitation of Liability</h2>
      <p>
        PhoneFinder AI is not liable for any direct or indirect damages resulting from the use of this site or reliance on any content or AI suggestions provided.
      </p>

      <h2>8. Changes to These Terms</h2>
      <p>
        We reserve the right to update or modify these Terms at any time. Continued use of the website after changes implies acceptance of the new terms.
      </p>

      <h2>9. Contact Us</h2>
      <p>
        For any questions regarding these Terms, feel free to contact us at: <a href="mailto:support@phonefinder.com">support@phonefinder.com</a>
      </p>
      </article>
    </main>
  );
};

export default TermCondition;
