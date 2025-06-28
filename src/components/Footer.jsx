// src/components/Footer.jsx

function Footer() {
  return (
    <footer className="mt-20 text-center text-gray-500 py-6 border-t">
      <p>Follow Us on Social Media</p>
      <p>Contact Us: support@motoconnect.com</p>
      <p>
        &copy; {new Date().getFullYear()} MotoConnect. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
// This code defines a simple Footer component that displays the current year and a copyright notice.
// It uses the current date to dynamically set the year, ensuring that it is always up-to-date. The footer is styled with Tailwind CSS classes for consistent design with the rest of the application  {/* Footer */}
      