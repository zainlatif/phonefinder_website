import React from "react";

const ContactUs = () => {
  return (
    <main className="mx-auto min-h-[60vh] max-w-4xl px-5 py-10 sm:px-6 lg:px-8">
      <article className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-600 shadow-sm sm:p-10 [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:tracking-tight [&>h1]:text-slate-900 [&>h2]:mt-8 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-slate-900 [&>p]:mt-4 [&>p]:leading-7 [&>ul]:mt-4 [&>ul]:list-disc [&>ul]:space-y-2 [&>ul]:pl-6 [&_a]:font-semibold [&_a]:text-orange-600 [&_a:hover]:text-orange-700 [&_a:hover]:underline">
      <h1>Contact us</h1>
      <p>We do appreciate your feedback</p>
      <p>We will be glad to hear from you if:</p>
      <ul>
        <li>You have found a mistake in our phone specifications.</li>
        <li>You have info about a phone which we don't have in our database.</li>
        <li>You have found a broken link.</li>
        <li>You have a suggestion for improving our website or want to request a feature.</li>
      </ul>

      <h2>Before sending us an email, please keep in mind:</h2>
      <ul>
        <li>We do not sell mobile phones.</li>
        <li>We do not know the price of any mobile phone in your country.</li>
        <li>We don't answer any "unlocking" related questions.</li>
        <li>We don't answer any "Which mobile should I buy?" questions.</li>
      </ul>

      <p><b>Email us at:</b> <a href="mailto:support@gsmarena.com">support@gsmarena.com</a></p>

      <h2>Advertising on our website</h2>
      <p>
        Do you have an online mobile store? Are you interested in advertising on our site? Our website is accessed by millions of unique visitors daily and is guaranteed to help boost your sales.
        <br />
        <a href="#">Click here to read more</a>
      </p>
      </article>
    </main>
  );
};

export default ContactUs;
