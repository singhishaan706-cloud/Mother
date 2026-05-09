const emojis = ["🌸","💐","🌷","🌺","🌼","🍀","🦋","⭐","🌟","✨"];
const memEmojis = ["📸","🌟","🎂","💕","🥹"];

async function generate() {
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

  document.getElementById('formPage').classList.add('hidden');
  document.getElementById('loadingPage').classList.remove('hidden');

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "anthropic-dangerous-direct-browser-calls": "true"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [{
          role: "user",
          content: `Write a short heartfelt Mother's Day letter in Hinglish (Roman script Hindi mixed with English). 3-4 lines only. Start with "${momName}," — warm, genuine, NOT dramatic. Only write the letter body, nothing else.\n\nChild's name: ${yourName}\nLoves about mom: ${loves}\nMemories: ${memories}`
        }]
      })
    });

    const data = await res.json();
    const letter = data.content?.map(i => i.text || "").join("").trim();
    if (!letter) throw new Error("empty");

    const loveItems = loves.split(/[,\n]/).map(s => s.trim()).filter(Boolean).slice(0, 4);
    const memItems = memories.split(/[,\n]/).map(s => s.trim()).filter(Boolean).slice(0, 3);

    document.getElementById('rName').textContent = `Hey, ${momName}! 🌸`;
    document.getElementById('rTag').textContent = `${yourName} ne yeh sirf aapke liye banaya hai 💕`;

    document.getElementById('lovesList').innerHTML = loveItems.map((l, i) => `
      <div class="memory-item">
        <div class="mdot">${emojis[i % emojis.length]}</div>
        <div class="mtext">${l}</div>
      </div>`).join('');

    if (memItems.length) {
      document.getElementById('memsList').innerHTML = memItems.map((m, i) => `
        <div class="memory-item">
          <div class="mdot">${memEmojis[i] || '💕'}</div>
          <div class="mtext">${m}</div>
        </div>`).join('');
    } else {
      document.getElementById('memCard').classList.add('hidden');
    }

    document.getElementById('letterText').innerHTML = letter.replace(/\n/g, '<br>');
    document.getElementById('letterSig').textContent = `— ${yourName} 💕`;
    document.getElementById('rFooter').textContent = `Made with 💖 by ${yourName}, sirf ${momName} ke liye`;

    document.getElementById('loadingPage').classList.add('hidden');
    document.getElementById('resultPage').classList.remove('hidden');

  } catch (e) {
    document.getElementById('loadingPage').classList.add('hidden');
    document.getElementById('formPage').classList.remove('hidden');
    const err = document.getElementById('errMsg');
    err.textContent = 'Kuch gadbad ho gayi, dobara try karo! 😅';
    err.classList.remove('hidden');
  }
}

function restart() {
  document.getElementById('resultPage').classList.add('hidden');
  document.getElementById('memCard').classList.remove('hidden');
  document.getElementById('formPage').classList.remove('hidden');
  ['momName', 'yourName', 'loves', 'memories'].forEach(id => {
    document.getElementById(id).value = '';
  });
}
