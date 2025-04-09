let index = 0;
const interval = 1000;

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const animate = (star) => {
  // Changer les positions des étoiles de manière aléatoire
  star.style.setProperty("--star-left", `${rand(-10, 100)}%`);
  star.style.setProperty("--star-top", `${rand(-40, 80)}%`);
}

for (const star of document.getElementsByClassName("magic-star")) {
  // Stagger le démarrage des animations des étoiles
  setTimeout(() => {
    animate(star);  // Animer l'étoile dès le début
    setInterval(() => animate(star), interval);  // Répéter l'animation en continu toutes les 1 seconde
  }, index++ * (interval / 3));  // Décaler les démarrages
}
