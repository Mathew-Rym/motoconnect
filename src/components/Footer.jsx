function Footer() {
  return (
    <footer className="bg-light text-dark mt-auto py-4 border-top text-center">
      <div className="container">
        <p className="mb-1">Follow Us on Social Media</p>
        <p className="mb-1">
          Contact Us: <a href="mailto:support@motoconnect.com">support@motoconnect.com</a>
        </p>
        <p className="small mb-0">
          &copy; {new Date().getFullYear()} MotoConnect. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
