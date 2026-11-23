// ===== Newsletter setup =====
// Paste your free Formspree endpoint here (https://formspree.io → New form → copy the URL),
// e.g. "https://formspree.io/f/abcdwxyz". Until it's set, the form opens an email instead.
const NEWSLETTER_ENDPOINT = "";
const FALLBACK_EMAIL = "info@youthinequity.ca";
// ============================

document.getElementById("year")?.replaceChildren(String(new Date().getFullYear()));

const form = document.getElementById("newsletter-form");
if (form) {
  const note = form.querySelector(".form-note");
  const button = form.querySelector("button");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = form.email.value.trim();
    const name = form.name.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      note.textContent = "Please enter a valid email address.";
      form.email.focus();
      return;
    }
    if (form._gotcha.value) return; // bot

    if (!NEWSLETTER_ENDPOINT) {
      const body = encodeURIComponent(`Please add me to the Youth in Equity newsletter.\n\nName: ${name}\nEmail: ${email}`);
      window.location.href = `mailto:${FALLBACK_EMAIL}?subject=${encodeURIComponent("Newsletter signup")}&body=${body}`;
      return;
    }

    button.disabled = true;
    note.textContent = "Subscribing…";
    try {
      const res = await fetch(NEWSLETTER_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (!res.ok) throw new Error();
      form.reset();
      note.textContent = "You're in! Watch your inbox for our next update.";
    } catch {
      note.textContent = `Something went wrong. Email us at ${FALLBACK_EMAIL} instead.`;
    } finally {
      button.disabled = false;
    }
  });
}
