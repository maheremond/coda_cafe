// ici je gere le menu burger
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// quand on clique sur un lien je ferme le menu
const navLinks = document.querySelectorAll('.nav a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

let lastScrollY = window.scrollY;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY) {
        // si on descend la page je cache le header
        header.classList.add('hide');
    } else {
        // si on remonte je remets le header
        header.classList.remove('hide');
    }

    lastScrollY = window.scrollY;
});



// je m occupe des petits boutons i pour montrer le texte
document.addEventListener('DOMContentLoaded', function() {
    const infoButtons = document.querySelectorAll('.product-info-btn');

    infoButtons.forEach(button => {
        // je cree une petite bulle de texte avec la description
        const tooltip = document.createElement('div');
        tooltip.className = 'product-tooltip';
        tooltip.textContent = button.getAttribute('title');
        tooltip.style.cssText = `
            position: absolute;
            background-color: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 12px 16px;
            border-radius: 8px;
            font-size: 14px;
            max-width: 250px;
            z-index: 1000;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
            bottom: 50px;
            right: 0;
            line-height: 1.4;
        `;

        button.parentElement.style.position = 'relative';
        button.parentElement.appendChild(tooltip);

        // sur ordi quand on passe la souris je montre le texte
        button.addEventListener('mouseenter', function() {
            tooltip.style.opacity = '1';
        });

        button.addEventListener('mouseleave', function() {
            tooltip.style.opacity = '0';
        });

        // sur tel il faut cliquer pour voir le texte
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const isVisible = tooltip.style.opacity === '1';

            // je cache les autres bulles avant
            document.querySelectorAll('.product-tooltip').forEach(t => {
                t.style.opacity = '0';
            });

            // si elle est deja visible je la cache sinon je la montre
            tooltip.style.opacity = isVisible ? '0' : '1';
        });
    });

    // si on clique autre part je ferme tout
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.product-info-btn')) {
            document.querySelectorAll('.product-tooltip').forEach(tooltip => {
                tooltip.style.opacity = '0';
            });
        }
    });
});

// ici je fais le scroll doux pour les liens avec #
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


// ici je gere le petit menu decouvrir
document.addEventListener('DOMContentLoaded', function() {
    const menuLinks = document.querySelectorAll('.decouvrir-menu a');
    const underline = document.querySelector('.menu-underline');

    if (menuLinks.length > 0 && underline) {
        // au debut je mets le trait sous le lien actif
        const activeLink = document.querySelector('.decouvrir-menu a.active');
        if (activeLink) {
            underline.style.left = activeLink.parentElement.offsetLeft + 'px';
            underline.style.width = activeLink.offsetWidth + 'px';
        }

        // quand on passe la souris le trait bouge
        menuLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                underline.style.left = this.parentElement.offsetLeft + 'px';
                underline.style.width = this.offsetWidth + 'px';
            });
        });

        // quand on sort du menu je remets le trait au bon endroit
        const menuContainer = document.querySelector('.decouvrir-menu');
        if (menuContainer) {
            menuContainer.addEventListener('mouseleave', function() {
                const activeLink = document.querySelector('.decouvrir-menu a.active');
                if (activeLink) {
                    underline.style.left = activeLink.parentElement.offsetLeft + 'px';
                    underline.style.width = activeLink.offsetWidth + 'px';
                }
            });
        }

        // quand on clique je change le lien actif
        menuLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                menuLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                underline.style.left = this.parentElement.offsetLeft + 'px';
                underline.style.width = this.offsetWidth + 'px';
            });
        });
    }
});

