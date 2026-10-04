document.querySelectorAll(".badge").forEach(
    b => b.onclick = () => {
        document.querySelectorAll(".badge").forEach(
            x => {
                const on = x == b; x.setAttribute("aria-pressed", on);
                document.getElementById(x.dataset.t).hidden = !on
            })
    });

const pinScenes = document.querySelectorAll(".story .scene[data-pin]");
if (pinScenes.length) {
    const header = document.querySelector("header");
    const setBar = () => {
        if (header) document.documentElement.style.setProperty("--bar", header.offsetHeight + "px");
    };
    const update = () => {
        setBar();
        const vh = window.innerHeight;
        pinScenes.forEach(scene => {
            const scrollable = scene.offsetHeight - vh;
            const p = scrollable <= 0 ? 1 : Math.min(1, Math.max(0, -scene.getBoundingClientRect().top / scrollable));
            scene.style.setProperty("--p", p.toFixed(4));
        });
    };
    let ticking = false;
    const onScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            update();
            ticking = false;
        });
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
}
