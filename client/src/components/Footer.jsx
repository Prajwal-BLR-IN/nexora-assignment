function Footer() {
  return (
    <>
      <footer className="flex w-full flex-col items-center justify-around bg-[#ffefdf] py-10 text-sm text-gray-800/70">
        <h3 className="text-2xl font-bold text-gray-900">nexora</h3>
        <p className="mt-4 text-center">
          Copyright © 2025 <a href="#">nexora</a>. All rights reservered.
        </p>
        <div className="mt-6 flex items-center gap-4">
          <a
            href="#"
            className="font-medium text-gray-800 transition-all hover:text-black"
          >
            Brand Guidelines
          </a>
          <div className="h-4 w-px bg-black/20"></div>
          <a
            href="#"
            className="font-medium text-gray-800 transition-all hover:text-black"
          >
            Trademark Policy
          </a>
        </div>
      </footer>
    </>
  );
}

export default Footer;
