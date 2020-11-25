// The navbar code begins here
const toggle = document.querySelector(".navbar__hamburger");
const menu = document.querySelector(".navbar__items");
const items = document.querySelectorAll(".navbar__item");

function toggleMenu() {
    if (menu.classList.contains("active")) {
        menu.classList.remove("active");
        toggle.innerHTML = "<i class='fas fa-bars'></i>";
    } else {
        menu.classList.add("active");
        toggle.innerHTML = "<i class='fas fa-times'></i>";
    }
}

function toggleItem() {
    if (this.classList.contains("navbar__item--dropdown-active")) {
        this.classList.remove("navbar__item--dropdown-active");
    } else if (menu.querySelector(".navbar__item--dropdown-active")) {
        menu.querySelector(".navbar__item--dropdown-active").classList.remove("navbar__item--dropdown-active");
        this.classList.add("navbar__item--dropdown-active");
    } else {
        this.classList.add("navbar__item--dropdown-active");
    }
}

function closeSubmenu(e) {
    let isClickInside = menu.contains(e.target);

    if (!isClickInside && menu.querySelector(".navbar__item--dropdown-active")) {
        menu.querySelector(".navbar__item--dropdown-active").classList.remove("navbar__item--dropdown-active");
    }
}

toggle.addEventListener("click", toggleMenu, false);
for (let navbar__item of items) {
    if (navbar__item.querySelector(".navbar__dropdown")) {
        navbar__item.addEventListener("click", toggleItem, false);
    }
    navbar__item.addEventListener("keypress", toggleItem, false);
}
document.addEventListener("click", closeSubmenu, false);
// The navbar code ends here