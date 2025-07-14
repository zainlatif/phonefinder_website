import React from "react";
import "./Blockphone.css"; // Reuse your existing styles

const ContactUs = () => {
  return (
    <div className="blockphone-container">
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
    </div>
  );
};

export default ContactUs;
