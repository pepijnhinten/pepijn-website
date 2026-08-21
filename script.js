// Minimal script to prove script.js is connected
console.log("script.js is connected");

const navigationLinks = document.querySelectorAll('nav a[href^="#"]');
const sections = document.querySelectorAll("main section");

if ("IntersectionObserver" in window && navigationLinks.length > 0 && sections.length > 0) {
	const sectionObserver = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) {
					return;
				}

				const sectionId = entry.target.id;
				const activeLink = document.querySelector(`nav a[href="#${sectionId}"]`);

				if (!activeLink) {
					return;
				}

				navigationLinks.forEach((link) => {
					link.classList.remove("active");
				});
				activeLink.classList.add("active");
			});
		},
		{ threshold: 0.5 }
	);

	sections.forEach((section) => {
		sectionObserver.observe(section);
	});
}
