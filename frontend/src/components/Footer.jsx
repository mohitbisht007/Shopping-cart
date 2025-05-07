function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 text-center fixed bottom-0 w-full">
      <p className="text-sm">&copy; {new Date().getFullYear()} My Basic E-commerce</p>
    </footer>
  );
}

export default Footer;