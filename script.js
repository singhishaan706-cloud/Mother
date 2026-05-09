const emojis = ["🌸","💐","🌷","🌺","🌼","🍀","🦋","⭐","🌟","✨"];
const memEmojis = ["📸","🌟","🎂","💕","🥹"];

function generateLetter(momName, yourName, loves, memories) {
  const loveList = loves.split(/[,\n]/).map(s=>s.trim()).filter(Boolean);
  const memList = memories.split(/[,\n]/).map(s=>s.trim()).filter(Boolean);

  const openers = [
    `${momName}, kuch cheezein hoti hain jo words mein express nahi hoti — aur aapka pyaar unhi mein se ek hai.`,
    `${momName}, aaj ka din sirf ek reminder hai, kyunki actually har din aapka din hai mere liye.`,
    `${momName}, itne saare log hain is duniya mein — but aap jaisi koi nahi hai, seriously.`,
    `${momName}, kabhi kabhi sochta hoon ki main itna lucky kyun hoon — aur answer hamesha aap hoti hain.`
  ];

  const loveLines = loveList.length > 0
    ? `Aapki ${loveList[0]}${loveList[1] ? `, aapki ${loveList[1]}` : ''} — yeh cheezein mujhe hamesha feel karaati hain ki sab theek hai.`
    : `Aap jo karte ho mere liye, woh sab kuch mere dil mein hamesha rehta hai.`;

  const memLine = memList.length > 0
    ? `"${memList[0]}" — yeh moment kabhi nahi bhulunga.`
    : `Hamare saath bitaaye har ek pal ko dil mein sambhal ke rakha hai maine.`;

  const closers = [
    `Thank you for being my safe place. Love you, ${momName}. Happy Mother's Day! 🌸`,
    `Aap hain toh sab kuch hai. Happy Mother's Day, ${momName}! 💖`,
    `Duniya ki sabse achi ${momName} ko — Happy Mother's Day! 🌷`,
    `Bas yahi kehna tha — aap the best hain. Happy Mother's Day! ✨`
  ];

  const opener = openers[Math.floor(Math.random() * openers.length)];
  const closer = closers[Math.floor(Math.random() * closers.length)];

  return `${opener}<br><br>${loveLines}<br><br>${memLine}<br><br>${closer}`;
}

function generate() {
  const momName = document.getElementById('momName').value.trim();
  const yourName = document.getElementById('yourName').value.trim();
  const loves = document.getElementById('loves').value.trim();
  const memories = document.getElementById('memories').value.trim();
  const err = document.getElementById('errMsg');

  if (!momName || !yourName || !loves) {
    err.textContent = 'Pehle saari fields bharo! 😄';
    err.classList.remove('hidden');
    return;
  }
  err.classList.add('hidden');

  const loveItems = loves.split(/[,\n]/).map(s=>s.trim()).filter(Boolean).slice(0,4);
  const memItems = memories.split(/[,\n]/).map(s=>s.trim()).filter(Boolean).slice(0,3);
  const letter = generateLetter(momName, yourName, loves, memories);

  document.getElementById('rName').textContent = `Hey, ${momName}! 🌸`;
  document.getElementById('rTag').textContent = `${yourName} ne yeh sirf aapke liye banaya hai 💕`;

  document.getElementById('lovesList').innerHTML = loveItems.map((l,i) => `
    <div class="memory-item">
      <div class="mdot">${emojis[i % emojis.length]}</div>
      <div class="mtext">${l}</div>
    </div>`).join('');

  if (memItems.length) {
    document.getElementById('memsList').innerHTML = memItems.map((m,i) => `
      <div class="memory-item">
        <div class="mdot">${memEmojis[i] || '💕'}</div>
        <div class="mtext">${m}</div>
      </div>`).join('');
  } else {
    document.getElementById('memCard').classList.add('hidden');
  }

  document.getElementById('letterText').innerHTML = letter;
  document.getElementById('letterSig').textContent = `— ${yourName} 💕`;
  document.getElementById('rFooter').textContent = `Made with 💖 by ${yourName}, sirf ${momName} ke liye`;

  document.getElementById('formPage').classList.add('hidden');
  document.getElementById('resultPage').classList.remove('hidden');
}

function restart() {
  document.getElementById('resultPage').classList.add('hidden');
  document.getElementById('memCard').classList.remove('hidden');
  document.getElementById('formPage').classList.remove('hidden');
  ['momName','yourName','loves','memories'].forEach(id => {
    document.getElementById(id).value = '';
  });
}
