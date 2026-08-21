// Minimal script to prove script.js is connected
console.log("script.js is connected");

const navigationLinks = document.querySelectorAll('nav a[href^="#"]');
const sections = document.querySelectorAll("main section");

if ("IntersectionObserver" in window && navigationLinks.length > 0 && sections.length > 0) {
	const visibleSections = new Map();

	const sectionObserver = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					visibleSections.set(entry.target, entry.intersectionRatio);
				} else {
					visibleSections.delete(entry.target);
				}
			});

			const activeSection = [...sections].reduce((mostVisible, section) => {
				if (!visibleSections.has(section)) {
					return mostVisible;
				}

				if (!mostVisible || visibleSections.get(section) > visibleSections.get(mostVisible)) {
					return section;
				}

				return mostVisible;
			}, null);

			if (!activeSection) {
				return;
			}

			const activeLink = document.querySelector(`nav a[href="#${activeSection.id}"]`);

			if (!activeLink) {
				return;
			}

			navigationLinks.forEach((link) => {
				link.classList.remove("active");
			});
			activeLink.classList.add("active");
		},
		{ threshold: 0.5 }
	);

	sections.forEach((section) => {
		sectionObserver.observe(section);
	});
}
