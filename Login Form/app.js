
const toastContainer = document.querySelector(".toast-container");
const toastTitle = document.querySelector(".toast-title");
const toastSvgBox = document.querySelector(".toast-svg-box");

const loginEmailInp = document.querySelector(".login-email-inp");
const loginPasswordInp = document.querySelector("#login-password-input");

const emailRegex = /^([\w+\_?\.?\-}]+@[gmail|yahoo]{5}.com)$/;

const loginBtn = document.querySelector(".login-btn");

const url = "https://exiisvfojfvddjdzkwuc.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4aWlzdmZvamZ2ZGRqZHprd3VjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyNDUxMDAsImV4cCI6MjA3NDgyMTEwMH0.wnUOObRHjDs66Z4F1H48LbRRW9oQtiYAGfIUJrowM5o";



const checkCreateUser = () => {
    const loginEmail = loginEmailInp.value;
    const isEmailTrue = emailRegex.test(loginEmail);
    const loginPassword = loginPasswordInp.value;

    if (!isEmailTrue) {
        toastContainer.classList.toggle("toast-open");
        toastTitle.innerHTML = "Please use a valid email.";
        toastSvgBox.innerHTML =
            `
                <svg class="size-6 toast-invalid-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
            `;
    } else if (!loginPassword.length) {
        toastContainer.classList.toggle("toast-open");
        toastTitle.innerHTML = "Please enter password.";
        toastSvgBox.innerHTML =
            `
                <svg class="size-6 toast-invalid-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
            `;
    }
    else {
        fetch(`${url}/rest/v1/ProfileAdmin?adminEmail=eq.${loginEmail}&&adminPassword=eq.${loginPassword}&limit=1`, {
            method: "GET",
            headers:
            {
                "apikey": `${key}`,
                "Authorization": "Bearer" + `${key}`,
            },
        }).then((Response) => {
            return Response.json();
        }).then((data) => {
            if (data) {
                if (data.length) {
                    toastContainer.classList.toggle("toast-open");
                    toastTitle.innerHTML = `Login as  ${data[0].adminName}`;
                    toastSvgBox.innerHTML =
                        `
                    <svg class="size-6 toast-valid-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                `;
                    setTimeout(() => {
                        window.location.replace("Dash Board/dashBoard.html");
                    }, 1000);
                } else {
                    toastContainer.classList.toggle("toast-open");
                    toastTitle.innerHTML = "No account found";
                    toastSvgBox.innerHTML =
                        `
                            <svg class="size-6 toast-invalid-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                            </svg>
                `;
                }
            }
        }).catch((err) => console.log(err));
    }
    setTimeout(() => {
        toastContainer.classList.remove("toast-open");
    }, 3500);
}

const goTopPage = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}

loginBtn.addEventListener("click", checkCreateUser);
loginBtn.addEventListener("click", goTopPage);




const showPasswordBtn = document.querySelector("#login-password-eye");
const passwordEyeBox = document.querySelector(".password-eye-box");
const loginRememberBtn = document.querySelector(".login-remember__btn");

let flegForPasswordEye = true;
let flegForRePasswordEye = true;

const passwordEyeHandller = () => {
    if (flegForPasswordEye) {
        passwordEyeBox.innerHTML = "";
        passwordEyeBox.innerHTML =
            `
                <svg id="login-password-eye" onclick="passwordEyeHandller()" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash login-password-eye" viewBox="0 0 16 16">
                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/>
                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
                    <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/>
                </svg> 
            `
            ;
        loginPasswordInp.type = "text";
        flegForPasswordEye = false;
    } else {
        passwordEyeBox.innerHTML = "";
        passwordEyeBox.innerHTML =
            `
                <svg id="login-password-eye" onclick="passwordEyeHandller()" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                    fill="currentColor" class="bi bi-eye login-password-eye" viewBox="0 0 16 16">
                    <path
                        d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                    <path
                        d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                </svg>
            `
            ;
        loginPasswordInp.type = "password";
        flegForPasswordEye = true;
    }
}

const rememberMeHandller = () => {
    loginRememberBtn.classList.toggle("checked");
}

loginRememberBtn.addEventListener("click", rememberMeHandller);
showPasswordBtn.addEventListener("click", passwordEyeHandller);



// Change Theme


const sunSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6 nav-theme"><path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" /></svg>`;
const moonSvg = `<svg class="size-6 nav-theme" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"fill="currentColor"><path fill-rule="evenodd"d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z"clip-rule="evenodd" /></svg>`;


const themeBtn = document.querySelector(".theme-btn");
const HTML = document.querySelector("html");

mainTheme = "Light";

const toggleThemeHandller = () => {
    if (mainTheme === "Light") {
        mainTheme = "Dark";
        HTML.classList.add("Dark-theme");
        localStorage.setItem("LoginTheme", "Dark");
    } else {
        mainTheme = "Light";
        HTML.classList.remove("Dark-theme");
        localStorage.setItem("LoginTheme", "Light");
    }
    advanceTheme();
}
const advanceTheme = () => {
    if (mainTheme === "Light") {
        HTML.classList.remove("Dark-theme");
        themeBtn.innerHTML = moonSvg;
    } else {
        HTML.classList.add("Dark-theme");
        themeBtn.innerHTML = sunSvg;
    }
}
const getThemeHandller = () => {
    const pageTheme = localStorage.getItem("LoginTheme");
    if (pageTheme) {
        mainTheme = pageTheme;
    }
    advanceTheme();
}

window.addEventListener("load", getThemeHandller);
themeBtn.addEventListener("click", toggleThemeHandller);




const loadingPage = document.querySelector(".loader");

const removeLoadingPage = () => {
    loadingPage.classList.add("hidden");
}

window.addEventListener("load", removeLoadingPage);