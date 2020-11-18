// The navbar code begins here
const toggle = document.querySelector(".navbar__hamburger");
const menu = document.querySelector(".navbar__links");
const items = document.querySelectorAll(".navbar__link");

function toggleMenu() {
    if (menu.classList.contains("active")) {
        menu.classList.remove("active");
        toggle.querySelector("a").innerHTML = "<i class='fas fa-bars'></i>";
    } else {
        menu.classList.add("active");
        toggle.querySelector("a").innerHTML = "<i class='fas fa-times'></i>";
    }
}

function toggleItem() {
    if (this.classList.contains("navbar__sub-nav-active")) {
        this.classList.remove("navbar__sub-nav-active");
    } else if (menu.querySelector(".navbar__sub-nav-active")) {
        menu.querySelector(".navbar__sub-nav-active").classList.remove("navbar__sub-nav-active");
        this.classList.add("navbar__sub-nav-active");
    } else {
        this.classList.add("navbar__sub-nav-active");
    }
}

function closeSubmenu(e) {
    let isClickInside = menu.contains(e.target);

    if (!isClickInside && menu.querySelector(".navbar__sub-nav-active")) {
        menu.querySelector(".navbar__sub-nav-active").classList.remove("navbar__sub-nav-active");
    }
}

toggle.addEventListener("click", toggleMenu, false);
for (let navbar__link of items) {
    if (navbar__link.querySelector(".navbar__sub-nav")) {
        navbar__link.addEventListener("click", toggleItem, false);
    }
    navbar__link.addEventListener("keypress", toggleItem, false);
}
document.addEventListener("click", closeSubmenu, false);
// The navbar code ends here