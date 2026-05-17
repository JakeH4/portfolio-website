/* ===== SCROLL PROGRESS BAR ===== */

function initScrollProgress()
{
    var progressBar = document.getElementById('scrollProgress');

    window.addEventListener('scroll', function()
    {
        var scrollTop = window.scrollY;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

/* ===== PAGE TRANSITIONS ===== */

function initPageTransitions()
{
    var pageContent = document.querySelector('.page-content');
    if (!pageContent) return;

    document.addEventListener('click', function(e)
    {
        var link = e.target.closest('a');
        if (!link) return;

        var href = link.getAttribute('href');
        if (!href) return;

        // Only intercept internal .html links (not anchors, not external)
        if (href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto'))
        {
            return;
        }

        // Skip download links
        if (link.hasAttribute('download'))
        {
            return;
        }

        e.preventDefault();
        pageContent.classList.add('fade-out');

        setTimeout(function()
        {
            window.location.href = href;
        }, 300);
    });
}

/* ===== SCROLL ANIMATIONS ===== */

function initScrollAnimations()
{
    const animateElements = document.querySelectorAll('.animate');

    const observer = new IntersectionObserver(
        function(entries)
        {
            entries.forEach(function(entry)
            {
                if (entry.isIntersecting)
                {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        }
    );

    animateElements.forEach(function(el)
    {
        observer.observe(el);
    });
}

/* ===== ACTIVE NAV LINK ===== */

function initActiveNav()
{
    const sections = document.querySelectorAll('.section, .hero');
    const navLinks = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver(
        function(entries)
        {
            entries.forEach(function(entry)
            {
                if (entry.isIntersecting)
                {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(function(link)
                    {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + id)
                        {
                            link.classList.add('active');
                        }
                    });
                }
            });
        },
        {
            threshold: 0.3,
            rootMargin: '-80px 0px -50% 0px'
        }
    );

    sections.forEach(function(section)
    {
        observer.observe(section);
    });
}

/* ===== BACK TO TOP ===== */

function initBackToTop()
{
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', function()
    {
        if (window.scrollY > 500)
        {
            backToTopBtn.classList.add('visible');
        }
        else
        {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', function()
    {
        window.scrollTo(
        {
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ===== MOBILE NAV TOGGLE ===== */

function initMobileNav()
{
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    toggle.addEventListener('click', function()
    {
        navLinks.classList.toggle('open');
        toggle.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(function(link)
    {
        link.addEventListener('click', function()
        {
            navLinks.classList.remove('open');
            toggle.classList.remove('active');
        });
    });
}

/* ===== NAVBAR SCROLL EFFECT ===== */

function initNavbarScroll()
{
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', function()
    {
        if (window.scrollY > 50)
        {
            navbar.style.borderBottomColor = 'var(--border-subtle)';
            navbar.style.background = 'rgba(1, 22, 30, 0.92)';
        }
        else
        {
            navbar.style.borderBottomColor = 'transparent';
            navbar.style.background = 'rgba(1, 22, 30, 0.65)';
        }
    });
}

/* ===== INIT ===== */

document.addEventListener('DOMContentLoaded', function()
{
    initScrollAnimations();
    initActiveNav();
    initBackToTop();
    initMobileNav();
    initNavbarScroll();
    initScrollProgress();
    initPageTransitions();
});
