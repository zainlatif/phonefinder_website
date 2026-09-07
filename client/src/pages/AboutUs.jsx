import React from "react";

const AboutUs = () => {
  return (
    <main className="mx-auto min-h-[60vh] max-w-4xl px-5 py-10 sm:px-6 lg:px-8">
      <article className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-600 shadow-sm sm:p-10 [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:tracking-tight [&>h1]:text-slate-900 [&>h2]:mt-8 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-slate-900 [&>p]:mt-4 [&>p]:leading-7 [&>ul]:mt-4 [&>ul]:list-disc [&>ul]:space-y-2 [&>ul]:pl-6 [&>a]:font-semibold [&>a]:text-orange-600 [&_a]:font-semibold [&_a]:text-orange-600 [&_a:hover]:text-orange-700 [&_a:hover]:underline">
      <h1>About Us</h1>
      <p>
        Welcome to <b>Phone Finder AI</b> — your smart assistant for discovering
        the best mobile phones that match your needs and budget!
      </p>

      <h2>Who We Are</h2>
      <p>
        We are a team of passionate developers, tech geeks, and mobile
        enthusiasts committed to helping users make informed phone-buying
        decisions. Our platform uses intelligent filtering and AI-powered
        recommendations to bring you the most accurate and up-to-date phone
        comparisons, specs, and reviews.
      </p>

      <h2>What We Do</h2>
      <ul>
        <li>📱 Offer detailed specs on the latest mobile phones</li>
        <li>🤖 Help you find the best phone using our AI chatbot</li>
        <li>⚖️ Compare phones side by side</li>
        <li>🔎 Filter phones by camera, battery, performance, and more</li>
        <li>📰 Share the latest mobile news and unbiased reviews</li>
        <li>📦 Allow users to favorite devices & track them easily</li>
      </ul>

      <h2>Our Mission</h2>
      <p>
        Our mission is simple — to simplify your mobile buying journey by
        providing intelligent tools, reliable data, and a user-friendly
        experience. Whether you’re a tech expert or just want a solid phone
        within your budget, we’re here to guide you.
      </p>

      <h2>Built with ❤️ using MERN Stack</h2>
      <p>
        Our platform is built with modern web technologies like <b>MongoDB</b>,
        <b> Express.js</b>, <b>React.js</b>, and <b>Node.js</b>, backed by
        RESTful APIs and trained models that improve based on user interaction
        and preferences.
      </p>

      <h2>Want to Get in Touch?</h2>
      <p>
        We'd love to hear from you! Head over to our{" "}
        <a href="/contactus">Contact Us</a> page for suggestions,
        collaborations, or just to say hi.
      </p>

      <h2>Join Our Journey 🚀</h2>
      <p>
        Whether you're a mobile lover, a developer, or someone who just wants
        a good phone without the hassle — Phone Finder AI is made for you.
        We're constantly evolving and building new features based on your
        feedback.
      </p>
      </article>
    </main>
  );
};

export default AboutUs;
