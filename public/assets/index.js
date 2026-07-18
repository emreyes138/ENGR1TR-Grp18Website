document.addEventListener('DOMContentLoaded', () => {
  const launchButton = document.getElementById('launch-button');
  const rocket = document.getElementById('rocket');
  const planetName = document.getElementById('random-planet-name');
  const factText = document.getElementById('random-fact');
  const link = document.getElementById('random-link');
  const transmission = document.getElementById('transmission');
  let previous = '';

  launchButton.addEventListener('click', () => {
    let planet, fact, key;
    do {
      planet = window.PLANETS[Math.floor(Math.random() * window.PLANETS.length)];
      fact = planet.facts[Math.floor(Math.random() * planet.facts.length)];
      key = planet.slug + fact;
    } while (key === previous);
    previous = key;
    Factonaut.launchSound();
    launchButton.disabled = true;
    launchButton.textContent = '🚀 Launching...';
    rocket.classList.remove('launch');
    void rocket.offsetWidth;
    rocket.classList.add('launch');
    link.classList.add('hidden');
    planetName.textContent = 'Scanning the solar system...';
    factText.textContent = '3... 2... 1...';
    setTimeout(async () => {
      planetName.textContent = `Destination: ${planet.name}`;
      await Factonaut.typeText(factText, fact, 17);
      link.href = `${planet.slug}.html`;
      link.textContent = `Open ${planet.name} Field Note →`;
      link.classList.remove('hidden');
      launchButton.disabled = false;
      launchButton.textContent = '🚀 Launch Again';
      rocket.classList.remove('launch');
      Factonaut.successSound();
      transmission.scrollIntoView({behavior:'smooth', block:'center'});
    }, 1250);
  });

  const quiz = window.PLANETS[Math.floor(Math.random() * window.PLANETS.length)].quiz;
  const qText = document.getElementById('home-quiz-question');
  const qOptions = document.getElementById('home-quiz-options');
  const feedback = document.getElementById('home-quiz-feedback');
  qText.textContent = quiz.question;
  quiz.choices.forEach(choice => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.textContent = choice;
    btn.addEventListener('click', () => {
      qOptions.querySelectorAll('button').forEach(b => b.disabled = true);
      if (choice === quiz.answer) {
        btn.classList.add('correct'); feedback.textContent = 'Correct! Your astronaut license is looking promising.'; Factonaut.successSound();
      } else {
        btn.classList.add('wrong'); feedback.textContent = `Not quite. The answer is ${quiz.answer}.`; Factonaut.errorSound();
        [...qOptions.children].find(b => b.textContent === quiz.answer)?.classList.add('correct');
      }
    });
    qOptions.appendChild(btn);
  });
});
