const Factonaut = (() => {
  const SOUND_KEY = 'factonautSound';
  const VISITED_KEY = 'factonautVisited';
  let audioContext;

  function soundEnabled() { return localStorage.getItem(SOUND_KEY) !== 'off'; }
  function setSound(enabled) { localStorage.setItem(SOUND_KEY, enabled ? 'on' : 'off'); updateSoundButtons(); }
  function updateSoundButtons() {
    document.querySelectorAll('[data-sound-toggle]').forEach(btn => {
      btn.textContent = soundEnabled() ? '🔊 Sound On' : '🔇 Sound Off';
      btn.setAttribute('aria-pressed', String(soundEnabled()));
    });
  }
  function beep(frequency = 520, duration = .08, type = 'sine') {
    if (!soundEnabled()) return;
    try {
      audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.type = type;
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(.05, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(.001, audioContext.currentTime + duration);
      oscillator.connect(gain).connect(audioContext.destination);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + duration);
    } catch (_) {}
  }
  function launchSound() { beep(260,.08,'square'); setTimeout(()=>beep(390,.1,'square'),120); setTimeout(()=>beep(620,.14,'sine'),260); }
  function successSound() { beep(500,.08); setTimeout(()=>beep(760,.12),100); }
  function errorSound() { beep(180,.16,'sawtooth'); }

  function typeText(element, text, speed = 18) {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    element.textContent = '';
    element.classList.add('cursor');
    if (reduced) { element.textContent = text; element.classList.remove('cursor'); return Promise.resolve(); }
    return new Promise(resolve => {
      let i = 0;
      const tick = () => {
        element.textContent += text[i] || '';
        i += 1;
        if (i <= text.length) setTimeout(tick, speed);
        else { element.classList.remove('cursor'); resolve(); }
      };
      tick();
    });
  }

  function getVisited() {
    try { return JSON.parse(localStorage.getItem(VISITED_KEY)) || []; }
    catch (_) { return []; }
  }
  function markVisited(slug) {
    const visited = new Set(getVisited());
    visited.add(slug);
    localStorage.setItem(VISITED_KEY, JSON.stringify([...visited]));
    return [...visited];
  }
  function renderPassport() {
    const visited = new Set(getVisited());
    document.querySelectorAll('[data-passport-stamp]').forEach(stamp => {
      const done = visited.has(stamp.dataset.passportStamp);
      stamp.classList.toggle('visited', done);
      stamp.innerHTML = done ? `<span>✅<strong>${stamp.dataset.name}</strong>Visited</span>` : `<span>⬜<strong>${stamp.dataset.name}</strong>Undiscovered</span>`;
    });
    document.querySelectorAll('[data-planet-card]').forEach(card => {
      const badge = card.querySelector('.visited-badge');
      if (badge) badge.classList.toggle('hidden', !visited.has(card.dataset.planetCard));
    });
    const count = visited.size;
    document.querySelectorAll('[data-passport-count]').forEach(el => el.textContent = `${count} / ${window.PLANETS.length} planets discovered`);
    document.querySelectorAll('[data-passport-progress]').forEach(el => el.style.width = `${(count / window.PLANETS.length) * 100}%`);
    document.querySelectorAll('[data-achievement]').forEach(el => {
      el.classList.toggle('hidden', count !== window.PLANETS.length);
      el.textContent = '🏆 Achievement unlocked: Solar System Explorer!';
    });
  }

  function toast(message) {
    let el = document.querySelector('.easter-toast');
    if (!el) { el = document.createElement('div'); el.className = 'easter-toast'; document.body.appendChild(el); }
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(el._timer);
    el._timer = setTimeout(() => el.classList.remove('show'), 3500);
  }
  function alien() {
    const el = document.createElement('div');
    el.className = 'alien';
    el.textContent = '👽';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 4200);
    toast('Secret alien mode unlocked. It mostly does this.');
    successSound();
  }
  function installBrandEasterEgg() {
    let clicks = 0;
    document.querySelectorAll('.brand').forEach(brand => brand.addEventListener('click', event => {
      clicks += 1;
      if (clicks === 5) { event.preventDefault(); alien(); clicks = 0; }
    }));
  }
  function initSound() {
    document.querySelectorAll('[data-sound-toggle]').forEach(btn => btn.addEventListener('click', () => {
      setSound(!soundEnabled());
      if (soundEnabled()) successSound();
    }));
    updateSoundButtons();
  }
  function init() { initSound(); renderPassport(); installBrandEasterEgg(); }
  return { init, beep, launchSound, successSound, errorSound, typeText, getVisited, markVisited, renderPassport, toast };
})();
document.addEventListener('DOMContentLoaded', Factonaut.init);
