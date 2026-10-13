/**
 * THIỆP MỜI LỄ TỐT NGHIỆP - VĨNH BẢO (VIN)
 * Logic tương tác, cá nhân hóa tên khách mời, âm thanh & bộ tạo link hàng loạt
 */

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------------------
  // 1. Phân tích tham số URL để cá nhân hóa tên người nhận
  // -------------------------------------------------------------------------
  const urlParams = new URLSearchParams(window.location.search);
  const rawRecipient = urlParams.get('to') || urlParams.get('name') || urlParams.get('ban') || urlParams.get('guest');
  
  let recipientName = 'Bạn thân mến';
  let shortRecipient = 'Bạn';

  if (rawRecipient && rawRecipient.trim()) {
    recipientName = decodeURIComponent(rawRecipient.trim());
    shortRecipient = recipientName;
    document.title = `Thiệp Mời Lễ Tốt Nghiệp - Kính gửi ${recipientName}`;
  }

  // Cập nhật tên lên các vị trí trong giao diện
  const tagRecipientEl = document.getElementById('tagRecipientName');
  const letterRecipientEl = document.getElementById('letterRecipientName');
  const guestNameTexts = document.querySelectorAll('.guest-name-text');

  if (tagRecipientEl) tagRecipientEl.textContent = recipientName;
  if (letterRecipientEl) letterRecipientEl.textContent = shortRecipient;
  guestNameTexts.forEach(el => el.textContent = shortRecipient);

  // -------------------------------------------------------------------------
  // 2. State Machine Quản Lý 4 Bước Điện Ảnh (Cinematic Choreography)
  // -------------------------------------------------------------------------
  let currentStep = 1;
  let isBusy = false;

  const frameStep1 = document.getElementById('frameStep1');
  const frameStep2 = document.getElementById('frameStep2');
  const frameStep3 = document.getElementById('frameStep3');
  const frameStep4 = document.getElementById('frameStep4');
  const guidanceText = document.getElementById('guidanceText');
  const invitationStage = document.getElementById('invitationStage');

  const benchHotspot = document.getElementById('benchHotspot');
  const sealHotspot = document.getElementById('sealHotspot');
  const replayBtn = document.getElementById('replayBtn');

  // Khởi tạo trạng thái ban đầu cho frame 1
  frameStep1.classList.remove('hidden');
  frameStep1.classList.add('active');
  frameStep2.classList.add('hidden');
  frameStep3.classList.add('hidden');
  frameStep4.classList.add('hidden');

  function createTouchRipple(x, y) {
    if (!invitationStage) return;
    const rect = invitationStage.getBoundingClientRect();
    const rip = document.createElement('div');
    rip.className = 'touch-ripple';
    rip.style.left = (x - rect.left) + 'px';
    rip.style.top = (y - rect.top) + 'px';
    invitationStage.appendChild(rip);
    setTimeout(() => { rip.remove(); }, 800);
  }

  function goToStep(step) {
    if (step === currentStep && step !== 1) return;
    isBusy = true;
    const prev = currentStep;
    currentStep = step;

    if (step === 1) {
      // Replay về bước 1
      document.body.classList.remove('step-4-active');
      [frameStep2, frameStep3, frameStep4].forEach(f => {
        f.classList.remove('active', 'entering', 'sliding-up', 'breaking', 'dolly-out');
        f.classList.add('hidden');
      });
      frameStep1.classList.remove('hidden', 'dolly-out');
      frameStep1.classList.add('active');
      if (guidanceText) guidanceText.textContent = `Chạm bất kỳ đâu để nhận thư`;
      isBusy = false;
    }
    else if (step === 2) {
      // BƯỚC 1 -> BƯỚC 2: Dolly zoom vào ghế & phong bì bay vút ra
      if (guidanceText) guidanceText.textContent = `Chạm vào con dấu sáp để mở phong bì`;
      playPaperRustle();

      frameStep1.classList.remove('active');
      frameStep1.classList.add('dolly-out');

      frameStep2.classList.remove('hidden', 'active');
      frameStep2.classList.add('entering');
      void frameStep2.offsetWidth; // Reflow

      requestAnimationFrame(() => {
        frameStep2.classList.remove('entering');
        frameStep2.classList.add('active');
      });

      setTimeout(() => {
        frameStep1.classList.add('hidden');
        frameStep1.classList.remove('dolly-out');
        isBusy = false;
      }, 1250);
    }
    else if (step === 3) {
      // BƯỚC 2 -> BƯỚC 3: Nổ tia lửa sáp & nắp mở tung
      if (guidanceText) guidanceText.textContent = `Đang mở bức thư...`;
      
      const sealRect = sealHotspot ? sealHotspot.getBoundingClientRect() : null;
      const sx = sealRect ? (sealRect.left + sealRect.width / 2) : (window.innerWidth / 2);
      const sy = sealRect ? (sealRect.top + sealRect.height / 2) : (window.innerHeight * 0.54);

      triggerWaxBurst(sx, sy);
      playWaxCrackSound();

      frameStep2.classList.add('breaking');

      setTimeout(() => {
        frameStep2.classList.remove('active', 'breaking');
        frameStep2.classList.add('hidden');

        frameStep3.classList.remove('hidden');
        frameStep3.classList.add('active');

        // Tự động chuyển sang Bước 4 (rút thư ra)
        setTimeout(() => {
          goToStep(4);
        }, 850);
      }, 320);
    }
    else if (step === 4) {
      // BƯỚC 3 -> BƯỚC 4: Bức thiệp trượt lên từ phong bì & chúc mừng
      document.body.classList.add('step-4-active');
      if (guidanceText) guidanceText.textContent = `Trân trọng kính mời ${shortRecipient} đến chung vui!`;
      playPaperRustle();

      frameStep3.classList.remove('active');
      frameStep3.classList.add('hidden');

      frameStep4.classList.remove('hidden', 'active');
      frameStep4.classList.add('sliding-up');
      void frameStep4.offsetWidth; // Reflow

      requestAnimationFrame(() => {
        frameStep4.classList.remove('sliding-up');
        frameStep4.classList.add('active');
      });

      triggerCelebration();
      triggerPetals();

      // Bật nhạc nhẹ nếu chưa bật
      if (!isPlayingMusic && typeof playPianoChord === 'function') {
        const audioBtn = document.getElementById('audioToggleBtn');
        if (audioBtn) {
          initAudioContext();
          isPlayingMusic = true;
          audioBtn.classList.add('playing');
          playPianoChord();
          musicInterval = setInterval(playPianoChord, 1300);
        }
      }

      setTimeout(() => {
        isBusy = false;
      }, 1400);
    }
  }

  // Chạm bất kỳ đâu trên màn hình để đi tiếp (Fullscreen Touch to Advance)
  function handleAdvanceTouch(e) {
    if (e.target.closest('button, a, input, textarea, .modal-overlay, .audio-control, .creator-tool-btn')) {
      return; // Không chặn các nút điều khiển
    }
    createTouchRipple(e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : window.innerWidth / 2),
                      e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : window.innerHeight / 2));

    if (isBusy) return;

    if (currentStep === 1) {
      goToStep(2);
    } else if (currentStep === 2) {
      goToStep(3);
    }
  }

  if (invitationStage) {
    invitationStage.addEventListener('pointerdown', handleAdvanceTouch);
  }

  if (benchHotspot) {
    benchHotspot.addEventListener('click', (e) => {
      e.stopPropagation();
      goToStep(2);
    });
  }

  if (sealHotspot) {
    sealHotspot.addEventListener('click', (e) => {
      e.stopPropagation();
      goToStep(3);
    });
  }

  if (replayBtn) {
    replayBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      goToStep(1);
    });
  }

  // -------------------------------------------------------------------------
  // 3. Hệ thống âm thanh tương tác & Nhạc nền (Web Audio API)
  // -------------------------------------------------------------------------
  let audioCtx = null;
  let isPlayingMusic = false;
  let musicInterval = null;

  function initAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Âm thanh vỡ dấu sáp (Wax crack)
  function playWaxCrackSound() {
    try {
      initAudioContext();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(45, audioCtx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.35, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    } catch(e) {
      // Audio fallback
    }
  }

  // Âm thanh sột soạt mở giấy (Paper rustle)
  function playPaperRustle() {
    try {
      initAudioContext();
      const bufferSize = audioCtx.sampleRate * 0.2;
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }

      const noise = audioCtx.createBufferSource();
      noise.buffer = buffer;

      const filter = audioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1200;
      filter.Q.value = 1.2;

      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(0.18, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);

      noise.start();
    } catch(e) {}
  }

  // Giai điệu piano lãng mạn nhẹ nhàng (Acoustic ambient piano melody)
  const pianoNotes = [
    261.63, 329.63, 392.00, 523.25, // C E G C
    293.66, 349.23, 440.00, 587.33, // D F A D
    329.63, 392.00, 493.88, 659.25, // E G B E
    349.23, 440.00, 523.25, 698.46  // F A C F
  ];
  let noteIndex = 0;

  function playPianoChord() {
    if (!isPlayingMusic || !audioCtx) return;
    try {
      const freq = pianoNotes[noteIndex % pianoNotes.length];
      noteIndex++;

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.4);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 1.5);
    } catch(e) {}
  }

  const audioToggleBtn = document.getElementById('audioToggleBtn');
  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', () => {
      initAudioContext();
      isPlayingMusic = !isPlayingMusic;

      if (isPlayingMusic) {
        audioToggleBtn.classList.add('playing');
        playPianoChord();
        musicInterval = setInterval(playPianoChord, 1200);
        showToast('Đã bật giai điệu nhẹ nhàng ♫');
      } else {
        audioToggleBtn.classList.remove('playing');
        if (musicInterval) clearInterval(musicInterval);
        showToast('Đã tắt nhạc nền');
      }
    });
  }

  // -------------------------------------------------------------------------
  // 4. Tiện ích: Lưu vào Google Calendar & Xem chi tiết văn bản
  // -------------------------------------------------------------------------
  const addToCalendarBtn = document.getElementById('addToCalendarBtn');
  if (addToCalendarBtn) {
    addToCalendarBtn.addEventListener('click', () => {
      // 17/10/2026 từ 15:30 đến 17:30 (Giờ VN = UTC+7 => 08:30 UTC - 10:30 UTC)
      const title = encodeURIComponent('Lễ Tốt Nghiệp - Vĩnh Bảo (Vin)');
      const details = encodeURIComponent(
        `Trân trọng kính mời ${shortRecipient} đến dự lễ tốt nghiệp của Vĩnh Bảo.\nThời gian: 15h30 - 17h30, 17/10/2026\nĐịa điểm: ĐH Tôn Đức Thắng (19 Nguyễn Hữu Thọ, P. Tân Hưng, TP.HCM)\nLiên hệ: 0859901709 hoặc 0869200422`
      );
      const location = encodeURIComponent('Trường Đại học Tôn Đức Thắng, số 19 Đường Nguyễn Hữu Thọ, Phường Tân Hưng, TP.HCM');
      const dates = '20261017T083000Z/20261017T103000Z';
      
      const calUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
      window.open(calUrl, '_blank');
    });
  }

  const viewTextModalBtn = document.getElementById('viewTextModalBtn');
  const textDetailsModal = document.getElementById('textDetailsModal');
  const closeTextModalBtn = document.getElementById('closeTextModalBtn');

  if (viewTextModalBtn && textDetailsModal) {
    viewTextModalBtn.addEventListener('click', () => {
      textDetailsModal.classList.remove('hidden');
    });
  }

  if (closeTextModalBtn && textDetailsModal) {
    closeTextModalBtn.addEventListener('click', () => {
      textDetailsModal.classList.add('hidden');
    });
  }

  if (textDetailsModal) {
    textDetailsModal.addEventListener('click', (e) => {
      if (e.target === textDetailsModal) {
        textDetailsModal.classList.add('hidden');
      }
    });
  }

  // -------------------------------------------------------------------------
  // 5. Công cụ tạo link cá nhân hóa hàng loạt (Dành cho Vĩnh Bảo gửi bạn bè)
  // -------------------------------------------------------------------------
  const openGeneratorBtn = document.getElementById('openGeneratorBtn');
  const closeGeneratorBtn = document.getElementById('closeGeneratorBtn');
  const generatorModal = document.getElementById('generatorModal');

  const tabSingleBtn = document.getElementById('tabSingleBtn');
  const tabBulkBtn = document.getElementById('tabBulkBtn');
  const panelSingle = document.getElementById('panelSingle');
  const panelBulk = document.getElementById('panelBulk');

  const recipientInput = document.getElementById('recipientInput');
  const generateSingleBtn = document.getElementById('generateSingleBtn');
  const singleResultBox = document.getElementById('singleResultBox');
  const resultRecipientName = document.getElementById('resultRecipientName');
  const generatedLinkInput = document.getElementById('generatedLinkInput');
  const copySingleLinkBtn = document.getElementById('copySingleLinkBtn');
  const shareZaloBtn = document.getElementById('shareZaloBtn');
  const testLinkBtn = document.getElementById('testLinkBtn');

  const bulkTextarea = document.getElementById('bulkTextarea');
  const generateBulkBtn = document.getElementById('generateBulkBtn');
  const bulkResultsList = document.getElementById('bulkResultsList');

  // Lấy đường dẫn gốc hiện tại (không có query parameter cũ)
  function getBaseUrl() {
    return window.location.origin + window.location.pathname;
  }

  function makePersonalizedLink(name) {
    const base = getBaseUrl();
    return `${base}?to=${encodeURIComponent(name.trim())}`;
  }

  if (openGeneratorBtn && generatorModal) {
    openGeneratorBtn.addEventListener('click', () => {
      generatorModal.classList.remove('hidden');
      if (recipientInput) recipientInput.focus();
    });
  }

  if (closeGeneratorBtn && generatorModal) {
    closeGeneratorBtn.addEventListener('click', () => {
      generatorModal.classList.add('hidden');
    });
  }

  if (generatorModal) {
    generatorModal.addEventListener('click', (e) => {
      if (e.target === generatorModal) {
        generatorModal.classList.add('hidden');
      }
    });
  }

  // Chuyển tab
  if (tabSingleBtn && tabBulkBtn) {
    tabSingleBtn.addEventListener('click', () => {
      tabSingleBtn.classList.add('active');
      tabBulkBtn.classList.remove('active');
      panelSingle.classList.remove('hidden');
      panelBulk.classList.add('hidden');
    });

    tabBulkBtn.addEventListener('click', () => {
      tabBulkBtn.classList.add('active');
      tabSingleBtn.classList.remove('active');
      panelBulk.classList.remove('hidden');
      panelSingle.classList.add('hidden');
    });
  }

  // Tạo link 1 người
  function doGenerateSingle() {
    const name = recipientInput.value.trim();
    if (!name) {
      alert('Vui lòng nhập tên người nhận!');
      recipientInput.focus();
      return;
    }

    const fullLink = makePersonalizedLink(name);
    resultRecipientName.textContent = name;
    generatedLinkInput.value = fullLink;
    testLinkBtn.href = fullLink;
    shareZaloBtn.href = `https://zalo.me/share?url=${encodeURIComponent(fullLink)}`;
    singleResultBox.classList.remove('hidden');
  }

  if (generateSingleBtn) {
    generateSingleBtn.addEventListener('click', doGenerateSingle);
  }

  if (recipientInput) {
    recipientInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') doGenerateSingle();
    });
  }

  if (copySingleLinkBtn) {
    copySingleLinkBtn.addEventListener('click', () => {
      if (!generatedLinkInput.value) return;
      navigator.clipboard.writeText(generatedLinkInput.value).then(() => {
        showToast(`Đã sao chép link mời cho ${resultRecipientName.textContent}!`);
      }).catch(() => {
        generatedLinkInput.select();
        document.execCommand('copy');
        showToast(`Đã sao chép link mời!`);
      });
    });
  }

  // Tạo danh sách hàng loạt
  if (generateBulkBtn && bulkTextarea && bulkResultsList) {
    generateBulkBtn.addEventListener('click', () => {
      const rawText = bulkTextarea.value.trim();
      if (!rawText) {
        alert('Vui lòng dán danh sách tên bạn bè (mỗi tên 1 dòng)!');
        return;
      }

      const names = rawText.split('\n').map(n => n.trim()).filter(n => n.length > 0);
      if (names.length === 0) return;

      bulkResultsList.innerHTML = '';
      bulkResultsList.classList.remove('hidden');

      names.forEach(name => {
        const link = makePersonalizedLink(name);
        const row = document.createElement('div');
        row.className = 'bulk-item-row';
        row.innerHTML = `
          <div class="bulk-item-name">${escapeHtml(name)}</div>
          <button class="bulk-item-copy">Sao chép link</button>
        `;

        const copyBtn = row.querySelector('.bulk-item-copy');
        copyBtn.addEventListener('click', () => {
          navigator.clipboard.writeText(link).then(() => {
            copyBtn.textContent = 'Đã sao chép ✓';
            copyBtn.style.color = '#d4af37';
            showToast(`Đã sao chép link cho ${name}!`);
            setTimeout(() => {
              copyBtn.textContent = 'Sao chép link';
              copyBtn.style.color = '';
            }, 2000);
          });
        });

        bulkResultsList.appendChild(row);
      });

      showToast(`Đã tạo xong ${names.length} link riêng biệt!`);
    });
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Toast thông báo
  const toastNotification = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');
  let toastTimer = null;

  function showToast(msg) {
    if (!toastNotification || !toastMessage) return;
    toastMessage.textContent = msg;
    toastNotification.classList.remove('hidden');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastNotification.classList.add('hidden');
    }, 2800);
  }

  // -------------------------------------------------------------------------
  // 6. Hiệu ứng pháo hoa bụi vàng & cánh hoa rơi (Celebration Canvas)
  // -------------------------------------------------------------------------
  const canvas = document.getElementById('effectsCanvas');
  let ctx = null;
  let particles = [];
  let animFrame = null;

  if (canvas) {
    ctx = canvas.getContext('2d');
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
  }

  function triggerWaxBurst(originX, originY) {
    if (!ctx) return;
    const colors = ['#ffd700', '#ffb700', '#ff4d4d', '#ffffff', '#e67300'];
    for (let i = 0; i < 90; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 9 + 3;
      particles.push({
        x: originX || (canvas.width / 2),
        y: originY || (canvas.height * 0.54),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        size: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        rotation: Math.random() * 360,
        spin: (Math.random() - 0.5) * 12,
        decay: Math.random() * 0.02 + 0.015,
        type: 'spark'
      });
    }
    if (!animFrame) {
      renderParticles();
    }
  }

  function triggerPetals() {
    if (!ctx) return;
    const petalColors = ['#9e1a24', '#b82531', '#7a121b', '#d4af37'];
    for (let i = 0; i < 35; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: -20 - Math.random() * 100,
        vx: (Math.random() - 0.6) * 2.5,
        vy: Math.random() * 2 + 1.2,
        size: Math.random() * 7 + 5,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        alpha: 0.9,
        rotation: Math.random() * 360,
        spin: (Math.random() - 0.5) * 4,
        decay: Math.random() * 0.002 + 0.001,
        type: 'petal'
      });
    }
    if (!animFrame) {
      renderParticles();
    }
  }

  function triggerCelebration() {
    if (!ctx) return;
    const colors = ['#f7e7b4', '#d4af37', '#aa820a', '#c2414c', '#ffffff'];

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() * 160 - 80),
        y: canvas.height * 0.45 + (Math.random() * 80 - 40),
        vx: (Math.random() - 0.5) * 9,
        vy: (Math.random() - 0.8) * 10,
        size: Math.random() * 5 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        rotation: Math.random() * 360,
        spin: (Math.random() - 0.5) * 8,
        decay: Math.random() * 0.008 + 0.006,
        type: 'confetti'
      });
    }

    if (!animFrame) {
      renderParticles();
    }
  }

  function renderParticles() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.type === 'spark') {
        p.vy += 0.22; // Trọng lực tia lửa
      } else if (p.type === 'petal') {
        p.vx += Math.sin(p.y * 0.02) * 0.08; // Chao liệng như cánh hoa
      } else {
        p.vy += 0.14; // Gravity pháo hoa
      }

      p.alpha -= p.decay;
      p.rotation += p.spin;

      if (p.alpha <= 0 || p.y > canvas.height + 50) {
        particles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;

      if (p.type === 'petal') {
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.65, 0, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.type === 'spark') {
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 0.7, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.5);
      }

      ctx.restore();
    }

    if (particles.length > 0) {
      animFrame = requestAnimationFrame(renderParticles);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      animFrame = null;
    }
  }

});
