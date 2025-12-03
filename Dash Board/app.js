
// Toast Box

const toastContainer = document.querySelector(".toast-container-profile");
const toastTitle = document.querySelector(".toast-title-profile");
const toastSvgBox = document.querySelector(".toast-svg-box-profile");


// Profile Page (Email) 

const profileEmailBoxLoading = document.querySelector("#profile-email-box-loading");
const profileEmailBoxSvg = document.querySelector("#profile-email-box-svg");
const profileEmailBoxTitle = document.querySelector("#profile-email-box-title");
const profileChangeEmailBoxTitle = document.querySelector("#profile-change-email-box-title");
const profileChangeEmailBoxInput = document.querySelector("#profile-change-email-box-input");
const profileChangeEmailBoxSvg = document.querySelector("#profile-change-email-box__svg");
const profileChangeEmailBoxBtn = document.querySelector("#profile-change-email-box-btn");

const changeEmailBoxRegex = /^([\w+\_?\.?\-}]+@[gmail|yahoo]{5}.com)$/;
const changePasswordBoxRegex = /^([\w\.?\!?\@?\#?\$?\_?\-]{8,30})$/;
const changeNameBoxRegex = /^([A-Z]|[a-z][ ?]{0,1}){2,20}$/;
const changeLanguageBoxRegex = /^([A-Z]|[a-z][ ?]{0,1}){2,20}$/;
const changeDepartmentBoxRegex = /^([A-Z]|[a-z][ ?]{0,1}){2,20}$/;
const changeWorkHistoryBoxRegex = /^([A-Z]|[a-z][ ?]{0,1}){2,20}$/;
const changeNastionalCodeBoxRegex = /^\d{10}$/;
const URL = "https://exiisvfojfvddjdzkwuc.supabase.co";
const APIKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4aWlzdmZvamZ2ZGRqZHprd3VjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyNDUxMDAsImV4cCI6MjA3NDgyMTEwMH0.wnUOObRHjDs66Z4F1H48LbRRW9oQtiYAGfIUJrowM5o";

const openChangeEmailBoxHandller = () => {
    profileChangeEmailBoxTitle.classList.remove("disable");
    profileChangeEmailBoxInput.classList.remove("disable");
    profileChangeEmailBoxBtn.classList.remove("disable");
    profileChangeEmailBoxSvg.classList.add("disable");
    profileChangeEmailBoxInput.value = "";
}
const closeChangeEmailBoxHandller = () => {
    profileChangeEmailBoxTitle.classList.add("disable");
    profileChangeEmailBoxInput.classList.add("disable");
    profileChangeEmailBoxBtn.classList.add("disable");
    profileChangeEmailBoxSvg.classList.remove("disable");
}
const changeEmailBoxHandller = () => {
    const changeEmailBoxInputValue = profileChangeEmailBoxInput.value;
    const isChangeEmailBoxTrue = changeEmailBoxRegex.test(changeEmailBoxInputValue);
    if (!isChangeEmailBoxTrue) {
        toastContainer.classList.remove("hidden");
        toastContainer.classList.add("toast-open");
        toastTitle.innerHTML = "Please use a valid email.";
        toastSvgBox.innerHTML =
            `
                <svg class="size-6 toast-invalid-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
            `;
    } else {
        fetch(`${URL}/rest/v1/ProfileAdmin?id=eq.1`, {
            method: "PATCH",
            headers:
            {
                "apikey": `${APIKey}`,
                "Authorization": "Bearer" + `${APIKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ adminEmail: changeEmailBoxInputValue }),
        }).then((Response) => {
            if (Response.status === 204) {
                toastContainer.classList.remove("hidden");
                toastContainer.classList.toggle("toast-open");
                toastTitle.innerHTML = "Your email has been successfully changed.";
                toastSvgBox.innerHTML =
                    `
                        <svg class="size-6 toast-valid-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg
                    `;
                fetchDataHandller();
                closeChangeEmailBoxHandller();
                ShowInfoOfDashboardHandller();
                ShowInfoOfProductsHandller();
                fetchDataForProductsMessage();
                fetchDataForProfileMessage();
            }
        });
    }
    setTimeout(() => {
        toastContainer.classList.add("hidden");
        toastContainer.classList.remove("toast-open");
    }, 3500);
}
const fetchDataHandller = () => {
    lodingPage.classList.remove("hidden");
    fetch(`${URL}/rest/v1/ProfileAdmin?select=*`, {
        method: "GET",
        headers:
        {
            "apikey": `${APIKey}`,
            "Authorization": "Bearer" + `${APIKey}`,
        }
    }).then((Response) => Response.json()).then((data) => {
        showOkRoNoProfileEmailBoxHandller(data);
        showOkRoNoProfilePasswordBoxHandller(data);
        showOkRoNoProfileNameBoxHandller(data);
        showOkRoNoProfileLanguageBoxHandller(data);
        showOkRoNoProfileDepartmentBoxHandller(data);
        showOkRoNoProfileHistoryBoxHandller(data);
        showOkRoNoProfileNationalBoxHandller(data);
        showOkRoNoProfileBirthdayBoxHandller(data);
        shimmerEfects();
        hiddenLoadingPage();
    })
}
const shimmerEfects = () => {
    const boxShimmerTitles = document.querySelectorAll('.box-shimmer-title');
    const boxShimmerSvgs = document.querySelectorAll('.box-shimmer-svg');
    const profileEmailBoxEmailTitles = document.querySelectorAll('.profile-email-box-email-title');
    const profileEmailBoxStatusS = document.querySelectorAll('.profile-email-box-status');

    boxShimmerTitles.forEach((boxShimmerTitle) => {
        boxShimmerTitle.classList.remove("box-shimmer-title-loading");
    })
    profileEmailBoxEmailTitles.forEach((profileEmailBoxEmailTitle) => {
        profileEmailBoxEmailTitle.style.opacity = '1';
    })
    boxShimmerSvgs.forEach((boxShimmerSvg) => {
        boxShimmerSvg.classList.remove("box-shimmer-svg-loading");
    })
    profileEmailBoxStatusS.forEach((profileEmailBoxStatus) => {
        profileEmailBoxStatus.style.display = 'block';
    })
}
const showOkRoNoProfileEmailBoxHandller = (data) => {
    if (data[0]?.adminEmail !== "") {
        profileEmailBoxLoading.innerHTML = `${data[0]?.adminEmail}`;
        profileEmailBoxSvg.innerHTML =
            `
                <svg class="size-6 profile-email-box__oksvg" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" stroke-width="3" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
            `;
    } else {
        profileEmailBoxLoading.innerHTML = `Empty`;
        profileEmailBoxSvg.innerHTML =
            `
                <svg class="size-6 profile-email-box__notoksvg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="3" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            `;
    }
}

const goTopPage = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}

window.addEventListener("load", fetchDataHandller);
profileChangeEmailBoxBtn.addEventListener("click", changeEmailBoxHandller);
profileChangeEmailBoxBtn.addEventListener("click", goTopPage);
profileChangeEmailBoxSvg.addEventListener("click", openChangeEmailBoxHandller);

// Profile Page (Password) 

const profilePasswordBoxLoading = document.querySelector("#profile-password-box-loading");
const profilePasswordBoxSvg = document.querySelector("#profile-password-box-svg");
const profilePasswordBoxTitle = document.querySelector("#profile-password-box-title");
const profileChangePasswordBoxInput = document.querySelector("#profile-change-password-box-input");
const profileChangeRePasswordBoxInput = document.querySelector("#profile-change-repassword-box-input");
const profileChangePasswordBoxTitle = document.querySelector("#profile-change-password-box-title");
const profileChangePasswordBoxSvg = document.querySelector("#profile-change-password-box__svg");
const profileChangePasswordBoxBtn = document.querySelector("#profile-change-password-box-btn");


const openChangePasswordBoxHandller = () => {
    profilePasswordBoxTitle.classList.remove("disable");
    profileChangePasswordBoxInput.classList.remove("disable");
    profileChangeRePasswordBoxInput.classList.remove("disable");
    profileChangePasswordBoxTitle.classList.remove("disable");
    profileChangePasswordBoxBtn.classList.remove("disable")
    profileChangePasswordBoxSvg.classList.add("disable");
    profileChangeRePasswordBoxInput.value = "";
}
const closeChangePasswordBoxHandller = () => {
    profileChangePasswordBoxInput.classList.add("disable");
    profileChangeRePasswordBoxInput.classList.add("disable");
    profileChangePasswordBoxTitle.classList.add("disable");
    profileChangePasswordBoxBtn.classList.add("disable")
    profileChangePasswordBoxSvg.classList.remove("disable");
}
const changePasswordBoxHandller = () => {
    const changePasswordBoxValue = profileChangePasswordBoxInput.value;
    const changeRePasswordBoxValue = profileChangeRePasswordBoxInput.value;
    const isChangePasswordBoxTrue = changePasswordBoxRegex.test(changePasswordBoxValue);
    if (!isChangePasswordBoxTrue) {
        toastContainer.classList.remove("hidden");
        toastContainer.classList.add("toast-open");
        toastTitle.innerHTML = "Please use A-z !@#$._-. min-8  max-30";
        toastSvgBox.innerHTML =
            `
                <svg class="size-6 toast-invalid-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
            `;
    } else if (changePasswordBoxValue !== changeRePasswordBoxValue) {
        toastContainer.classList.remove("hidden");
        toastContainer.classList.add("toast-open");
        toastTitle.innerHTML = "Password And RePassword Not Match.";
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
        fetch(`${URL}/rest/v1/ProfileAdmin?id=eq.1`, {
            method: "PATCH",
            headers:
            {
                "apikey": `${APIKey}`,
                "Authorization": "Bearer" + `${APIKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ adminPassword: changePasswordBoxValue }),
        }).then((Response) => {
            if (Response.status === 204) {
                toastContainer.classList.remove("hidden");
                toastContainer.classList.add("toast-open");
                toastTitle.innerHTML = "Your Password has been successfully changed.";
                toastSvgBox.innerHTML =
                    `
                        <svg class="size-6 toast-valid-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg
                    `;
                fetchDataHandller();
                closeChangePasswordBoxHandller();
                fetchDataForProfileMessage();
                ShowInfoOfDashboardHandller();
                ShowInfoOfProductsHandller();
                fetchDataForProductsMessage();
                fetchDataForProfileMessage();
            }
        });
    }
    setTimeout(() => {
        toastContainer.classList.add("hidden");
        toastContainer.classList.remove("toast-open");
    }, 3500);
}
const showOkRoNoProfilePasswordBoxHandller = (data) => {
    if (data[0]?.adminPassword !== "") {
        profilePasswordBoxLoading.innerHTML = `${data[0]?.adminPassword}`;
        profilePasswordBoxSvg.innerHTML =
            `
                <svg class="size-6 profile-email-box__oksvg" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" stroke-width="3" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
            `;
    } else {
        profilePasswordBoxLoading.innerHTML = `Empty`;
        profilePasswordBoxSvg.innerHTML =
            `
                <svg class="size-6 profile-email-box__notoksvg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="3" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            `;
    }
}
profileChangePasswordBoxBtn.addEventListener("click", changePasswordBoxHandller);
profileChangePasswordBoxBtn.addEventListener("click", goTopPage);
profileChangePasswordBoxSvg.addEventListener("click", openChangePasswordBoxHandller);


// Profile Page (Name) 

const profileNameBoxLoading = document.querySelector("#profile-name-box-loading");
const profileNameBoxSvg = document.querySelector("#profile-name-box-svg");
const profileNameBoxTitle = document.querySelector("#profile-name-box-title");
const profileChangeNameBoxTitle = document.querySelector("#profile-change-name-box-title");
const profileChangeNameBoxInput = document.querySelector("#profile-change-name-box-input");
const profileChangeNameBoxSvg = document.querySelector("#profile-change-name-box__svg");
const profileChangeNameBoxBtn = document.querySelector("#profile-change-name-box-btn");

const openChangeNameBoxHandller = () => {
    profileChangeNameBoxTitle.classList.remove("disable");
    profileChangeNameBoxInput.classList.remove("disable");
    profileChangeNameBoxBtn.classList.remove("disable");
    profileChangeNameBoxSvg.classList.add("disable");
    profileChangeNameBoxInput.value = "";
}
const closeChangeNameBoxHandller = () => {
    profileChangeNameBoxTitle.classList.add("disable");
    profileChangeNameBoxInput.classList.add("disable");
    profileChangeNameBoxBtn.classList.add("disable");
    profileChangeNameBoxSvg.classList.remove("disable");
}
const changeNameBoxHandller = () => {
    const changeNameBoxInputValue = profileChangeNameBoxInput.value;
    const isChangeNameBoxTrue = changeNameBoxRegex.test(changeNameBoxInputValue);
    if (!isChangeNameBoxTrue) {
        toastContainer.classList.remove("hidden");
        toastContainer.classList.add("toast-open");
        toastTitle.innerHTML = "Please use a valid name. min-3 max-20";
        toastSvgBox.innerHTML =
            `
                <svg class="size-6 toast-invalid-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
            `;
    } else {
        fetch(`${URL}/rest/v1/ProfileAdmin?id=eq.1`, {
            method: "PATCH",
            headers:
            {
                "apikey": `${APIKey}`,
                "Authorization": "Bearer" + `${APIKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ adminName: changeNameBoxInputValue }),
        }).then((Response) => {
            if (Response.status === 204) {
                toastContainer.classList.remove("hidden");
                toastContainer.classList.add("toast-open");
                toastTitle.innerHTML = "Your Name has been successfully changed.";
                toastSvgBox.innerHTML =
                    `
                        <svg class="size-6 toast-valid-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg
                    `;
                fetchDataHandller();
                closeChangeNameBoxHandller();
                fecthInforamationHandller();
                ShowInfoOfDashboardHandller();
                ShowInfoOfProductsHandller();
                fetchDataForProductsMessage();
                fetchDataForProfileMessage();
            }
        });
    }
    setTimeout(() => {
        toastContainer.classList.add("hidden");
        toastContainer.classList.remove("toast-open");
    }, 3500);
}
const showOkRoNoProfileNameBoxHandller = (data) => {
    if (data[0]?.adminName !== "") {
        profileNameBoxLoading.innerHTML = `${data[0]?.adminName}`;
        profileNameBoxSvg.innerHTML =
            `
                <svg class="size-6 profile-email-box__oksvg" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" stroke-width="3" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
            `;
    } else {
        profileNameBoxLoading.innerHTML = `Empty`;
        profileNameBoxSvg.innerHTML =
            `
                <svg class="size-6 profile-email-box__notoksvg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="3" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            `;
    }
}
profileChangeNameBoxBtn.addEventListener("click", changeNameBoxHandller);
profileChangeNameBoxBtn.addEventListener("click", goTopPage);
profileChangeNameBoxSvg.addEventListener("click", openChangeNameBoxHandller);


// Profile Page (Language) 

const profileLanguageBoxLoading = document.querySelector("#profile-language-box-loading");
const profileLanguageBoxSvg = document.querySelector("#profile-Language-box-svg");
const profileLanguageBoxTitle = document.querySelector("#profile-Language-box-title");
const profileChangeLanguageBoxTitle = document.querySelector("#profile-change-Language-box-title");
const profileChangeLanguageBoxInput = document.querySelector("#profile-change-Language-box-input");
const profileChangeLanguageBoxSvg = document.querySelector("#profile-change-Language-box__svg");
const profileChangeLanguageBoxBtn = document.querySelector("#profile-change-Language-box-btn");


const openChangeLanguageBoxHandller = () => {
    profileChangeLanguageBoxTitle.classList.remove("disable");
    profileChangeLanguageBoxInput.classList.remove("disable");
    profileChangeLanguageBoxBtn.classList.remove("disable");
    profileChangeLanguageBoxSvg.classList.add("disable");
    profileChangeLanguageBoxInput.value = "";
}
const closeChangeLanguageBoxHandller = () => {
    profileChangeLanguageBoxTitle.classList.add("disable");
    profileChangeLanguageBoxInput.classList.add("disable");
    profileChangeLanguageBoxSvg.classList.remove("disable");
    profileChangeLanguageBoxBtn.classList.add("disable");
}
const changeLanguageBoxHandller = () => {
    const changeLanguageBoxInputValue = profileChangeLanguageBoxInput.value;
    const isChangeLanguageBoxTrue = changeLanguageBoxRegex.test(changeLanguageBoxInputValue);
    if (!isChangeLanguageBoxTrue) {
        toastContainer.classList.remove("hidden");
        toastContainer.classList.add("toast-open");
        toastTitle.innerHTML = "Please use a valid Language. min-2 max-20";
        toastSvgBox.innerHTML =
            `
                <svg class="size-6 toast-invalid-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
            `;
    } else {
        fetch(`${URL}/rest/v1/ProfileAdmin?id=eq.1`, {
            method: "PATCH",
            headers:
            {
                "apikey": `${APIKey}`,
                "Authorization": "Bearer" + `${APIKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ adminLanguage: changeLanguageBoxInputValue }),
        }).then((Response) => {
            if (Response.status === 204) {
                toastContainer.classList.remove("hidden");
                toastContainer.classList.add("toast-open");
                toastTitle.innerHTML = "Your Language has been successfully changed.";
                toastSvgBox.innerHTML =
                    `
                        <svg class="size-6 toast-valid-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg
                    `;
                fetchDataHandller();
                closeChangeLanguageBoxHandller();
                fecthInforamationHandller();
                ShowInfoOfDashboardHandller();
                ShowInfoOfProductsHandller();
                fetchDataForProductsMessage();
                fetchDataForProfileMessage();
            }
        });
    }
    setTimeout(() => {
        toastContainer.classList.add("hidden");
        toastContainer.classList.remove("toast-open");
    }, 3500);
}
const showOkRoNoProfileLanguageBoxHandller = (data) => {
    if (data[0]?.adminLanguage !== "") {
        profileLanguageBoxLoading.innerHTML = `${data[0]?.adminLanguage}`;
        profileLanguageBoxSvg.innerHTML =
            `
                <svg class="size-6 profile-email-box__oksvg" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" stroke-width="3" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
            `;
    } else {
        profileLanguageBoxLoading.innerHTML = `Empty`;
        profileLanguageBoxSvg.innerHTML =
            `
                <svg class="size-6 profile-email-box__notoksvg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="3" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            `;
    }
}
profileChangeLanguageBoxSvg.addEventListener("click", openChangeLanguageBoxHandller);
profileChangeLanguageBoxBtn.addEventListener("click", changeLanguageBoxHandller);
profileChangeLanguageBoxBtn.addEventListener("click", goTopPage);


// Profile Page (Department) 

const profileDepartmentBoxLoading = document.querySelector("#profile-department-box-loading");
const profileDepartmentBoxSvg = document.querySelector("#profile-department-box-svg");
const profileDepartmentBoxTitle = document.querySelector("#profile-department-box-title");
const profileChangeDepartmentBoxTitle = document.querySelector("#profile-change-department-box-title");
const profileChangeDepartmentBoxInput = document.querySelector("#profile-change-department-box-input");
const profileChangeDepartmentBoxSvg = document.querySelector("#profile-change-department-box__svg");
const profileChangeDepartmentBoxBtn = document.querySelector("#profile-change-department-box-btn");

const openChangeDepartmentBoxHandller = () => {
    profileChangeDepartmentBoxTitle.classList.remove("disable");
    profileChangeDepartmentBoxInput.classList.remove("disable");
    profileChangeDepartmentBoxBtn.classList.remove("disable");
    profileChangeDepartmentBoxSvg.classList.add("disable");
    profileChangeDepartmentBoxInput.value = "";
}
const closeChangeDepartmentBoxHandller = () => {
    profileChangeDepartmentBoxTitle.classList.add("disable");
    profileChangeDepartmentBoxInput.classList.add("disable");
    profileChangeDepartmentBoxBtn.classList.add("disable");
    profileChangeDepartmentBoxSvg.classList.remove("disable");
}
const changeDepartmentBoxHandller = () => {
    const changeDepartmentBoxInputValue = profileChangeDepartmentBoxInput.value;
    const isChangeDepartmentBoxTrue = changeDepartmentBoxRegex.test(changeDepartmentBoxInputValue);
    if (!isChangeDepartmentBoxTrue) {
        toastContainer.classList.remove("hidden");
        toastContainer.classList.add("toast-open");
        toastTitle.innerHTML = "Please use a valid Department.";
        toastSvgBox.innerHTML =
            `
                <svg class="size-6 toast-invalid-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
            `;
    } else {
        fetch(`${URL}/rest/v1/ProfileAdmin?id=eq.1`, {
            method: "PATCH",
            headers:
            {
                "apikey": `${APIKey}`,
                "Authorization": "Bearer" + `${APIKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ adminDepartment: changeDepartmentBoxInputValue }),
        }).then((Response) => {
            if (Response.status === 204) {
                toastContainer.classList.remove("hidden");
                toastContainer.classList.add("toast-open");
                toastTitle.innerHTML = "Your Department has been successfully changed.";
                toastSvgBox.innerHTML =
                    `
                        <svg class="size-6 toast-valid-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg
                    `;
                fetchDataHandller();
                closeChangeDepartmentBoxHandller();
                fecthInforamationHandller();
                ShowInfoOfDashboardHandller();
                ShowInfoOfProductsHandller();
                fetchDataForProductsMessage();
                fetchDataForProfileMessage();
            }
        });
    }
    setTimeout(() => {
        toastContainer.classList.add("hidden");
        toastContainer.classList.remove("toast-open");
    }, 3500);
}
const showOkRoNoProfileDepartmentBoxHandller = (data) => {
    if (data[0]?.adminDepartment !== "") {
        profileDepartmentBoxLoading.innerHTML = `${data[0]?.adminDepartment}`;
        profileDepartmentBoxSvg.innerHTML =
            `
                <svg class="size-6 profile-email-box__oksvg" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" stroke-width="3" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
            `;
    } else {
        profileDepartmentBoxLoading.innerHTML = `Empty`;
        profileDepartmentBoxSvg.innerHTML =
            `
                <svg class="size-6 profile-email-box__notoksvg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="3" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            `;
    }
}
profileChangeDepartmentBoxSvg.addEventListener("click", openChangeDepartmentBoxHandller);
profileChangeDepartmentBoxBtn.addEventListener("click", changeDepartmentBoxHandller);
profileChangeDepartmentBoxBtn.addEventListener("click", goTopPage);


// Profile Page (Work History) 

const profileHistoryBoxLoading = document.querySelector("#profile-history-box-loading");
const profileHistoryBoxSvg = document.querySelector("#profile-history-box-svg");
const profileHistoryBoxTitle = document.querySelector("#profile-history-box-title");
const profileChangeHistoryBoxTitle = document.querySelector("#profile-change-history-box-title");
const profileChangeHistoryBoxInput = document.querySelector("#profile-change-history-box-input");
const profileChangeHistoryBoxSvg = document.querySelector("#profile-change-history-box__svg");
const profileChangeHistoryBoxBtn = document.querySelector("#profile-change-history-box-btn");

const openChangeHistoryBoxHandller = () => {
    profileChangeHistoryBoxTitle.classList.remove("disable");
    profileChangeHistoryBoxInput.classList.remove("disable");
    profileChangeHistoryBoxBtn.classList.remove("disable");
    profileChangeHistoryBoxSvg.classList.add("disable");
    profileChangeHistoryBoxInput.value = "";
}
const closeChangeHistoryBoxHandller = () => {
    profileChangeHistoryBoxTitle.classList.add("disable");
    profileChangeHistoryBoxInput.classList.add("disable");
    profileChangeHistoryBoxBtn.classList.add("disable");
    profileChangeHistoryBoxSvg.classList.remove("disable");
}
const changeHistoryBoxHandller = () => {
    const changeHistoryBoxInputValue = profileChangeHistoryBoxInput.value;
    const isChangeHistoryBoxTrue = changeWorkHistoryBoxRegex.test(changeHistoryBoxInputValue);
    if (!isChangeHistoryBoxTrue) {
        toastContainer.classList.remove("hidden");
        toastContainer.classList.add("toast-open");
        toastTitle.innerHTML = "Please use a valid History.";
        toastSvgBox.innerHTML =
            `
                <svg class="size-6 toast-invalid-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
            `;
    } else {
        fetch(`${URL}/rest/v1/ProfileAdmin?id=eq.1`, {
            method: "PATCH",
            headers:
            {
                "apikey": `${APIKey}`,
                "Authorization": "Bearer" + `${APIKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ adminWorkHistory: changeHistoryBoxInputValue }),
        }).then((Response) => {
            if (Response.status === 204) {
                toastContainer.classList.remove("hidden");
                toastContainer.classList.add("toast-open");
                toastTitle.innerHTML = "Your Work History has been successfully changed.";
                toastSvgBox.innerHTML =
                    `
                        <svg class="size-6 toast-valid-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg
                    `;
                fetchDataHandller();
                closeChangeHistoryBoxHandller();
                fecthInforamationHandller();
                ShowInfoOfDashboardHandller();
                ShowInfoOfProductsHandller();
                fetchDataForProductsMessage();
                fetchDataForProfileMessage();
            }
        });
    }
    setTimeout(() => {
        toastContainer.classList.add("hidden");
        toastContainer.classList.remove("toast-open");
    }, 3500);
}
const showOkRoNoProfileHistoryBoxHandller = (data) => {
    if (data[0]?.adminWorkHistory !== "") {
        profileHistoryBoxLoading.innerHTML = `${data[0]?.adminWorkHistory}`;
        profileHistoryBoxSvg.innerHTML =
            `
                <svg class="size-6 profile-email-box__oksvg" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" stroke-width="3" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
            `;
    } else {
        profileHistoryBoxLoading.innerHTML = `Empty`;
        profileHistoryBoxSvg.innerHTML =
            `
                <svg class="size-6 profile-email-box__notoksvg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="3" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            `;
    }
}
profileChangeHistoryBoxSvg.addEventListener("click", openChangeHistoryBoxHandller);
profileChangeHistoryBoxBtn.addEventListener("click", changeHistoryBoxHandller);
profileChangeHistoryBoxBtn.addEventListener("click", goTopPage);

// Profile Page (National Code) 

const profileNationalBoxLoading = document.querySelector("#profile-national-box-loading");
const profileNationalBoxSvg = document.querySelector("#profile-national-box-svg");
const profileNationalBoxTitle = document.querySelector("#profile-national-box-title");
const profileChangeNationalBoxTitle = document.querySelector("#profile-change-national-box-title");
const profileChangeNationalBoxInput = document.querySelector("#profile-change-national-box-input");
const profileChangeNationalBoxSvg = document.querySelector("#profile-change-national-box__svg");
const profileChangeNationalBoxBtn = document.querySelector("#profile-change-national-box-btn");

const openChangeNationalBoxHandller = () => {
    profileChangeNationalBoxTitle.classList.remove("disable");
    profileChangeNationalBoxInput.classList.remove("disable");
    profileChangeNationalBoxBtn.classList.remove("disable");
    profileChangeNationalBoxSvg.classList.add("disable");
}
const closeChangeNationalBoxHandller = () => {
    profileChangeNationalBoxTitle.classList.add("disable");
    profileChangeNationalBoxInput.classList.add("disable");
    profileChangeNationalBoxBtn.classList.add("disable");
    profileChangeNationalBoxSvg.classList.remove("disable");
}
const changeNationalBoxHandller = () => {
    const changeNationalBoxInputValue = profileChangeNationalBoxInput.value;
    const isChangeNationalBoxTrue = changeNastionalCodeBoxRegex.test(changeNationalBoxInputValue);
    if (!isChangeNationalBoxTrue) {
        toastContainer.classList.remove("hidden");
        toastContainer.classList.add("toast-open");
        toastTitle.innerHTML = "Please use a valid National Code.";
        toastSvgBox.innerHTML =
            `
                <svg class="size-6 toast-invalid-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
            `;
    } else {
        fetch(`${URL}/rest/v1/ProfileAdmin?id=eq.1`, {
            method: "PATCH",
            headers:
            {
                "apikey": `${APIKey}`,
                "Authorization": "Bearer" + `${APIKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ adminNationalCode: changeNationalBoxInputValue }),
        }).then((Response) => {
            if (Response.status === 204) {
                toastContainer.classList.remove("hidden");
                toastContainer.classList.add("toast-open");
                toastTitle.innerHTML = "Your National Code has been successfully changed.";
                toastSvgBox.innerHTML =
                    `
                        <svg class="size-6 toast-valid-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg
                    `;
                fetchDataHandller();
                closeChangeNationalBoxHandller();
                fecthInforamationHandller();
                ShowInfoOfDashboardHandller();
                ShowInfoOfProductsHandller();
                fetchDataForProductsMessage();
                fetchDataForProfileMessage();
            }
        });
    }
    setTimeout(() => {
        toastContainer.classList.add("hidden");
        toastContainer.classList.remove("toast-open");
    }, 3500);
}
const showOkRoNoProfileNationalBoxHandller = (data) => {
    if (data[0]?.adminNationalCode !== "") {
        profileNationalBoxLoading.innerHTML = `${data[0]?.adminNationalCode}`;
        profileNationalBoxSvg.innerHTML =
            `
                <svg class="size-6 profile-email-box__oksvg" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" stroke-width="3" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
            `;
    } else {
        profileNationalBoxLoading.innerHTML = `Empty`;
        profileNationalBoxSvg.innerHTML =
            `
                <svg class="size-6 profile-email-box__notoksvg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="3" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            `;
    }
}
profileChangeNationalBoxSvg.addEventListener("click", openChangeNationalBoxHandller);
profileChangeNationalBoxBtn.addEventListener("click", changeNationalBoxHandller);
profileChangeNationalBoxBtn.addEventListener("click", goTopPage);

// Profile Page (Birthday) 

const profileBirthdayBoxLoading = document.querySelector("#profile-birthday-box-loading");
const profileBirthdayBoxSvg = document.querySelector("#profile-birthday-box-svg");
const profileBirthdayBoxTitle = document.querySelector("#profile-birthday-box-title");
const profileChangeBirthdayBoxTitle = document.querySelector("#profile-change-birthday-box-title");
const profileChangeBirthdayBoxInput = document.querySelector("#profile-change-birthday-box-input");
const profileChangeBirthdayBoxSvg = document.querySelector("#profile-change-birthday-box__svg");
const profileChangeBirthdayBoxBtn = document.querySelector("#profile-change-birthday-box-btn");

const openChangeBirthdayBoxHandller = () => {
    profileChangeBirthdayBoxTitle.classList.remove("disable");
    profileChangeBirthdayBoxInput.classList.remove("disable");
    profileChangeBirthdayBoxBtn.classList.remove("disable");
    profileChangeBirthdayBoxSvg.classList.add("disable");
}
const closeChangeBirthdayBoxHandller = () => {
    profileChangeBirthdayBoxTitle.classList.add("disable");
    profileChangeBirthdayBoxInput.classList.add("disable");
    profileChangeBirthdayBoxBtn.classList.add("disable");
    profileChangeBirthdayBoxSvg.classList.remove("disable");
}
const changeBirthdayBoxHandller = () => {
    const changeBirthdayBoxInputValue = profileChangeBirthdayBoxInput.value;
    if (changeBirthdayBoxInputValue < 18) {
        toastContainer.classList.remove("hidden");
        toastContainer.classList.add("toast-open");
        toastTitle.innerHTML = "Please use a valid Birthday. 18 years and above";
        toastSvgBox.innerHTML =
            `
                <svg class="size-6 toast-invalid-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
            `;
    } else {
        fetch(`${URL}/rest/v1/ProfileAdmin?id=eq.1`, {
            method: "PATCH",
            headers:
            {
                "apikey": `${APIKey}`,
                "Authorization": "Bearer" + `${APIKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ adminBirthday: changeBirthdayBoxInputValue }),
        }).then((Response) => {
            if (Response.status === 204) {
                toastContainer.classList.remove("hidden");
                toastContainer.classList.add("toast-open");
                toastTitle.innerHTML = "Your Birthday has been successfully changed.";
                toastSvgBox.innerHTML =
                    `
                        <svg class="size-6 toast-valid-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg
                    `;
                fetchDataHandller();
                closeChangeBirthdayBoxHandller();
                fecthInforamationHandller();
                ShowInfoOfDashboardHandller();
                ShowInfoOfProductsHandller();
                fetchDataForProductsMessage();
                fetchDataForProfileMessage();
            }
        });
    }
    setTimeout(() => {
        toastContainer.classList.add("hidden");
        toastContainer.classList.remove("toast-open");
    }, 3500);
}
const showOkRoNoProfileBirthdayBoxHandller = (data) => {
    if (data[0]?.adminBirthday !== "") {
        profileBirthdayBoxLoading.innerHTML = `${data[0]?.adminBirthday}`;
        profileBirthdayBoxSvg.innerHTML =
            `
                <svg class="size-6 profile-email-box__oksvg" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" stroke-width="3" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
            `;
    } else {
        profileBirthdayBoxLoading.innerHTML = `Empty`;
        profileBirthdayBoxSvg.innerHTML =
            `
                <svg class="size-6 profile-email-box__notoksvg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="3" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            `;
    }
}
profileChangeBirthdayBoxSvg.addEventListener("click", openChangeBirthdayBoxHandller);
profileChangeBirthdayBoxBtn.addEventListener("click", changeBirthdayBoxHandller);
profileChangeBirthdayBoxBtn.addEventListener("click", goTopPage);




// Products Page (Create) -----------------

// Create Products (toast)

const toastContainerProducts = document.querySelector(".toast-container-products");
const toastTitleProducts = document.querySelector(".toast-title-products");
const toastSvgBoxProducts = document.querySelector(".toast-svg-box-products");

// Products Page (Create) 

const createPorductsPage = document.querySelector("#create-porducts-page");
const porductsCreateBox = document.querySelector("#porducts-create-box");
const porductsCreateBoxBtns = document.querySelector("#porducts-create-box-btns");
const createBoxSelectBtn = document.querySelector("#create-box-select");
const selectBox = document.querySelector("#select-box");
const selectBoxItemNormal = document.querySelector("#select-box-item-normal");
const selectBoxItemImportant = document.querySelector("#select-box-item-important");
const selectBoxItemNotimportant = document.querySelector("#select-box-item-Notimportant");
const createBoxSelectTitle = document.querySelector("#create-box-select-title");

// Create Products (inputs)

const createproductInputBrand = document.querySelector("#create-product-input-brand");
const createproductInputRam = document.querySelector("#create-product-input-ram");
const createproductInputMemory = document.querySelector("#create-product-input-memory");
const createproductInputCamera = document.querySelector("#create-product-input-camera");
const createproductInputColoring = document.querySelector("#create-product-input-coloring");
const createproductInputPrice = document.querySelector("#create-product-input-price");
const createproductInputQty = document.querySelector("#create-product-input-qty");

// Create Products (btns)

const openCreateProductBtn = document.querySelector("#open-create-inputs");
const createProductBtn = document.querySelector("#create-product-btn");

userChooseCategory = "";

const openCreateProductModal = () => {
    createPorductsPage.classList.toggle("create-porducts-page-open");
    porductsCreateBox.classList.toggle("create-box-open");
    porductsCreateBoxBtns.classList.toggle("porducts-create-box-btns-open");
    openCreateProductBtn.classList.toggle("close-create-inputs");
}
const closeCreateProductModal = () => {
    createPorductsPage.classList.remove("create-porducts-page-open");
    porductsCreateBox.classList.remove("create-box-open");
    porductsCreateBoxBtns.classList.remove("porducts-create-box-btns-open");
    openCreateProductBtn.classList.remove("close-create-inputs");
}
const closeSelectBox = () => {
    selectBox.classList.remove("select-box-open");
}
const openSelectBox = () => {
    selectBox.classList.toggle("select-box-open");
}
const userChooseNormal = () => {
    userChooseCategory = "";
    userChooseCategory = selectBoxItemNormal.value;
    createBoxSelectTitle.innerHTML = userChooseCategory;
    closeSelectBox();
}
const userChooseImportant = () => {
    userChooseCategory = "";
    userChooseCategory = selectBoxItemImportant.value;
    createBoxSelectTitle.innerHTML = userChooseCategory;
    closeSelectBox();
}
const userChooseNotImportant = () => {
    userChooseCategory = "";
    userChooseCategory = selectBoxItemNotimportant.value;
    createBoxSelectTitle.innerHTML = userChooseCategory;
    closeSelectBox();
}
const createProductHandller = () => {
    const createproductInputBrandValue = createproductInputBrand.value;
    const createproductInputRamValue = createproductInputRam.value;
    const createproductInputMemoryValue = createproductInputMemory.value;
    const createproductInputCameraValue = createproductInputCamera.value;
    const createproductInputColoringValue = createproductInputColoring.value;
    const createproductInputPriceValue = createproductInputPrice.value;
    const createproductInputQtyValue = createproductInputQty.value;
    if (!createproductInputBrandValue.length) {
        toastContainerProducts.classList.toggle("toast-open-products");
        toastTitleProducts.innerHTML = "Please enter mobile brand";
        toastSvgBoxProducts.innerHTML =
            `
                <svg class="size-6 toast-invalid-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
            `;
    } else if (!createproductInputRamValue.length) {
        toastContainerProducts.classList.toggle("toast-open-products");
        toastTitleProducts.innerHTML = "Please enter mobile ram";
        toastSvgBoxProducts.innerHTML =
            `
                <svg class="size-6 toast-invalid-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
            `;
    } else if (!createproductInputMemoryValue.length) {
        toastContainerProducts.classList.toggle("toast-open-products");
        toastTitleProducts.innerHTML = "Please enter mobile memory";
        toastSvgBoxProducts.innerHTML =
            `
                <svg class="size-6 toast-invalid-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
            `;
    } else if (!createproductInputCameraValue.length) {
        toastContainerProducts.classList.toggle("toast-open-products");
        toastTitleProducts.innerHTML = "Please enter mobile camera";
        toastSvgBoxProducts.innerHTML =
            `
                <svg class="size-6 toast-invalid-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
            `;
    } else if (!createproductInputColoringValue.length) {
        toastContainerProducts.classList.toggle("toast-open-products");
        toastTitleProducts.innerHTML = "Please enter mobile coloring";
        toastSvgBoxProducts.innerHTML =
            `
                <svg class="size-6 toast-invalid-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
            `;
    } else if (!createproductInputPriceValue.length) {
        toastContainerProducts.classList.toggle("toast-open-products");
        toastTitleProducts.innerHTML = "Please enter mobile price";
        toastSvgBoxProducts.innerHTML =
            `
                <svg class="size-6 toast-invalid-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
            `;
    } else if (!createproductInputQtyValue.length) {
        toastContainerProducts.classList.toggle("toast-open-products");
        toastTitleProducts.innerHTML = "Please enter mobile qty";
        toastSvgBoxProducts.innerHTML =
            `
                <svg class="size-6 toast-invalid-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
            `;
    } else if (userChooseCategory === "") {
        toastContainerProducts.classList.toggle("toast-open-products");
        toastTitleProducts.innerHTML = "Please enter mobile category";
        toastSvgBoxProducts.innerHTML =
            `
                <svg class="size-6 toast-invalid-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
            `;
    } else {
        lodingPage.classList.remove("hidden");
        fetch(`${URL}/rest/v1/products`, {
            method: "POST",
            headers:
            {
                "apikey": `${APIKey}`,
                "Authorization": "Bearer" + `${APIKey}`,
                "Content-type": "application/json",
            },
            body: JSON.stringify
                ({
                    mobileBrand: createproductInputBrandValue,
                    mobileRam: createproductInputRamValue,
                    mobileMemory: createproductInputMemoryValue,
                    mobileCamera: createproductInputCameraValue,
                    mobileColoring: createproductInputColoringValue,
                    mobilePrice: createproductInputPriceValue,
                    mobileQty: createproductInputQtyValue,
                    mobileCategory: userChooseCategory,
                })
        }).then((Response) => {
            if (Response.status === 201) {
                toastContainerProducts.classList.toggle("toast-open-products");
                toastTitleProducts.innerHTML = "The product was successfully created.";
                toastSvgBoxProducts.innerHTML =
                    `
                        <svg class="size-6 toast-valid-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                    `;
                fetchProductsDB();
                showProductsHandller();
                ShowInfoOfDashboardHandller();
                ShowInfoOfProductsHandller();
                fetchLastProductsHandller();
                fetchDataForProductsMessage();
                fetchDataForProfileMessage();
            }
        })
        setTimeout(() => {
            toastContainerProducts.classList.remove("toast-open-products");
            closeCreateProductModal();
            createproductInputBrand.value = "";
            createproductInputRam.value = "";
            createproductInputMemory.value = "";
            createproductInputCamera.value = "";
            createproductInputColoring.value = "";
            createproductInputPrice.value = "";
            createproductInputQty.value = "";
            userChooseCategory = "";
            createBoxSelectTitle.innerHTML = "example : normal";
            productsContainerProductContainer.innerHTML = "";
        }, 3500);
    }
    setTimeout(() => {
        toastContainerProducts.classList.remove("toast-open-products");
    }, 3500);
}


openCreateProductBtn.addEventListener("click", openCreateProductModal);
createProductBtn.addEventListener("click", createProductHandller);
createProductBtn.addEventListener("click", goTopPage);
selectBoxItemNormal.addEventListener("click", userChooseNormal);
selectBoxItemImportant.addEventListener("click", userChooseImportant);
selectBoxItemNotimportant.addEventListener("click", userChooseNotImportant);
createBoxSelectBtn.addEventListener("click", openSelectBox);



// Products Page (Show) -----------------

const container = document.querySelector(".container");
const editProductContainer = document.querySelector(".edit-product-container");
const productsContainerProductContainer = document.querySelector("#products-container-product");
const paginationProductsContainer = document.querySelector("#pagination-products");
const productBoxs = document.querySelectorAll("#product-box-products");
const answerDeleteProduct = document.querySelector(".delete-box-parent");
const avalableOrNoTxt = document.querySelector(".avalableOrNoTxt");

const editContainerProduct = document.querySelector(".edit-box-parent");
const editProductModalProductBtns = document.querySelectorAll("#edit-product-modal-product-btn");

const editProductBox = document.querySelector(".edit-input-parent");

const editProductBoxTitle = document.querySelector("#edit-product-box-title");
const editProductBoxLabel = document.querySelector("#edit-product-box-label");
const editProductBoxInput = document.querySelector("#edit-product-box-input");

const okDeleteProductBtn = document.querySelector("#ok-delete-product");
const noDeleteProductBtn = document.querySelector("#no-delete-product");

const productBoxNoBtn = document.querySelector("#product-box-no-btn");
const productBoxOkBtn = document.querySelector("#product-box-ok-btn");

let page = 1;
let porductPerPage = 4;

let idForDeleteProduct = null;
let idForEditProduct = null;

let userChooseToEdit = null;
let userChooseToEditShow = null;


const hiddenLoadingShimmer = () => {
    productBoxs.forEach((productBox) => {
        productBox.style.display = "none";
    })
}
const noHiddenLoadingShimmer = () => {
    productBoxs.forEach((productBox) => {
        productBox.style.display = "block";
    })
}
const fetchProductsDB = () => {
    lodingPage.classList.remove("hidden");
    fetch(`${URL}/rest/v1/products`, {
        method: "GET",
        headers:
        {
            "apikey": `${APIKey}`,
            "Authorization": "Bearer" + `${APIKey}`,
        },
    }).then((Response) => {
        if (Response.status === 200) {
            hiddenLoadingShimmer();
            hiddenLoadingPage();
            return Response.json();
        }
    }).then((data) => {
        showProductsHandller(data);
        pageGenarator(data);
        if (data.length <= 4) {
            paginationProductsContainer.style.justifyContent = "center";
        } else {
            paginationProductsContainer.style.justifyContent = "space-evenly";
        }
        if (data.length > 0) {
            avalableOrNoTxt.classList.add("hidden");
        } else {
            avalableOrNoTxt.classList.remove("hidden");
        }
    })
}
const showProductsHandller = (products) => {
    productsContainerProductContainer.innerHTML = "";
    if (Array.isArray(products)) {
        let startIndex = (page - 1) * porductPerPage;
        let lastIndex = startIndex + porductPerPage;
        if (products !== undefined) {
            const shownProducts = products.slice(startIndex, lastIndex);
            shownProducts.forEach((shownProduct) => {
                productsContainerProductContainer.insertAdjacentHTML("afterbegin",
                    `
                    <div class="product-box">
                            <img class="product-box-img" src="Images/background-user.svg" alt="img-product">
                            <div class="product-box-top">
                                <p class=" product-title-font">Mobile Brand : <span
                                        class="product-caption-font">${shownProduct.mobileBrand}</span></p>
                                <div class="product-box-edit-btn">
                                    <svg onclick="openEditproductModal(${shownProduct.id})" class="size-6 edit-btn-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                        fill="currentColor">
                                        <path
                                            d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z">
                                        </path>
                                    </svg>
                                </div>
                            </div>
                            <p class="product-box-ram product-title-font">Mobile Ram : <span class="product-caption-font">${shownProduct.mobileRam}
                                    GB</span></p>

                            <p class="product-box-memory product-title-font">Mobile Memory : <span
                                    class="product-caption-font">${shownProduct.mobileMemory} GB</span></p>

                            <p class="product-box-camera product-title-font">Mobile Camera : <span
                                    class="product-caption-font">${shownProduct.mobileCamera} mega px</span></p>

                            <p class="product-box-coloring product-title-font">Mobile Coloring : <span
                                    class="product-caption-font">${shownProduct.mobileColoring}</span></p>

                            <p class="product-box-qty product-title-font">Mobile qty : <span
                                    class="product-caption-font">${shownProduct.mobileQty}</span></p>

                            <div class="product-box-bottom">
                                <p class="product-box-category product-title-font">Category : <span
                                        class="product-caption-font">${shownProduct.mobileCategory}</span></p>
                                <p class="product-box-price product-title-font">Price : <span
                                        class="product-caption-font">$${shownProduct.mobilePrice.toLocaleString()}</span></p>
                            </div>
                            <btn class="product-box-delete" onclick="openDeleteProductModal(${shownProduct.id})">
                                <svg class="size-6 product-box-delete-svg" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </btn>
                    </div>
                `
                )
            })
        }
    }
    filters = [];
}
const changePage = (selectesPage) => {
    productsContainerProductContainer.innerHTML = "";
    page = selectesPage;
    const numberPages = document.querySelectorAll(".page");
    numberPages.forEach((numberPage) => {
        if (+numberPage.innerHTML === page) {
            numberPage.classList.add("page-active");
        } else {
            numberPage.classList.remove("page-active");
        }
    })
    fetchProductsDB();
    setFiltersOnData();
    showProductsHandller();
}
const pageGenarator = (products) => {
    const countPage = products?.length / porductPerPage;
    paginationProductsContainer.innerHTML = "";
    for (let i = 0; i < countPage; i++) {
        paginationProductsContainer.insertAdjacentHTML("afterbegin",
            `<button class="pagination-product-btn ${i === 0 ? "page-active" : ""}" onclick ="changePage(${i + 1})">${i + 1}</button>`
        )

    }
}
const openDeleteProductModal = (productID) => {
    idForDeleteProduct = productID;
    setTimeout(() => {
        answerDeleteProduct.classList.remove("hidden");
    }, 100);
    container.classList.add("blur2");
    goTopPage();
}
const deleteProductHandller = () => {
    fetch(`${URL}/rest/v1/products?id=eq.${idForDeleteProduct}`, {
        method: "DELETE",
        headers: {
            "apikey": `${APIKey}`,
            "Authorization": "Bearer" + `${APIKey}`,
        }
    }).then((Response) => {
        if (Response.status === 204) {
            productsContainerProductContainer.innerHTML = "";
            fetchProductsDB();
            fetchLastProductsHandller();
            fetchDataForProductsMessage();
            fetchDataForProfileMessage();
        }
    })
    closeDeleteProductModal();
}
const closeDeleteProductModal = () => {
    answerDeleteProduct.classList.add("hidden");
    container.classList.remove("blur2");
}
const openEditproductModal = (productID) => {
    idForEditProduct = productID;
    setTimeout(() => {
        editContainerProduct.classList.remove("hidden");
    }, 100);
    container.classList.add("blur2");
    goTopPage();
}
const closeEditproductModal = () => {
    editContainerProduct.classList.add("hidden");
    container.classList.remove("blur2");
}
editProductModalProductBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
        let editProductBoxInputValue = editProductBoxInput.value;
        editProductBoxInputValue = "";
        userChooseToEdit = "";
        userChooseToEditShow = "";
        userChooseToEdit = event.target.value;
        userChooseToEditShow = btn.innerHTML;
        openInputForEdit();
    })
})
const openInputForEdit = () => {
    editProductBox.classList.remove("hidden");
    closeEditproductModal();
    container.classList.add("blur2");
}
const closeInputForEdit = () => {
    editProductBox.classList.add("hidden");
    container.classList.remove("blur2");
}
const editProductHandller = () => {
    const editProductBoxInputValue = editProductBoxInput.value;
    lodingPage.classList.remove("hidden");
    fetch(`${URL}/rest/v1/products?id=eq.${idForEditProduct}`, {
        method: "PATCH",
        headers:
        {
            "apikey": `${APIKey}`,
            "Authorization": "Bearer" + `${APIKey}`,
            "content-type": "application/json",
        },
        body: JSON.stringify({ [userChooseToEdit]: editProductBoxInputValue }),
    }).then((Response) => {
        if (Response.status === 204) {
            productsContainerProductContainer.innerHTML = "";
            fetchProductsDB();
            closeInputForEdit();
            hiddenLoadingPage();
        }
    })
}

productBoxOkBtn.addEventListener("click", editProductHandller);
productBoxNoBtn.addEventListener("click", closeInputForEdit);
okDeleteProductBtn.addEventListener("click", deleteProductHandller);
noDeleteProductBtn.addEventListener("click", closeDeleteProductModal);
window.addEventListener("load", fetchProductsDB);
window.addEventListener("load", showProductsHandller);



// Products Page (Filters) -----------------



const filtersContainerProducts = document.querySelector(".fillters-box-parent");
const filtersContainer = document.querySelector(".filters-container");
const filterBtnSvg = document.querySelector(".filter-btn-svg");

const filterBoxProductTitle = document.querySelector(".filter-box-product-title>span");
const filterInputRangeBoxProduct = document.querySelector(".filter-input-range-box-product");

const filterInputBrandBox = document.querySelector(".filter-input-brand-box");
const filterInputRamBox = document.querySelector(".filter-input-ram-box");
const filterInputMemoryBox = document.querySelector(".filter-input-memory-box");
const filterInputCameraBox = document.querySelector(".filter-input-camera-box");
const filterInputColoringBox = document.querySelector(".filter-input-coloring-box");

const acceptFiltersProductBtn = document.querySelector(".accept-filters-product-btn");

const filterProductBtn = document.querySelector(".filter-product-btn");

let filters = [];
let inputPriceRange = null;


const openFiltersModal = () => {
    filtersContainerProducts.classList.remove("hidden");
    container.classList.add("blur");
    filterInputBrandBox.value = "";
    filterInputRamBox.value = "";
    filterInputMemoryBox.value = "";
    filterInputCameraBox.value = "";
    filterInputColoringBox.value = "";
}
const closeFiltersModal = () => {
    filtersContainerProducts.classList.add("hidden");
    container.classList.remove("blur");
}
const closeFiltersModalScreen = (event) => {
    const eventTarget = event.target;
    if (eventTarget !== filterProductBtn && eventTarget !== filterBtnSvg && !filtersContainer.contains(eventTarget)) {
        closeFiltersModal();
    }
}
const setFilterPriceHandller = (event) => {
    inputPriceRange = +event.target.value;
    filterBoxProductTitle.innerHTML = inputPriceRange.toLocaleString();
}
const setFiltersOnData = () => {
    let baseQuery = `${URL}/rest/v1/products?select=*`;
    const filterInputBrandBoxValue = filterInputBrandBox.value;
    const filterInputRamBoxValue = filterInputRamBox.value;
    const filterInputMemoryBoxValue = filterInputMemoryBox.value;
    const filterInputCameraBoxValue = filterInputCameraBox.value;
    const filterInputColoringBoxValue = filterInputColoringBox.value;
    if (filterInputBrandBoxValue) {
        filters.push(`mobileBrand=eq.${filterInputBrandBoxValue}`);
    } else if (filterInputRamBoxValue) {
        filters.push(`mobileRam=eq.${filterInputRamBoxValue}`);
    } else if (filterInputMemoryBoxValue) {
        filters.push(`mobileMemory=eq.${filterInputMemoryBoxValue}`);
    } else if (filterInputCameraBoxValue) {
        filters.push(`mobileCamera=eq.${filterInputCameraBoxValue}`);
    } else if (filterInputColoringBoxValue) {
        filters.push(`mobileColoring=eq.${filterInputColoringBoxValue}`);
    } else if (inputPriceRange) {
        filters.push(`mobilePrice=lte.${inputPriceRange}`);
    }
    if (filters.length > 0) {
        baseQuery += `&${filters.join("&")}`;
    }

    fetch(baseQuery, {
        method: "GET",
        headers:
        {
            "apikey": `${APIKey}`,
            "Authorization": "Bearer" + `${APIKey}`,
        }
    }).then((Response) => {
        if (Response.status === 200) {
            return Response.json();
        }
    }).then((data) => {
        if (data.length) {
            showProductsHandller(data);
        } else {
            showProductsHandller();
        }
        pageGenarator(data);
    })
    closeFiltersModal();
}




acceptFiltersProductBtn.addEventListener("click", setFiltersOnData);
filterInputRangeBoxProduct.addEventListener("input", setFilterPriceHandller);
filterProductBtn.addEventListener("click", openFiltersModal);
filterProductBtn.addEventListener("click", goTopPage);
window.addEventListener("click", closeFiltersModalScreen);



// Panel (open) -----------------



const openPanelBtn = document.querySelector(".panel-btn");
const panel = document.querySelector(".panel");

const openPanelHandller = () => {
    panel.classList.toggle("panel-open");
    openPanelBtn.classList.toggle("panel-btn__close");
}
const closePanelHandller = () => {
    panel.classList.remove("panel-open");
    openPanelBtn.classList.remove("panel-btn__close");
}
const isPanelOpen = (event) => {
    const eventTarget = event.target;
    if (eventTarget !== openPanelBtn && !panel.contains(eventTarget)) {
        closePanelHandller();
    }
}

openPanelBtn.addEventListener("click", openPanelHandller);
window.addEventListener("click", isPanelOpen);





// Panel (set) -----------------

// Panel (Item) -----------------
const panelItemDashboard = document.querySelector("#panel-item-dashboard");
const panelItemProfile = document.querySelector("#panel-item-profile");
const panelItemPorducts = document.querySelector("#panel-item-porducts");
const panelItemMessages = document.querySelector("#panel-item-messages");
const panelItemTheme = document.querySelector("#panel-item-theme");
const panelItemLogout = document.querySelector("#panel-item-logout");

// Panel (svg) -----------------

const panelItemDashboardSvg = document.querySelector("#panel-item-dashboard-svg");
const panelItemProfileSvg = document.querySelector("#panel-item-profile-svg");
const panelItemPorductsSvg = document.querySelector("#panel-item-porducts-svg");
const panelItemMessagesSvg = document.querySelector("#panel-item-messages-svg");

const porductsPageContainer = document.querySelector(".porducts-page");
const profilePageContainer = document.querySelector(".profile-page");
const dashboardPageContainer = document.querySelector(".dashboard-page");

let whichPageUserIn = "";

const dashboardPanelActive = () => {
    panelItemPorducts.classList.remove("panel-active");
    panelItemTheme.classList.remove("panel-active");
    panelItemLogout.classList.remove("panel-active");
    panelItemProfile.classList.remove("panel-active");
    panelItemDashboard.classList.add("panel-active");

    panelItemDashboardSvg.classList.add("panel-active--icon");
    panelItemProfileSvg.classList.remove("panel-active--icon");
    panelItemPorductsSvg.classList.remove("panel-active--icon");
    panelItemMessagesSvg.classList.remove("panel-active--icon");

    localStorage.removeItem(whichPageUserIn);
    whichPageUserIn = "dashboardPage";
    localStorage.setItem("dashboardPage", whichPageUserIn);
    porductsPageContainer.classList.add("hidden");
    profilePageContainer.classList.add("hidden");
    dashboardPageContainer.classList.remove("hidden");
    closePanelHandller();
}
const getDashboardPageFromLocalStorage = () => {
    const isDashboardPageAvalble = localStorage.getItem("dashboardPage");
    if (isDashboardPageAvalble) {
        dashboardPanelActive();
    }
}
const profilePanelActive = () => {
    panelItemDashboard.classList.remove("panel-active");
    panelItemPorducts.classList.remove("panel-active");
    panelItemTheme.classList.remove("panel-active");
    panelItemLogout.classList.remove("panel-active");
    panelItemProfile.classList.add("panel-active");

    panelItemProfileSvg.classList.add("panel-active--icon");
    panelItemDashboardSvg.classList.remove("panel-active--icon");
    panelItemPorductsSvg.classList.remove("panel-active--icon");
    panelItemMessagesSvg.classList.remove("panel-active--icon");

    localStorage.removeItem(whichPageUserIn);
    whichPageUserIn = "profilePage";
    localStorage.setItem("profilePage", whichPageUserIn);
    porductsPageContainer.classList.add("hidden");
    dashboardPageContainer.classList.add("hidden");
    profilePageContainer.classList.remove("hidden");
    closePanelHandller();
}
const getProfilePageFromLocalStorage = () => {
    const isProfilePageAvalble = localStorage.getItem("profilePage");
    if (isProfilePageAvalble) {
        profilePanelActive();
    }
}
const productsPanelActive = () => {
    panelItemDashboard.classList.remove("panel-active");
    panelItemTheme.classList.remove("panel-active");
    panelItemLogout.classList.remove("panel-active");
    panelItemProfile.classList.remove("panel-active");
    panelItemPorducts.classList.add("panel-active");

    panelItemPorductsSvg.classList.add("panel-active--icon");
    panelItemProfileSvg.classList.remove("panel-active--icon");
    panelItemDashboardSvg.classList.remove("panel-active--icon");
    panelItemMessagesSvg.classList.remove("panel-active--icon");

    localStorage.removeItem(whichPageUserIn);
    whichPageUserIn = "productsPage";
    localStorage.setItem("productsPage", whichPageUserIn);
    profilePageContainer.classList.add("hidden");
    dashboardPageContainer.classList.add("hidden");
    porductsPageContainer.classList.remove("hidden");
    closePanelHandller();
}
const getProductsPageFromLocalStorage = () => {
    const isProductsPageAvalble = localStorage.getItem("productsPage");
    if (isProductsPageAvalble) {
        productsPanelActive();
    }
}


panelItemDashboard.addEventListener("click", dashboardPanelActive);
panelItemProfile.addEventListener("click", profilePanelActive);
panelItemPorducts.addEventListener("click", productsPanelActive);
window.addEventListener("load", getProductsPageFromLocalStorage);
window.addEventListener("load", getProfilePageFromLocalStorage);
window.addEventListener("load", getDashboardPageFromLocalStorage);



// Dashboard (Top Page) -----------------



const dapartmentInfoTxt = document.querySelector("#dapartment-info");
const salaryInfoTxt = document.querySelector("#salary-info");
const historyInfoTxt = document.querySelector("#history-info");
const languageInfoTxt = document.querySelector("#language-info");
const productsInfoTxt = document.querySelector("#products-info");

let totalSalary = 0;

const ShowInfoOfDashboardHandller = () => {
    fetch(`${URL}/rest/v1/ProfileAdmin?select=*`, {
        method: "GET",
        headers:
        {
            "apikey": `${APIKey}`,
            "Authorization": "Bearer" + `${APIKey}`,
        }
    }).then((Response) => Response.json()).then((data) => {
        if (data[0].adminWorkHistory.length !== 0) {
            historyInfoTxt.innerHTML = data[0].adminWorkHistory;
        } else {
            historyInfoTxt.innerHTML = "Empty";
        }
        if (data[0].adminLanguage.length !== 0) {
            languageInfoTxt.innerHTML = data[0].adminLanguage;
        } else {
            languageInfoTxt.innerHTML = "Empty";
        }
        if (data[0].adminDepartment.length !== 0) {
            dapartmentInfoTxt.innerHTML = data[0].adminDepartment;
        } else {
            dapartmentInfoTxt.innerHTML = "Empty";
        }
    })
}
const ShowInfoOfProductsHandller = () => {
    fetch(`${URL}/rest/v1/products?select=mobilePrice`, {
        method: "GET",
        headers:
        {
            "apikey": `${APIKey}`,
            "Authorization": "Bearer" + `${APIKey}`,
        }
    }).then((Response) => Response.json()).then((data) => {
        for (let i = 0; i < data.length; i++) {
            totalSalary += data[i].mobilePrice;
        }
        if (data.length) {
            salaryInfoTxt.innerHTML = totalSalary.toLocaleString();
            productsInfoTxt.innerHTML = data.length;
        } else {
            productsInfoTxt.innerHTML = "Empty";
        }
    })

}

window.addEventListener("load", ShowInfoOfDashboardHandller);
window.addEventListener("load", ShowInfoOfProductsHandller);


// Dashboard (Middle Page) -----------------



const imageUser = document.querySelector(".image-user");
const nameUser = document.querySelector(".name-user");
const jobUser = document.querySelector(".job-user");
const numberOfFolowers = document.querySelector(".number-of-folowers");
const numberOfFolowing = document.querySelector(".number-of-folowing");

const navUserImage = document.querySelector(".nav-user");

const BaseURLGitHub = "https://api.github.com/users";

const showGitHubInfoHandller = () => {
    fetch(`${BaseURLGitHub}/mojombo`).then((Response) => Response.json()).then((data) => {
        imageUser.setAttribute("src", data.avatar_url);
        nameUser.innerHTML = data.login;
        jobUser.innerHTML = `<a href="${data.html_url}">${data.html_url}</a>`;
        numberOfFolowers.innerHTML = data.followers.toLocaleString();
        numberOfFolowing.innerHTML = data.following.toLocaleString();
        navUserImage.innerHTML = "";
        navUserImage.insertAdjacentHTML("afterbegin",
            `
                <img src="${data.avatar_url}" class="nav-user-img">
            `
        )
    })
}
window.addEventListener("load", showGitHubInfoHandller);



// Dashboard (Last Products) -----------------



const lastProductTitle1 = document.querySelector("#last-product__title1");
const lastProductTitle2 = document.querySelector("#last-product__title2");
const boxForLastProducts = document.querySelector(".box-for-last-products");
const noavailbleLastProductsTxt = document.querySelector(".noavailble-last-products");

const lastProductLinks = document.querySelectorAll(".last-product__link");
const lastProductEditBtns = document.querySelectorAll(".last-product__svg");

const fetchLastProductsHandller = () => {
    boxForLastProducts.innerHTML = ""
    fetch(`${URL}/rest/v1/products?select=*&order=id.desc&limit=2`, {
        method: "GET",
        headers:
        {
            "apikey": `${APIKey}`,
            "Authorization": "Bearer" + `${APIKey}`,
        }
    }).then((Response) => {
        if (Response.status === 200) {
            return Response.json();
        }
    }).then((data) => {
        if (data?.length) {
            if (data[0]) {
                boxForLastProducts.insertAdjacentHTML("beforeend",
                    `
                    <div class="last-product-box">
                        <img class="last-product__img" src="Images/Image1.svg" alt="Image1">
                        <div class="last-product__info">
                            <p class="last-product__title" id="last-product__title1">${data[0].mobileBrand}</p>
                            <div class="last-product__container">
                                <p class="last-product__count">Project #1 .</p>
                                <p class="last-product__link"><a href="#" onclick="goProductsPage()">See project details</a></p>
                            </div>
                        </div>
                        <svg class="size-6 last-product__svg" onclick="goProductsPage()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                            fill="currentColor">
                            <path
                                d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                        </svg>
                    </div>
                `
                )
            }
            if (data[1]) {
                boxForLastProducts.insertAdjacentHTML("beforeend",
                    `
                    <div class="last-product-box last-product-box-chill2">
                        <img class="last-product__img" src="Images/Image2.svg" alt="Image1">
                        <div class="last-product__info">
                            <p class="last-product__title" id="last-product__title2">${data[1].mobileBrand}
                            </p>
                            <div class="last-product__container">
                                <p class="last-product__count">Project #2 .</p>
                                <p class="last-product__link"><a href="#" onclick="goProductsPage()">See project details</a></p>
                            </div>
                        </div>
                        <svg class="size-6 last-product__svg" onclick="goProductsPage()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                            fill="currentColor">
                            <path
                                d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                        </svg>
                    </div>
                `
                )
            }
            noavailbleLastProductsTxt.classList.add("hidden");
        } else {
            noavailbleLastProductsTxt.classList.remove("hidden");
        }
    })
}
const goProductsPage = () => {
    productsPanelActive();
}
window.addEventListener("load", fetchLastProductsHandller);



// Dashboard (Information) -----------------
const generalBoxCaptionLanguage = document.querySelector("#general-box__caption-language");
const generalBoxCaptionDepartment = document.querySelector("#general-box__caption-department");
const generalBoxCaptionWorkhistory = document.querySelector("#general-box__caption-workhistory");
const generalBoxCaptionNationalcode = document.querySelector("#general-box__caption-nationalcode");
const generalBoxCaptionAge = document.querySelector("#general-box__caption-age");
const generalBoxs = document.querySelector(".general-boxs");
const navUserName = document.querySelector(".nav-user__name");

const fecthInforamationHandller = () => {
    fetch(`${URL}/rest/v1/ProfileAdmin`, {
        method: "GET",
        headers:
        {
            "apikey": `${APIKey}`,
            "Authorization": "Bearer" + `${APIKey}`,
        }
    }).then((Response) => Response.json()).then((data) => {
        if (data[0].adminLanguage.length !== 0) {
            generalBoxCaptionLanguage.innerHTML = data[0].adminLanguage;
        }
        if (data[0].adminWorkHistory.length !== 0) {
            generalBoxCaptionWorkhistory.innerHTML = data[0].adminWorkHistory;
        }
        if (data[0].adminNationalCode.length !== 0) {
            generalBoxCaptionNationalcode.innerHTML = data[0].adminNationalCode;
        }
        if (data[0].adminBirthday.length !== 0) {
            generalBoxCaptionAge.innerHTML = data[0].adminBirthday;
        }
        if (data[0].adminDepartment.length !== 0) {
            generalBoxCaptionDepartment.innerHTML = data[0].adminDepartment;
        }
    })
}

window.addEventListener("load", fecthInforamationHandller);



// Nav (Message) -----------------


const messageParent = document.querySelector(".messageParent");
const boxMessage = document.querySelector(".box-message");

const navMessageBtn = document.querySelector(".nav-message");
const panelMessageBtn = document.querySelector(".message-box");
const MessageCountainerBtn = document.querySelector(".nav-message-btn");
const messageContainerTopBtn = document.querySelector(".message-container-top-svg");
const navShowProfileBtn = document.querySelector(".nav-user__container");
const orgContainer = document.querySelector(".org-container");

const openMessageBoxHandller = () => {
    messageParent.classList.add("messageParent-open");
    container.classList.add("blur2");
}
const closeMessageBoxHandller = () => {
    messageParent.classList.remove("messageParent-open");
    container.classList.remove("blur2");
}
const fetchDataForProductsMessage = () => {
    MessageCountainerBtn.classList.remove("nav-message-btn-err");
    boxMessage.innerHTML = "";
    fetch(`${URL}/rest/v1/products`, {
        method: "GET",
        headers:
        {
            "apikey": `${APIKey}`,
            "Authorization": "Bearer" + `${APIKey}`,
        }
    }).then((Response) => Response.json()).then((data) => {
        showProductsMessageHandller(data);
        setTimeout(() => {
            isMessageBoxEmpty();
        }, 500);
    })
}
const showProductsMessageHandller = (data) => {
    if (data.length === 2) {
        boxMessage.insertAdjacentHTML("beforeend",
            `
                <div class="messeage-box" onclick="transferToProductsPage()">
                    <svg class="size-6 messeage-box-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                    <p class="message-title message-title-light">Products available is 2.</p>
                </div>
            `
        )
        MessageCountainerBtn.classList.add("nav-message-btn-err");
    } if (data.length === 1) {
        boxMessage.insertAdjacentHTML("beforeend",
            `
                <div class="messeage-box" onclick="transferToProductsPage()">
                    <svg class="size-6 messeage-box-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                    <p class="message-title message-title-light">Products available is 1.</p>
                </div>
            `
        )
        MessageCountainerBtn.classList.add("nav-message-btn-err");
    } if (data.length === 0) {
        boxMessage.insertAdjacentHTML("beforeend",
            `
                <div class="messeage-box" onclick="transferToProductsPage()">
                    <svg class="size-6 messeage-box-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                    <p class="message-title message-title-light">There is no product available.</p>
                </div>
            `
        )
        MessageCountainerBtn.classList.add("nav-message-btn-err");
    }

}
const fetchDataForProfileMessage = () => {
    MessageCountainerBtn.classList.remove("nav-message-btn-err");
    boxMessage.innerHTML = "";
    fetch(`${URL}/rest/v1/ProfileAdmin`, {
        method: "GET",
        headers:
        {
            "apikey": `${APIKey}`,
            "Authorization": "Bearer" + `${APIKey}`,
        }
    }).then((Response) => Response.json()).then((data) => {
        showProfileMessageHandller(data);
        setTimeout(() => {
            isMessageBoxEmpty();
        }, 500);
    })
}
const showProfileMessageHandller = (data) => {
    if (!data[0].adminWorkHistory.length) {
        boxMessage.insertAdjacentHTML("beforeend",
            `
                <div class="messeage-box" onclick="transferToProfilePage()">
                    <svg class="size-6 messeage-box-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                    <p class="message-title message-title-light">Complate Your Work History.</p>
                </div>
            `
        )
        MessageCountainerBtn.classList.add("nav-message-btn-err");

    } if (!data[0].adminNationalCode.length) {
        boxMessage.insertAdjacentHTML("beforeend",
            `
                <div class="messeage-box" onclick="transferToProfilePage()">
                    <svg class="size-6 messeage-box-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                    <p class="message-title message-title-light">Complate Your National Code.</p>
                </div>
            `
        )
        MessageCountainerBtn.classList.add("nav-message-btn-err");
    } if (!data[0].adminName.length) {
        boxMessage.insertAdjacentHTML("beforeend",
            `
                <div class="messeage-box" onclick="transferToProfilePage()">
                    <svg class="size-6 messeage-box-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                    <p class="message-title message-title-light">Complate Your Name.</p>
                </div>
            `
        )
        MessageCountainerBtn.classList.add("nav-message-btn-err");
    } if (!data[0].adminLanguage.length) {
        boxMessage.insertAdjacentHTML("beforeend",
            `
                <div class="messeage-box" onclick="transferToProfilePage()">
                    <svg class="size-6 messeage-box-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                    <p class="message-title message-title-light">Complate Your Language.</p>
                </div>
            `
        )
        MessageCountainerBtn.classList.add("nav-message-btn-err");
    } if (!data[0].adminDepartment.length) {
        boxMessage.insertAdjacentHTML("beforeend",
            `
                <div class="messeage-box" onclick="transferToProfilePage()">
                    <svg class="size-6 messeage-box-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                    <p class="message-title message-title-light">Complate Your Department.</p>
                </div>
            `
        )
        MessageCountainerBtn.classList.add("nav-message-btn-err");
    } if (!data[0].adminBirthday.length) {
        boxMessage.insertAdjacentHTML("beforeend",
            `
                <div class="messeage-box" onclick="transferToProfilePage()">
                    <svg class="size-6 messeage-box-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                    <p class="message-title message-title-light">Complate Your Birthday.</p>
                </div>
            `
        )
        MessageCountainerBtn.classList.add("nav-message-btn-err");
    }
}
const transferToProfilePage = () => {
    profilePanelActive();
    closeMessageBoxHandller();
}
const transferToProductsPage = () => {
    productsPanelActive();
    closeMessageBoxHandller();
}
const isMessageBoxEmpty = () => {
    if (!boxMessage.innerHTML) {
        boxMessage.insertAdjacentHTML("beforeend",
            `
                <p style="text-align: center; font-size: 1.2rem; font-family: DMSansVariable; color: #838ca7ff;">Empty</p>
            `
        );
    }
}

navShowProfileBtn.addEventListener("click", profilePanelActive);
panelMessageBtn.addEventListener("click", openMessageBoxHandller);
panelMessageBtn.addEventListener("click", goTopPage);
navMessageBtn.addEventListener("click", openMessageBoxHandller);
messageContainerTopBtn.addEventListener("click", closeMessageBoxHandller);
messageContainerTopBtn.addEventListener("load", fetchDataForProductsMessage);
messageContainerTopBtn.addEventListener("load", fetchDataForProfileMessage);


// Theme (Change Theme) -----------------


const themeBoxBtn = document.querySelector(".theme-box");
const HTML = document.querySelector("html");
const navThemeContainer = document.querySelector(".nav-theme-btn");
const themeSvgBoxPanel = document.querySelector(".theme-svg-box");

const navThemeBtn = document.querySelector(".nav-theme");

const sunSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6 nav-theme"><path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" /></svg>`;
const moonSvg = `<svg class="size-6 nav-theme" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"fill="currentColor"><path fill-rule="evenodd"d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z"clip-rule="evenodd" /></svg>`;

let ORGTheme = "light";

const changeThemeHandller = () => {
    navThemeContainer.innerHTML = "";
    if (ORGTheme === "light") {
        ORGTheme = "dark";
        HTML.classList.add("theme-dark")
        navThemeContainer.innerHTML = sunSvg;
        localStorage.setItem("theme", "dark");
    } else {
        ORGTheme = "light";
        HTML.classList.remove("theme-dark")
        navThemeContainer.innerHTML = moonSvg;
        localStorage.setItem("theme", "light");
    }
    setAdvanceTheme();
}
const setAdvanceTheme = () => {
    if (ORGTheme === "light") {
        HTML.classList.remove("theme-dark")
        navThemeContainer.innerHTML = moonSvg;
        themeSvgBoxPanel.innerHTML = moonSvg;
        lodingPage.style.backgroundColor = "#fff";

    } else {
        HTML.classList.add("theme-dark")
        navThemeContainer.innerHTML = sunSvg;
        themeSvgBoxPanel.innerHTML = sunSvg;
        lodingPage.style.backgroundColor = "#1a1d23";
    }
}
const setThemeOnBody = () => {
    const localTheme = localStorage.getItem("theme");
    if (localTheme) {
        ORGTheme = localTheme;
    }
    setAdvanceTheme();
}

window.addEventListener("load", setThemeOnBody);
navThemeContainer.addEventListener("click", changeThemeHandller);
themeBoxBtn.addEventListener("click", changeThemeHandller);

// Loading (Set Loading) -----------------



const lodingPage = document.querySelector(".loader");

const hiddenLoadingPage = () => {
    lodingPage.classList.add("hidden");
}

const getDataFromProfileAdminForLoading = () => {
    fetch(`${URL}/rest/v1/ProfileAdmin`, {
        method: "GET",
        headers:
        {
            "apikey": `${APIKey}`,
            "Authorization": "Bearer" + `${APIKey}`
        }
    }).then((Response) => {
        if (Response.status === 200) {
            hiddenLoadingPage();
        }
    })
}

const getDataFromProductsForLoading = () => {
    fetch(`${URL}/rest/v1/products`, {
        method: "GET",
        headers:
        {
            "apikey": `${APIKey}`,
            "Authorization": "Bearer" + `${APIKey}`
        }
    }).then((Response) => {
        if (Response.status === 200) {
            hiddenLoadingPage();
        }
    })
}

window.addEventListener("load", getDataFromProfileAdminForLoading);
window.addEventListener("load", getDataFromProductsForLoading);


// Log Out () -----------------


const logoutBoxBtn = document.querySelector(".logout-box");
const logoutNoBtn = document.querySelector(".goto-page-dashboard-btn");
const logoutYesBtn = document.querySelector(".goto-page-login-btn");

const logoutBoxParent = document.querySelector(".logout-box-parent");

const logOutHandller = () => {
    logoutBoxParent.classList.toggle("hidden");
    container.classList.toggle("blur2");
}
const noLogOutHandller = () => {
    logoutBoxParent.classList.add("hidden");
    container.classList.remove("blur2");
}
const yesLogOutHandller = () => {
    window.location.replace("../index.html");
}

logoutBoxBtn.addEventListener("click", logOutHandller);
logoutNoBtn.addEventListener("click", noLogOutHandller);
logoutYesBtn.addEventListener("click", yesLogOutHandller);


// Search Handller (Search) -----------------



// ------------------------------
//  GLOBALS
// ------------------------------
let highlights = [];
let currentIndex = -1;

// ------------------------------
//  REMOVE OLD HIGHLIGHTS
// ------------------------------
function removeHighlights() {
    highlights.forEach(span => {
        const parent = span.parentNode;
        parent.replaceChild(document.createTextNode(span.textContent), span);
        parent.normalize();
    });
    highlights = [];
    currentIndex = -1;
}

// ------------------------------
//  GET ALL TEXT NODES
// ------------------------------
function getTextNodes(root) {
    const walker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode(node) {
                if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
                const parent = node.parentElement;
                if (!parent) return NodeFilter.FILTER_REJECT;

                const tag = parent.tagName.toLowerCase();
                if (["script", "style"].includes(tag)) return NodeFilter.FILTER_REJECT;

                return NodeFilter.FILTER_ACCEPT;
            }
        }
    );

    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    return nodes;
}

// ------------------------------
//  HIGHLIGHT ALL MATCHES
// ------------------------------
function highlightMatches(query) {
    const nodes = getTextNodes(document.body);
    const pattern = new RegExp(query, "gi");

    nodes.forEach(node => {
        const text = node.nodeValue;
        let match;
        let lastIndex = 0;
        const frag = document.createDocumentFragment();

        while ((match = pattern.exec(text)) !== null) {
            const start = match.index;
            const end = start + match[0].length;

            if (start > lastIndex) {
                frag.appendChild(document.createTextNode(text.slice(lastIndex, start)));
            }

            const span = document.createElement("span");
            span.className = "search-highlight";
            span.textContent = text.slice(start, end);

            highlights.push(span);
            frag.appendChild(span);

            lastIndex = end;
        }

        if (lastIndex < text.length) {
            frag.appendChild(document.createTextNode(text.slice(lastIndex)));
        }

        node.parentNode.replaceChild(frag, node);
    });
}

// ------------------------------
//  SHOW CURRENT RESULT
// ------------------------------
function showResult(i) {
    highlights.forEach(h => h.classList.remove("search-current"));

    if (i >= 0 && i < highlights.length) {
        highlights[i].classList.add("search-current");
        highlights[i].scrollIntoView({ behavior: "smooth", block: "center" });
        currentIndex = i;
    }
}

function nextResult() {
    if (!highlights.length) return;
    currentIndex = (currentIndex + 1) % highlights.length;
    showResult(currentIndex);
}

function prevResult() {
    if (!highlights.length) return;
    currentIndex = (currentIndex - 1 + highlights.length) % highlights.length;
    showResult(currentIndex);
}

// ------------------------------
//  MAIN SEARCH
// ------------------------------
function doSearch() {
    const q = document.getElementById("searchInput").value.trim();

    removeHighlights();

    if (!q) return;

    highlightMatches(q);

    if (highlights.length > 0) showResult(0);
}

function enterForSearch(event) {
    if (event.key === "Enter") doSearch();
}

// ------------------------------
//  EVENTS
// ------------------------------
window.addEventListener("keyup", enterForSearch);

document.getElementById("btnSearch").onclick = doSearch;

document.getElementById("btnClear").onclick = () => {
    document.getElementById("searchInput").value = "";
    removeHighlights();
};


