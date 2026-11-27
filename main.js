



/* copy and paste button*/
const copyButtons = document.querySelectorAll(".copy-btn");

copyButtons.forEach((btn) => {
  const originalText = btn.textContent;
  let resetTimer;

  btn.addEventListener("click", async () => {
    const textToCopy = btn.dataset.copy; 

    try {
      await navigator.clipboard.writeText(textToCopy);

      btn.textContent = "[COPIED_TO_CLIPBOARD]";
      btn.classList.add("copied");

      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        btn.textContent = originalText;
        btn.classList.remove("copied");
      }, 1500); 
    } catch (err) {
      btn.textContent = "[COPY_FAILED]";
    }
  });
});

// Image wheels
const wheels = document.querySelectorAll(".WHEEL");

wheels.forEach((wheel) => {
  const slides = wheel.querySelectorAll("img, video");
  if (slides.length === 0) return;

  let index = 0;
  let isPaused = false;
  slides[0].classList.add("active");

  if (slides.length === 1) return;

  wheel.addEventListener("mouseenter", () => { isPaused = true; });
  wheel.addEventListener("mouseleave", () => { isPaused = false; });

  setInterval(() => {
    if (isPaused) return;
    slides[index].classList.remove("active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
  }, 3500); 
});


/* FISH */
const fishLayer = document.querySelector(".fish_layer");
const fishSprites = [
  "PORTFOLIO_IMAGES/goldfish_inverted.png"
];

function spawnFish(){
  if (!fishLayer || document.hidden) return;
  if (fishLayer.children.length >= 6) return; 

  const fish = document.createElement("img");
  fish.className = "bg_fish";
  fish.src = fishSprites[Math.floor(Math.random() * fishSprites.length)];
  
  const width = fishLayer.clientWidth;
  const height = fishLayer.clientHeight;
  if (width === 0 || height === 0) return;
  
  const size = 28 + Math.random () * 36;
  fish.style.width = size + "px";

  const goingRight = Math.random() > 0.5;
  const flipX = goingRight ? 1 : -1; 

  const startX = goingRight ? -size - 20 : width + 20;
  const endX = goingRight ? width + 20 : -size - 20;
  const startY = Math.random() * (height - size);
  const endY = Math.random() * (height - size);
  const duration = 6000 + Math.random() * 7000;

  fishLayer.appendChild(fish);

  const anim = fish.animate(
    [
      { transform: `translate(${startX}px, ${startY}px) scaleX(${flipX})`},
      {transform: `translate(${endX}px, ${endY}px) scaleX(${flipX})`}
    ],
    {duration: duration, easing: "linear"}
  );

  anim.onfinish = () => fish.remove();
}
spawnFish();
setInterval(spawnFish, 2000);




