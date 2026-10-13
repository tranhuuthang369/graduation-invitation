/**
 * THƯ MỜI TỐT NGHIỆP – VĨNH BẢO (VIN)
 * Three.js Cinematic Animation & Interactive Invitation Card
 */

(function(){
// =========================================================================
// 1. CẤU HÌNH HẰNG SỐ (Tùy chỉnh tập trung)
// =========================================================================
const CONFIG = {
  timings: {
    autoStep3to4: 1800,        // Tự chuyển bước 3 sang bước 4 sau 1.8s
    highlightDelay: 1600,      // Bắt đầu tô vàng tên sau khi dòng 1 hiện
    highlightDuration: 1200,   // Thời lượng hiệu ứng bút dạ quang (1.2s)
    endActionsDelay: 3800,     // Hiện 2 nút tiện ích (Lịch & Bản đồ) sau khi đọc xong
    petalsDuration: 9000       // Thời gian cánh hoa hồng rơi (9s)
  },
  particles: {
    dustCount: 85,             // Số hạt bụi sáng (<= 100)
    leafCount: 10,             // Số lá rơi 3D (<= 12)
    petalCount: 18,            // Số cánh hoa hồng (<= 20)
    sparkCount: 130            // Số tia lửa khi nứt con dấu
  },
  parallax: {
    mouseFactor: 14,           // Độ nhạy chuột máy tính
    tiltFactor: 24,            // Độ nhạy con quay hồi chuyển điện thoại
    smoothing: 0.08            // Hệ số làm mượt chuyển động
  },
  colors: {
    dustGlow: 'rgba(255,240,200,1)',
    sparkGold: 0xffd98a,
    highlight: '#ffd54f'
  }
};

// =========================================================================
// 2. KHỞI TẠO URL & TRẠNG THÁI TRANG
// =========================================================================
const q = new URLSearchParams(location.search);
const h = new URLSearchParams(location.hash.replace(/^#/,''));
const hasTo = q.has('to') || h.has('to');
const $ = (id) => document.getElementById(id);

// CHẾ ĐỘ 1: TRANG TẠO LINK (Khi không có ?to= và không có #to=)
if (!hasTo) {
  $('gen').hidden = false;
  const base = location.origin + location.pathname;
  const nm = $('name');
  const ok = $('ok');

  function makeLink() {
    const val = nm.value.trim();
    return base + '?to=' + encodeURIComponent(val);
  }

  function updateLinkDisplay() {
    const u = makeLink();
    $('link').textContent = nm.value.trim() ? u : 'Nhập tên để tạo link';
    $('view').href = u;
  }

  nm.addEventListener('input', updateLinkDisplay);
  updateLinkDisplay();

  function showStatus(text) {
    ok.textContent = text;
    setTimeout(() => { ok.textContent = ''; }, 2200);
  }

  $('copy').onclick = function() {
    if (!nm.value.trim()) {
      nm.focus();
      return showStatus('Hãy nhập tên người nhận trước nhé');
    }
    const u = makeLink();
    function fallbackCopy() {
      const ta = document.createElement('textarea');
      ta.value = u;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        showStatus('Đã sao chép link ✓');
      } catch (err) {
        showStatus('Hãy nhấn giữ link để sao chép');
      }
      ta.remove();
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(u).then(() => {
        showStatus('Đã sao chép link ✓');
      }, fallbackCopy);
    } else {
      fallbackCopy();
    }
  };

  if (navigator.share) {
    $('share').hidden = false;
    $('share').onclick = function() {
      if (!nm.value.trim()) {
        nm.focus();
        return showStatus('Hãy nhập tên người nhận trước nhé');
      }
      navigator.share({
        title: 'Thư mời tốt nghiệp',
        text: 'Thư mời tốt nghiệp của Vĩnh Bảo gửi ' + nm.value.trim(),
        url: makeLink()
      }).catch(() => {});
    };
  }
  return;
}

// =========================================================================
// 3. CHẾ ĐỘ 2: HIỆN THIỆP MỜI CÁ NHÂN HOÁ (?to=Tên)
// =========================================================================
const rawParam = (q.get('to') || h.get('to') || '').trim();
const name = rawParam.slice(0, 40); // Tối đa 40 ký tự
const displayName = name || 'Bạn';
const displaySmallName = name || 'bạn';

const card = $('card');
card.style.display = 'block';
document.body.style.overflow = 'hidden';

if (name) {
  document.title = 'Thư mời gửi ' + name;
}
$('capn').textContent = displayName;

// Tự co giãn khung hình responsive (cover trên mobile, contain trên desktop)
function fitStage() {
  const w = innerWidth, hh = innerHeight;
  const scale = w <= 600 ? Math.max(w / 393, hh / 852) : Math.min(w / 393, hh / 852);
  $('stage').style.setProperty('--s', scale);
}
addEventListener('resize', fitStage);
fitStage();

// Render nội dung thư viết tay - Tên hiển thị đúng tại 3 vị trí
const txtEl = $('txt');
txtEl.innerHTML = 
  '<p>Trước một cột mốc đáng nhớ, sự hiện diện của <b class="n hl"></b> trong ngày vui này chính là món quà ý nghĩa nhất đối với <b>Vĩnh Bảo</b>.</p>'
  + '<p>Trân trọng kính mời <b class="n hl"></b> đến dự lễ tốt nghiệp của <b>Vĩnh Bảo</b>. Vào khung giờ từ <b>15h30 đến 17h30, ngày 17 tháng 10 năm 2026</b>. Tại <b>Trường Đại học Tôn Đức Thắng (số 19 Đường Nguyễn Hữu Thọ, Phường Tân Hưng, Thành phố Hồ Chí Minh)</b>.</p>'
  + '<p>Mọi thắc mắc vui lòng liên hệ vào số điện thoại <b><a href="tel:0859901709">0859901709</a></b> hoặc <b><a href="tel:0869200422">0869200422</a></b>.</p>'
  + '<p class="c">Chúc <span class="m hl"></span> thật nhiều sức khoẻ,<br>Xin trân trọng cảm ơn.</p>';

txtEl.querySelectorAll('.n').forEach((el) => { el.textContent = displayName; });
txtEl.querySelector('.m').textContent = displaySmallName;

// Tự động căn chỉnh cỡ chữ vừa khít trong khung 270x284px
function fitTextSize() {
  let s = 14;
  txtEl.style.fontSize = s + 'px';
  txtEl.style.lineHeight = (s * 1.386) + 'px';
  while (txtEl.scrollHeight > txtEl.clientHeight + 1 && s > 9) {
    s -= 0.5;
    txtEl.style.fontSize = s + 'px';
    txtEl.style.lineHeight = (s * 1.386) + 'px';
  }
}
fitTextSize();
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(fitTextSize);
}

// Bụi sáng CSS dự phòng khi không có Three.js
const st = $('stage');
const cp = st.querySelector('.cap');
for (let i = 0; i < 18; i++) {
  const d = document.createElement('i');
  d.className = 'dust';
  const z = 3 + Math.random() * 5;
  d.style.cssText = 'left:' + Math.random() * 393 + 'px;width:' + z + 'px;height:' + z + 'px;animation-duration:' + (10 + Math.random() * 10) + 's;animation-delay:-' + Math.random() * 16 + 's;--dx:' + (Math.random() * 80 - 40) + 'px';
  st.insertBefore(d, cp);
}

// Chuyển bước trong giao diện (State Machine 1 -> 4)
function goToStep(n) {
  card.dataset.step = n;
  if (fx) fx.step(n);
  for (let i = 1; i <= 4; i++) {
    const el = $('f' + i);
    if (el) el.classList.toggle('on', n >= i);
  }
  const h1 = $('h1'), h2 = $('h2');
  if (h1) h1.style.display = (n === 1) ? '' : 'none';
  if (h2) h2.style.display = (n === 2) ? '' : 'none';

  // Khi tới bước 4: Kích hoạt hiệu ứng tô vàng & hiện 2 nút tiện ích
  if (n === 4) {
    setTimeout(() => {
      txtEl.querySelectorAll('.hl').forEach((el) => {
        el.classList.add('on');
      });
    }, CONFIG.timings.highlightDelay);

    setTimeout(() => {
      const actions = $('endActions');
      if (actions) actions.classList.add('show');
    }, CONFIG.timings.endActionsDelay);
  }
}

// -------------------------------------------------------------------------
// TÍNH NĂNG KẾT THƯ: Tải file lịch .ics & Bản đồ
// -------------------------------------------------------------------------
const btnCal = $('btnCal');
if (btnCal) {
  btnCal.addEventListener('click', (e) => {
    e.stopPropagation();
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//VinhBao//Graduation Invitation//VI',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:graduation-vinh-bao-20261017@vinhbao.edu',
      'SUMMARY:Lễ Tốt Nghiệp Vĩnh Bảo (Vin)',
      'DESCRIPTION:Trân trọng kính mời bạn đến dự lễ tốt nghiệp của Vĩnh Bảo tại ĐH Tôn Đức Thắng.\\nLiên hệ: 0859901709',
      'LOCATION:Trường Đại học Tôn Đức Thắng, số 19 Đường Nguyễn Hữu Thọ, Phường Tân Hưng, TP. Hồ Chí Minh',
      'DTSTART:20261017T083000Z',
      'DTEND:20261017T103000Z',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'le-tot-nghiep-vinh-bao.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  });
}

const btnMap = $('btnMap');
if (btnMap) {
  btnMap.addEventListener('click', (e) => {
    e.stopPropagation(); // Không kích hoạt click stage
  });
}

// =========================================================================
// 4. THREE.JS CINEMATIC 3D ENGINE
// =========================================================================
function initFX() {
  if (!window.THREE || matchMedia('(prefers-reduced-motion:reduce)').matches) {
    throw new Error('Fallback to CSS animations');
  }

  const T = THREE;
  const W = 393, H = 852;
  const FOV = 40;
  const D = H / 2 / Math.tan(FOV * Math.PI / 360);
  const stageEl = $('stage');

  // Renderer với pixelRatio an toàn <= 2.5
  const rn = new T.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  const cv = rn.domElement;
  stageEl.insertBefore(cv, stageEl.firstChild);

  function resizeRenderer() {
    const s = parseFloat(stageEl.style.getPropertyValue('--s')) || 1;
    rn.setPixelRatio(Math.min(2.5, (window.devicePixelRatio || 1) * s));
    rn.setSize(W, H);
  }
  addEventListener('resize', resizeRenderer);
  resizeRenderer();

  const sc = new T.Scene();
  const cam = new T.PerspectiveCamera(FOV, W / H, 10, 6000);

  function createTextureCanvas(w, h, drawFn) {
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    drawFn(c.getContext('2d'), w, h);
    return new T.CanvasTexture(c);
  }

  // 4 Planes chính tương ứng 4 Frames
  const planes = [];
  [1, 2, 3, 4].forEach((idx) => {
    const mat = new T.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false, visible: false });
    const mesh = new T.Mesh(new T.PlaneGeometry(W * 1.04, H * 1.04), mat);
    mesh.renderOrder = idx;
    mesh.userData = { o: 0 };
    sc.add(mesh);
    planes.push(mesh);

    const imgEl = $('f' + idx);
    if (imgEl) {
      new T.TextureLoader().load(imgEl.src, (tex) => {
        mat.map = tex;
        mat.visible = true;
        mat.needsUpdate = true;
        if (idx === 1) card.classList.add('gl');
      });
    }
  });

  // Hạt phát sáng dùng chung
  const glowTex = createTextureCanvas(64, 64, (ctx) => {
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, CONFIG.colors.dustGlow);
    g.addColorStop(0.4, 'rgba(255,225,160,0.35)');
    g.addColorStop(1, 'rgba(255,225,160,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
  });

  const AdditiveBlending = T.AdditiveBlending;

  // A. Bụi sáng đa tầng (85 hạt)
  const N = CONFIG.particles.dustCount;
  const dustPos = new Float32Array(N * 3);
  const dustSpeeds = [];
  for (let i = 0; i < N; i++) {
    dustPos[i * 3] = (Math.random() - 0.5) * 600;
    dustPos[i * 3 + 1] = (Math.random() - 0.5) * 950;
    dustPos[i * 3 + 2] = 20 + Math.random() * 280;
    dustSpeeds.push(8 + Math.random() * 14, Math.random() * 6.28);
  }
  const dustGeo = new T.BufferGeometry();
  dustGeo.setAttribute('position', new T.BufferAttribute(dustPos, 3));
  const dustPoints = new T.Points(dustGeo, new T.PointsMaterial({
    map: glowTex, size: 14, transparent: true, opacity: 0.8, blending: AdditiveBlending, depthWrite: false
  }));
  dustPoints.renderOrder = 10;
  dustPoints.frustumCulled = false;
  sc.add(dustPoints);

  // B. Tia nắng xiên lướt nhẹ qua tường
  const raysTex = createTextureCanvas(256, 512, (ctx, w, h) => {
    for (let k = 0; k < 5; k++) {
      const a = k * 50 + 60;
      const g = ctx.createLinearGradient(a - 60, 0, a + 30, 0);
      g.addColorStop(0, 'rgba(255,240,200,0)');
      g.addColorStop(0.5, 'rgba(255,240,200,' + (0.2 + (k % 2) * 0.12) + ')');
      g.addColorStop(1, 'rgba(255,240,200,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.moveTo(a, 0); ctx.lineTo(a + 30, 0); ctx.lineTo(a - 90, h); ctx.lineTo(a - 120, h);
      ctx.fill();
    }
  });
  const raysMesh = new T.Mesh(new T.PlaneGeometry(700, 1100), new T.MeshBasicMaterial({
    map: raysTex, transparent: true, opacity: 0.2, blending: AdditiveBlending, depthWrite: false
  }));
  raysMesh.position.set(80, 0, 30);
  raysMesh.renderOrder = 9;
  sc.add(raysMesh);

  // C. 10 Lá rơi 3D và 18 Cánh hoa hồng (renderOrder = 8, không che chữ)
  function createLeafTex(c1, c2, isPetal) {
    return createTextureCanvas(48, 32, (ctx, w, h) => {
      ctx.translate(w / 2, h / 2);
      ctx.fillStyle = c1;
      ctx.beginPath();
      ctx.ellipse(0, 0, isPetal ? 14 : 20, isPetal ? 11 : 9, 0, 0, 6.3);
      ctx.fill();
      ctx.strokeStyle = c2;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(-16, 0); ctx.lineTo(16, 0); ctx.stroke();
    });
  }
  const leafMats = [
    createLeafTex('#58752f', '#2f4318', false),
    createLeafTex('#b98f3c', '#6b4d16', false),
    createLeafTex('#b3262e', 'rgba(70,0,10,0.45)', true)
  ].map((tex) => new T.MeshBasicMaterial({ map: tex, transparent: true, side: T.DoubleSide, depthWrite: false }));

  const leaves = [];
  let petalsEndTime = 0;

  function resetLeaf(mesh, isFirst) {
    const u = mesh.userData;
    if (u.isPetal) {
      mesh.position.set((Math.random() - 0.5) * 380, 450 + Math.random() * (isFirst ? 350 : 120), 10 + Math.random() * 150);
      u.vy = 40 + Math.random() * 40;
    } else {
      mesh.position.set(Math.random() * 200, isFirst ? -100 + Math.random() * 540 : 440 + Math.random() * 60, 20 + Math.random() * 180);
      u.vy = 22 + Math.random() * 22;
    }
    u.vx = -6 - Math.random() * 8;
    u.phase = Math.random() * 6;
    u.rx = Math.random() * 2;
    u.ry = Math.random() * 2;
    u.rz = Math.random() * 1.5;
  }

  const totalFlora = CONFIG.particles.leafCount + CONFIG.particles.petalCount;
  for (let i = 0; i < totalFlora; i++) {
    const isPetal = i >= CONFIG.particles.leafCount;
    const mesh = new T.Mesh(new T.PlaneGeometry(isPetal ? 13 : 17, isPetal ? 16 : 10), leafMats[isPetal ? 2 : (i % 2)]);
    mesh.userData = { isPetal: isPetal };
    mesh.renderOrder = isPetal ? 8 : 11; // Cánh hoa rơi phía sau chữ
    mesh.visible = !isPetal;
    resetLeaf(mesh, true);
    sc.add(mesh);
    leaves.push(mesh);
  }

  // D. Tia lửa loé sáng khi nứt con dấu
  const B = CONFIG.particles.sparkCount;
  const sparkPos = new Float32Array(B * 3);
  const sparkVel = new Float32Array(B * 3);
  const sparkGeo = new T.BufferGeometry();
  sparkGeo.setAttribute('position', new T.BufferAttribute(sparkPos, 3));
  const sparkMat = new T.PointsMaterial({
    map: glowTex, size: 12, color: CONFIG.colors.sparkGold, transparent: true, opacity: 0, blending: AdditiveBlending, depthWrite: false
  });
  const sparkPoints = new T.Points(sparkGeo, sparkMat);
  sparkPoints.renderOrder = 12;
  sparkPoints.frustumCulled = false;
  sc.add(sparkPoints);

  const flareSprite = new T.Sprite(new T.SpriteMaterial({ map: glowTex, blending: AdditiveBlending, transparent: true, depthWrite: false, opacity: 0 }));
  flareSprite.position.set(-5, -23, 60);
  flareSprite.renderOrder = 13;
  sc.add(flareSprite);

  let burstTime = 9, flareTime = 9;
  function triggerBurst() {
    for (let i = 0; i < B; i++) {
      const an = Math.random() * 6.283;
      const v = 60 + Math.random() * 220;
      sparkPos[i * 3] = -5;
      sparkPos[i * 3 + 1] = -23;
      sparkPos[i * 3 + 2] = 60;
      sparkVel[i * 3] = Math.cos(an) * v;
      sparkVel[i * 3 + 1] = Math.sin(an) * v + 40;
      sparkVel[i * 3 + 2] = (Math.random() - 0.5) * 120;
    }
    burstTime = 0;
    flareTime = 0;
  }

  // Camera Dolly & Parallax Controller
  let px = 0, py = 0;
  let cx = 0, cy = 0, cz = D, targetZ = D;
  let currentStep = 1;
  let t0 = performance.now();
  let isTabVisible = true;

  document.addEventListener('visibilitychange', () => {
    isTabVisible = !document.hidden;
    if (isTabVisible) t0 = performance.now();
  });

  addEventListener('pointermove', (e) => {
    px = (e.clientX / innerWidth - 0.5) * 2;
    py = (e.clientY / innerHeight - 0.5) * 2;
  });

  addEventListener('deviceorientation', (e) => {
    if (e.gamma == null) return;
    px = Math.max(-1, Math.min(1, e.gamma / CONFIG.parallax.tiltFactor));
    py = Math.max(-1, Math.min(1, (e.beta - 45) / CONFIG.parallax.tiltFactor));
  });

  txtEl.style.transformOrigin = '139.5px 107px';

  // Animation Loop duy nhất (1 rAF)
  function renderLoop() {
    requestAnimationFrame(renderLoop);
    if (!isTabVisible) return;

    const now = performance.now();
    const dt = Math.min(0.05, (now - t0) / 1000);
    const t = now / 1000;
    t0 = now;

    // Khi ở bước 4: tắt parallax (mu = 0) để chữ KHỚP PIXEL hoàn hảo với trang giấy
    const mu = (currentStep >= 4) ? 0 : 1;
    const k = 1 - Math.exp(-dt * (currentStep >= 4 ? 3.2 : 1.8));

    cz += (targetZ - cz) * k;
    cx += (px * mu * CONFIG.parallax.mouseFactor - cx) * k;
    cy += (-py * mu * (CONFIG.parallax.mouseFactor * 0.7) - cy) * k;
    cam.position.set(cx, cy, cz);
    cam.lookAt(0, 0, 0);

    // Crossfade và scale từng frame
    planes.forEach((p, idx) => {
      const u = p.userData;
      const targetOp = (currentStep >= idx + 1) ? 1 : 0;
      u.o += (targetOp - u.o) * (1 - Math.exp(-dt * (idx ? 2.2 : 1.2)));
      p.material.opacity = u.o;
      p.scale.setScalar(1 + 0.05 * (1 - u.o));
      p.position.z = idx * 0.4;
    });

    if (currentStep >= 4) {
      txtEl.style.transform = 'scale(' + (1.04 * D / cz) + ')';
    }

    // Di chuyển hạt bụi sáng
    for (let j = 0; j < N; j++) {
      dustPos[j * 3 + 1] += dustSpeeds[j * 2] * dt;
      dustPos[j * 3] += Math.sin(t * 0.5 + dustSpeeds[j * 2 + 1]) * 6 * dt;
      if (dustPos[j * 3 + 1] > 480) dustPos[j * 3 + 1] = -480;
    }
    dustGeo.attributes.position.needsUpdate = true;

    // Tia nắng lướt
    raysMesh.position.x = 80 + Math.sin(t * 0.15) * 40;
    raysMesh.material.opacity = 0.15 + 0.08 * Math.sin(t * 0.5);

    // Lá & Cánh hoa chuyển động
    leaves.forEach((mesh) => {
      if (!mesh.visible) return;
      const u = mesh.userData;
      mesh.position.y -= u.vy * dt;
      mesh.position.x += (u.vx + Math.sin(t * 1.3 + u.phase) * 14) * dt;
      mesh.rotation.x += u.rx * dt;
      mesh.rotation.y += u.ry * dt;
      mesh.rotation.z += u.rz * dt;
      if (mesh.position.y < -450) {
        if (u.isPetal && now > petalsEndTime) {
          mesh.visible = false;
        } else {
          resetLeaf(mesh, false);
        }
      }
    });

    // Tia lửa nứt sáp
    if (burstTime < 2.4) {
      burstTime += dt;
      for (let j = 0; j < B; j++) {
        sparkVel[j * 3 + 1] -= 140 * dt;
        sparkPos[j * 3] += sparkVel[j * 3] * dt;
        sparkPos[j * 3 + 1] += sparkVel[j * 3 + 1] * dt;
        sparkPos[j * 3 + 2] += sparkVel[j * 3 + 2] * dt;
      }
      sparkGeo.attributes.position.needsUpdate = true;
      sparkMat.opacity = Math.max(0, 1 - burstTime / 2.4);
    }

    // Flare loé sáng
    if (flareTime < 1.3) {
      flareTime += dt;
      flareSprite.scale.setScalar(30 + flareTime * 500);
      flareSprite.material.opacity = Math.max(0, 1 - flareTime / 1.3) * 0.9;
    }

    rn.render(sc, cam);
  }
  renderLoop();

  return {
    step: function(stepNum) {
      currentStep = stepNum;
      targetZ = [D, D, D * 0.95, D * 0.9, D][stepNum] || D;

      // Xin quyền cảm biến trên iOS khi chạm
      if (stepNum === 2 && window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission === 'function') {
        try { DeviceOrientationEvent.requestPermission().catch(() => {}); } catch(e) {}
      }

      if (stepNum === 3) {
        triggerBurst();
      }

      if (stepNum === 4) {
        petalsEndTime = performance.now() + CONFIG.timings.petalsDuration;
        leaves.forEach((m) => {
          if (m.userData.isPetal) {
            m.visible = true;
            resetLeaf(m, true);
          }
        });
      }
    }
  };
}

let fx = null;
try {
  fx = initFX();
} catch (e) {
  fx = null;
}

setTimeout(() => { goToStep(1); }, 80);

// =========================================================================
// 5. TƯƠNG TÁC CHẠM BẤT KỲ ĐÂU ĐỂ ĐI TIẾP (Chống bấm đúp)
// =========================================================================
let isBusy = false;
st.addEventListener('click', function(e) {
  // Hiệu ứng vòng tròn lan tỏa tại vị trí chạm (Ripple effect)
  const rect = st.getBoundingClientRect();
  const scale = rect.width / 393;
  const rip = document.createElement('div');
  rip.className = 'rip';
  rip.style.left = ((e.clientX - rect.left) / scale) + 'px';
  rip.style.top = ((e.clientY - rect.top) / scale) + 'px';
  st.appendChild(rip);
  setTimeout(() => { rip.remove(); }, 850);

  if (isBusy) return;
  const current = +card.dataset.step;
  if (current === 1) {
    goToStep(2);
  } else if (current === 2) {
    isBusy = true;
    goToStep(3);
    setTimeout(() => {
      goToStep(4);
      isBusy = false;
    }, CONFIG.timings.autoStep3to4);
  }
});

})();