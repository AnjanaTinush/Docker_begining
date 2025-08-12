import { useEffect, useState } from "react";

export default function Settings() {
  const [name, setName] = useState("Demo User");
  const [email, setEmail] = useState("demo@acme.io");
  const [theme, setTheme] = useState<"light" | "dark" | "system">(() => {
    return (localStorage.getItem("theme-pref") as any) || "system";
  });

  // Apply theme to <html> and persist
  useEffect(() => {
    const root = document.documentElement;
    const apply = (mode: "light" | "dark") => {
      if (mode === "dark") root.classList.add("dark");
      else root.classList.remove("dark");
    };

    if (theme === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
      apply(prefersDark.matches ? "dark" : "light");
      const listener = (e: MediaQueryListEvent) => apply(e.matches ? "dark" : "light");
      prefersDark.addEventListener("change", listener);
      return () => prefersDark.removeEventListener("change", listener);
    } else {
      apply(theme);
      localStorage.setItem("theme-pref", theme);
    }
  }, [theme]);

  const onSave = (e: React.FormEvent) => {
    e.preventDefault();
    // here you'd call your API — we just show a quick toast-like message
    alert("Preferences saved (mock).");
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Settings</h1>

      {/* Profile */}
      <section className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-6 space-y-4">
        <h2 className="text-lg font-semibold">Profile</h2>
        <form onSubmit={onSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm text-gray-600 dark:text-gray-300">Name</span>
              <input
                className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 outline-none focus:ring-2 focus:ring-brand"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className="block">
              <span className="text-sm text-gray-600 dark:text-gray-300">Email</span>
              <input
                type="email"
                className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 outline-none focus:ring-2 focus:ring-brand"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>

          <div>
            <span className="block text-sm text-gray-600 dark:text-gray-300 mb-2">Theme</span>
            <div className="flex flex-wrap gap-2">
              <ThemeButton label="Light" active={theme === "light"} onClick={() => setTheme("light")} />
              <ThemeButton label="Dark" active={theme === "dark"} onClick={() => setTheme("dark")} />
              <ThemeButton label="System" active={theme === "system"} onClick={() => setTheme("system")} />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-brand text-white font-medium hover:bg-brand/90 transition"
            >
              Save changes
            </button>
          </div>
        </form>
      </section>

      {/* Danger zone (example) */}
      <section className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-6 space-y-3">
        <h2 className="text-lg font-semibold text-red-600">Danger zone</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Delete account will permanently remove all your data. This is just UI in the demo.
        </p>
        <button
          className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
          onClick={() => alert("Delete account (mock).")}
        >
          Delete account
        </button>
      </section>
    </div>
  );
}

function ThemeButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 rounded-md border transition ${
        active
          ? "bg-brand text-white border-brand"
          : "border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
      }`}
    >
      {label}
    </button>
  );
}
