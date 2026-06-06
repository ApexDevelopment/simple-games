// Shared theme + flat-surface toggle wiring for the grotesk design system.
// Expects two .ui-switch buttons with ids "theme-toggle" and "flat-toggle".
(() => {
	const themeKey = "spg-theme";
	const flatKey = "spg-flat";
	const root = document.body;
	const themeButton = document.getElementById("theme-toggle");
	const flatButton = document.getElementById("flat-toggle");

	const setTheme = (theme) => {
		root.setAttribute("data-theme", theme);
		if (themeButton) themeButton.setAttribute("aria-checked", String(theme === "light"));
	};

	// The "Surfaces" switch reads as layered = on / flat = off, so aria-checked
	// (and the lit thumb) tracks the layered state — the inverse of data-flat.
	const setFlat = (flat) => {
		root.setAttribute("data-flat", String(flat));
		if (flatButton) flatButton.setAttribute("aria-checked", String(!flat));
	};

	const saved = localStorage.getItem(themeKey);
	const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
	setTheme(saved || (prefersLight ? "light" : "dark"));
	setFlat(localStorage.getItem(flatKey) === "true");

	if (themeButton) {
		themeButton.addEventListener("click", () => {
			const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
			setTheme(next);
			localStorage.setItem(themeKey, next);
		});
	}

	if (flatButton) {
		flatButton.addEventListener("click", () => {
			const next = root.getAttribute("data-flat") !== "true";
			setFlat(next);
			localStorage.setItem(flatKey, String(next));
		});
	}
})();
