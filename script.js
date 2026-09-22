document.getElementById("year").textContent = new Date().getFullYear();

document.querySelectorAll("[data-service]").forEach(link => {
  link.addEventListener("click", () => {
    setTimeout(() => {
      const value = link.dataset.service;
      const select = document.getElementById("serviceSelect");
      if (select) select.value = value;
    }, 100);
  });
});

const form = document.getElementById("bookingForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  status.textContent = "Sending your enquiry...";
  status.style.color = "#555";

  const data = Object.fromEntries(new FormData(form).entries());

  try {
    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    });
    const result = await response.json();

    if (!response.ok) throw new Error(result.message || "Something went wrong.");

    status.textContent = "Enquiry received. The workshop can contact you soon.";
    status.style.color = "#16734a";
    form.reset();
  } catch (err) {
    status.textContent = "Could not send online. Please call 98848 38037.";
    status.style.color = "#a33";
  }
});
