import React from "react";
import "./Blockphone.css"; // Reuse your site's styling

const PrivacyPolicy = () => {
    return (
        <div className="blockphone-container">
            <h1>Privacy Policy and Cookie Statement</h1>
            <p><strong>Last Updated:</strong> July 14, 2025</p>

            <p>
                Your privacy is very important to us at PhoneFinder. This Privacy Policy explains how we collect, use, and protect your personal data when you use our website.
            </p>

            <h2>Why We Collect Personal Data</h2>
            <p>
                We collect the minimum necessary personal data to deliver a smooth, secure, and personalized experience. You do not need to submit personal information to browse our site.
            </p>

            <h2>Types of Data We May Collect</h2>
            <ul>
                <li>Email address and nickname (if you register or comment)</li>
                <li>IP address (for security and moderation)</li>
                <li>Browser/device information (for analytics and optimization)</li>
                <li>Gravatar email (optional, for profile avatars)</li>
            </ul>

            <h2>How We Use Your Data</h2>
            <ul>
                <li>To improve the usability and performance of our website</li>
                <li>To ensure secure access and prevent abuse or spam</li>
                <li>To show you relevant content or advertisements</li>
                <li>To provide support if you contact us</li>
            </ul>

            <h2>Cookies</h2>
            <p>
                We use cookies to remember your preferences, improve site functionality, and analyze user behavior via tools like Google Analytics. You can disable cookies in your browser settings.
            </p>

            <h2>Third Parties</h2>
            <ul>
                <li><b>Analytics:</b> We use tools like Google Analytics to understand site usage. All data is anonymized.</li>
                <li><b>Ads:</b> Our advertising partners may use cookies to serve relevant ads based on your browsing behavior. We do not share personal data with advertisers.</li>
            </ul>

            <h2>Data Security</h2>
            <p>
                We use industry-standard security measures (SSL, firewalls, encrypted backups) to protect your data. However, no system is completely secure, and you share data at your own risk.
            </p>

            <h2>Your Rights</h2>
            <ul>
                <li>Access or correct your personal data</li>
                <li>Request deletion of your data</li>
                <li>Withdraw consent to data processing</li>
            </ul>
            <p>
                To request data changes or deletion, please email us at: <a href="mailto:support@phonefinder.com">support@phonefinder.com</a>
            </p>

            <h2>Children</h2>
            <p>
                We do not knowingly collect personal data from users under 16. If you believe a minor has submitted personal info, contact us immediately.
            </p>

            <h2>Use of Queries & Favorites for Improvement</h2>
            <p>
                To continuously improve our recommendations and search results, we may use anonymized user queries and favorite product selections to train and fine-tune our machine learning models.
            </p>
            <p>
                This data is used in aggregate form and does not include any personally identifiable information. It helps us understand what users are looking for, which phones are most popular, and how we can provide better results in the future.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
                We may update this policy from time to time. Any changes will be posted here with an updated revision date.
            </p>
        </div>

    );
};

export default PrivacyPolicy;
