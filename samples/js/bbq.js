const emailCollectorForm = document.getElementById("email-collector");

emailCollectorForm.addEventListener("submit", event => {
    event.preventDefault();
    const myFormData = new FormData(event.target);
    const firstName = myFormData.get("first-name");
    const email = myFormData.get("email");
    const updatedHtml = `
        <h2 class="submitted">Congratulations, ${firstName}!</h2>
        <p>You're on your way to becoming a bbq master!</p>
        <p class="fine-print">You will get weekly BBQ tips sent to: ${email}</p>
    `;
    const mainContent = document.getElementById("main-content");
    mainContent.innerHTML = updatedHtml;
});