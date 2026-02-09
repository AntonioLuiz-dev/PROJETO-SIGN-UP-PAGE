const form = document.getElementById("signup-form");
const inputs = document.querySelectorAll(".input-group input");
const themeToggle = document.getElementById("theme-toggle");
const passwordInput = document.getElementById("password");
const togglePasswordBtn = document.getElementById("toggle-password");

/* =======================
   TEMA (localStorage)
======================= */
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
    document.body.classList.add("light");
    themeToggle.textContent = "🌞";
}

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");

    const isLight = document.body.classList.contains("light");
    localStorage.setItem("theme", isLight ? "light" : "dark");
    themeToggle.textContent = isLight ? "🌞" : "🌙";
});

/* =======================
   TOGGLE PASSWORD
======================= */
togglePasswordBtn.addEventListener("click", () => {
    passwordInput.type =
        passwordInput.type === "password" ? "text" : "password";
});

/* =======================
   VALIDAÇÃO POR CAMPO
======================= */
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    inputs.forEach((input) => {
        if (!validateField(input)) valid = false;
    });

    if (!valid) return;

    const button = form.querySelector("button[type='submit']");
    button.classList.add("loading");

    setTimeout(() => {
        button.classList.remove("loading");
        form.reset();
        inputs.forEach((i) => i.parentElement.classList.remove("success"));
        alert("Conta criada com sucesso 🎉");
    }, 1500);
});

inputs.forEach((input) => {
    input.addEventListener("input", () => validateField(input));
});

function validateField(input) {
    const group = input.parentElement;
    const errorText = group.querySelector(".error-text");

    if (input.value.trim() === "") {
        setError(group, errorText, "Campo obrigatório");
        return false;
    }

    if (input.type === "email" && !validateEmail(input.value)) {
        setError(group, errorText, "E-mail inválido");
        return false;
    }

    if (input.id === "password" && input.value.length < 6) {
        setError(group, errorText, "Mínimo 6 caracteres");
        return false;
    }

    setSuccess(group, errorText);
    return true;
}

function setError(group, errorText, message) {
    group.classList.add("error");
    group.classList.remove("success");
    errorText.textContent = message;
}

function setSuccess(group, errorText) {
    group.classList.remove("error");
    group.classList.add("success");
    errorText.textContent = "";
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}