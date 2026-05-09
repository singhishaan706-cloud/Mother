document.addEventListener('DOMContentLoaded', function () {

  const messages = {
    hindi: [
      (d) => `प्रिय ${d.momName} माँ,\n\nआज Mother's Day पर मैं, ${d.yourName}, आपको दिल से प्यार और ढेर सारी दुआएं देना चाहता/चाहती हूँ। 💐\n\n"${d.memory}" — यह पल मेरे दिल में हमेशा के लिए बसा हुआ है।\n\nआपकी ${d.quality} ने मुझे जीवन में आगे बढ़ने की ताकत दी है। आप सिर्फ माँ नहीं, मेरी सबसे बड़ी ताकत हैं।\n\nभगवान से दुआ है कि आप हमेशा ${d.wish}। आपका प्यार मेरी सबसे बड़ी दौलत है।\n\nआपका बच्चा,\n${d.yourName} ❤️`,

      (d) => `माँ,\n\nशब्दों में आपका कर्ज़ चुकाना मुश्किल है, लेकिन आज Mother's Day पर मैं, ${d.yourName}, बस यही कहना चाहता/चाहती हूँ — आप मेरी दुनिया हैं। 🌸\n\n"${d.memory}" — इस याद को सोचकर आज भी आँखें नम हो जाती हैं।\n\nआपकी ${d.quality} ने मुझे सिखाया कि ज़िंदगी कैसे जीते हैं।\n\nदुआ है ${d.momName} माँ, कि भगवान आपको हमेशा ${d.wish}। आप हमेशा मुस्कुराती रहें।\n\nसदा आपका,\n${d.yourName} 💕`,
    ],

    english: [
      (d) => `Dear ${d.momName},\n\nOn this beautiful Mother's Day, I — ${d.yourName} — want you to know how deeply you are loved. 🌷\n\nI still cherish the memory of "${d.memory}". It's one of those moments that lives in my heart forever.\n\nYour ${d.quality} has shaped who I am today. You are not just my mother — you are my hero, my safe place, my everything.\n\nMy wish for you, today and always, is that you ${d.wish}. You deserve every happiness in the world.\n\nWith all my love,\n${d.yourName} 💐`,

      (d) => `To the most wonderful woman in my world — ${d.momName},\n\nHappy Mother's Day! I am ${d.yourName}, and I am so proud to call you my Mom. 🌸\n\n"${d.memory}" — this memory reminds me how lucky I am to have you.\n\nYour ${d.quality} is something I admire more every single day. You gave me roots and wings both.\n\nI pray that you always ${d.wish}. Thank you for being the light in my life, Mom.\n\nForever yours,\n${d.yourName} ❤️`,
    ],

    hinglish: [
      (d) => `Pyaari ${d.momName} Maa,\n\nAaj Mother's Day hai aur main — ${d.yourName} — bas itna kehna chahta/chahti hoon: Aap mere liye poori duniya ho! 💐\n\n"${d.memory}" — yeh moment yaad karke aaj bhi dil khush ho jaata hai.\n\nAapki ${d.quality} ne mujhe life mein kitna kuch sikhaaya hai. Maa, aap without you sab kuch adhoora lagta hai.\n\nMeri dua hai ki aap hamesha ${d.wish}. Bas aap khush raho, hamare liye yahi sabse bada tohfa hai.\n\nLove you to the moon and back,\n${d.yourName} 🌸❤️`,

      (d) => `${d.momName} Maa, the best Maa in the entire universe! 🌺\n\nHappy Mother's Day! Yeh din sirf aapke liye hai. Main, ${d.yourName}, aaj sabke saamne bol raha/rahi hoon — Aap meri superhero ho!\n\n"${d.memory}" — yeh yaad zindagi bhar mere saath rahegi.\n\nAapki ${d.quality} ne mujhe strong banaya. Har mushkil mein aapka saath hi meri strength rahi hai.\n\nBas ek hi wish hai — aap hamesha ${d.wish}. You deserve all the love, chai, and rest in the world! ☕\n\nAapka baccha hamesha,\n${d.yourName} 💕`,
    ],
  };

  window.generateMessage = function () {
    const yourName = document.getElementById('yourName').value.trim();
    const momName  = document.getElementById('momName').value.trim();
    const memory   = document.getElementById('memory').value.trim();
    const quality  = document.getElementById('quality').value.trim();
    const wish     = document.getElementById('wish').value.trim();
    const language = document.getElementById('language').value;

    if (!yourName || !momName || !memory || !quality || !wish) {
      alert('Kripya sabhi fields fill karein! 🌸');
      return;
    }

    const data = { yourName, momName, memory, quality, wish };
    const pool = messages[language];
    const template = pool[Math.floor(Math.random() * pool.length)];
    const msg = template(data);

    document.getElementById('messageBox').textContent = msg;
    document.getElementById('copyAlert').style.display = 'none';

    const card = document.getElementById('resultCard');
    card.classList.add('visible');
    card.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  window.generateAgain = function () {
    const yourName = document.getElementById('yourName').value.trim();
    const momName  = document.getElementById('momName').value.trim();
    const memory   = document.getElementById('memory').value.trim();
    const quality  = document.getElementById('quality').value.trim();
    const wish     = document.getElementById('wish').value.trim();
    const language = document.getElementById('language').value;

    if (!yourName || !momName || !memory || !quality || !wish) {
      alert('Pehle sabhi fields fill karein! 🌸');
      return;
    }

    const data = { yourName, momName, memory, quality, wish };
    const pool = messages[language];
    const current = document.getElementById('messageBox').textContent;
    let template, newMsg, attempts = 0;

    do {
      template = pool[Math.floor(Math.random() * pool.length)];
      newMsg = template(data);
      attempts++;
    } while (newMsg === current && attempts < 5);

    document.getElementById('messageBox').textContent = newMsg;
    document.getElementById('copyAlert').style.display = 'none';
  };

  window.copyMessage = function () {
    const text = document.getElementById('messageBox').textContent;
    if (!text) return;

    navigator.clipboard.writeText(text).then(() => {
      const alertEl = document.getElementById('copyAlert');
      alertEl.style.display = 'block';
      setTimeout(() => { alertEl.style.display = 'none'; }, 2500);
    }).catch(() => {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      const alertEl = document.getElementById('copyAlert');
      alertEl.style.display = 'block';
      setTimeout(() => { alertEl.style.display = 'none'; }, 2500);
    });
  };

});
