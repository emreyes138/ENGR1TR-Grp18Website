document.addEventListener('DOMContentLoaded', () => {
  const slug = document.body.dataset.planet;
  const planet = window.PLANETS.find(p => p.slug === slug);
  Factonaut.markVisited(slug);
  Factonaut.renderPassport();

  const button = document.getElementById('planet-random-button');
  const output = document.getElementById('planet-random-output');
  let previous = -1;
  button.addEventListener('click', async () => {
    let index;
    do { index = Math.floor(Math.random() * planet.facts.length); }
    while (planet.facts.length > 1 && index === previous);
    previous = index;
    Factonaut.beep(390,.08,'square');
    button.disabled = true;
    await Factonaut.typeText(output, planet.facts[index], 18);
    button.disabled = false;
    Factonaut.successSound();
  });

  const visual = document.getElementById('planet-visual');
  let imageClicks = 0;
  visual.addEventListener('click', () => {
    imageClicks += 1;
    visual.classList.remove('wobble'); void visual.offsetWidth; visual.classList.add('wobble');
    Factonaut.beep(260 + imageClicks * 30, .05);
    if (imageClicks === 5) { Factonaut.toast(planet.easter); imageClicks = 0; Factonaut.successSound(); }
  });

  const quiz = planet.quiz;
  const options = document.getElementById('planet-quiz-options');
  const feedback = document.getElementById('planet-quiz-feedback');
  quiz.choices.forEach(choice => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option'; btn.textContent = choice;
    btn.addEventListener('click', () => {
      options.querySelectorAll('button').forEach(b => b.disabled = true);
      if (choice === quiz.answer) { btn.classList.add('correct'); feedback.textContent = 'Correct! Mission passed.'; Factonaut.successSound(); }
      else { btn.classList.add('wrong'); feedback.textContent = `Not quite. The answer is ${quiz.answer}.`; Factonaut.errorSound(); [...options.children].find(b => b.textContent === quiz.answer)?.classList.add('correct'); }
    });
    options.appendChild(btn);
  });
});
