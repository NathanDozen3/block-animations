const BLOCK_ANIMATIONS_ANIMATED_CLASS = 'ba';

const CONFIG = {
    root: null,
    rootMargin: '0px',
    threshold: [.5]
};

let observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        const isIntersecting = entry.isIntersecting
        const element = entry.target;

        if (isIntersecting === true){
            element.classList.add(BLOCK_ANIMATIONS_ANIMATED_CLASS);
        } else {
            element.classList.remove(BLOCK_ANIMATIONS_ANIMATED_CLASS);
        }
    })
}, CONFIG);

window.onload = function(){
    document.querySelectorAll('[data-ba]').forEach(el => observer.observe(el));
}
