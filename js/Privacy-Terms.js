document.addEventListener("DOMContentLoaded", () => {
    const backToTopBtn = document.getElementById("backToTop");
    if (!backToTopBtn) return;

    const scrollThreshold = 300;

    const toggleButtonVisibility = () => {
        if (window.scrollY > scrollThreshold || document.documentElement.scrollTop > scrollThreshold) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    };

    window.addEventListener("scroll", toggleButtonVisibility, { passive: true });
    toggleButtonVisibility();

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});
