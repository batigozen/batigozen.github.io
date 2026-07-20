// Scroll reveals and intro entrance, powered by Motion (vendor/motion.js).
// Progressive enhancement: without JS (or with reduced motion) everything
// is simply visible — initial hidden states are only ever set from here.
(function () {
    var M = window.Motion;
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!M || reduce) return;

    var animate = M.animate;
    var inView = M.inView;
    var stagger = M.stagger;

    // Intro: staggered rise on load
    var introEls = document.querySelectorAll('.intro > *');
    introEls.forEach(function (el) { el.style.opacity = '0'; });
    animate(introEls, { opacity: [0, 1], y: [14, 0] }, {
        duration: 0.55,
        delay: stagger(0.09),
        ease: 'easeOut'
    });

    // Sections: reveal once as they enter the viewport
    var revealEls = document.querySelectorAll('[data-reveal]');
    revealEls.forEach(function (el) { el.style.opacity = '0'; });

    inView('[data-reveal]', function (target) {
        // Motion passed the entry object in older versions, the element in newer ones
        var el = target instanceof Element ? target : target.target;
        animate(el, { opacity: [0, 1], y: [18, 0] }, {
            duration: 0.6,
            ease: 'easeOut'
        });
    }, { margin: '0px 0px -12% 0px' });
})();
