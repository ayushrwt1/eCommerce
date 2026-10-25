const NavBar = () => {
  return (
    <header className="mx-auto mt-5 w-[calc(100%-2rem)] max-w-6xl rounded-t-lg border-b border-white/20 bg-[#30445b] px-6 py-2 shadow-md sm:px-10">
      <nav
        aria-label="Main navigation"
        className="flex h-10 items-center justify-between gap-5 text-gray-100"
      >
        <span aria-hidden="true" className="shrink-0 text-gray-200">
          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none">
            <path
              d="M3 6h18M3 12h18M3 18h18"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </span>

        <div className="flex h-10 min-w-0 max-w-[31.5rem] flex-1 items-center gap-3 rounded-lg bg-gray-50 px-4 text-gray-500 shadow-inner sm:mx-8">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5 shrink-0"
            fill="none"
          >
            <circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="2" />
            <path d="m16 16 4.2 4.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            aria-label="Search products"
            placeholder="Search products..."
            className="min-w-0 flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-500 sm:text-base"
          />
        </div>

        <div className="flex shrink-0 items-center gap-4 sm:gap-7">
          <span aria-hidden="true">
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none">
              <path d="M2.5 3h2l2.2 12.2a2 2 0 0 0 2 1.6h9.5a2 2 0 0 0 1.9-1.4L22 8H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="9" cy="20" r="1.4" fill="currentColor" />
              <circle cx="18" cy="20" r="1.4" fill="currentColor" />
            </svg>
          </span>
          <span aria-hidden="true">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
              <circle cx="12" cy="12" r="10" fill="currentColor" />
              <circle cx="12" cy="9" r="3" fill="#30445b" />
              <path d="M6.5 18.5c.8-2.6 2.8-4 5.5-4s4.7 1.4 5.5 4" stroke="#30445b" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
          <span aria-hidden="true">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
              <circle cx="12" cy="7" r="4" />
              <path d="M4 21v-2a8 8 0 0 1 16 0v2H4Z" />
            </svg>
          </span>
        </div>
      </nav>
    </header>
  );
};

export default NavBar