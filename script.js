(() => {
  "use strict";

  const cfg = window.WEDDING_CONFIG;
  const $ = (selector) => document.querySelector(selector);
  const pad = (n, len = 2) => String(n).padStart(len, "0");

  function setText(selector, text) {
    const el = $(selector);
    if (el) el.textContent = text;
  }

  function initContent() {
    const names = `${cfg.couple.groom} × ${cfg.couple.bride}`;
    setText("#groomName", cfg.couple.groom);
    setText("#brideName", cfg.couple.bride);
    setText("#heroMessage", cfg.couple.heroMessage);
    setText("#eventDateText", cfg.event.dateText);
    setText("#eventTimeText", cfg.event.timeText);
    setText("#venueName", cfg.event.venueName);
    setText("#venueAddress", cfg.event.venueAddress);
    setText("#footerNames", names);

    const eventDate = new Date(cfg.event.start);
    const dateCode = `${eventDate.getFullYear()}.${pad(eventDate.getMonth() + 1)}.${pad(eventDate.getDate())}`;
    setText("#heroDate", dateCode);
    setText("#footerDate", dateCode);

    setupMapButton("#mapButton");
    setupMapButton("#transportMapButton");

    const timeline = $("#timelineList");
    if (timeline) {
      timeline.innerHTML = cfg.schedule.map(item => `
        <article class="timeline-item">
          <div class="timeline-time">${escapeHtml(item.time)}</div>
          <div>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.note || "")}</p>
          </div>
        </article>
      `).join("");
    }

    const parkingList = $("#parkingList");
    const transitList = $("#transitList");
    if (parkingList && cfg.transport?.parking) {
      parkingList.innerHTML = cfg.transport.parking.map(item => `
        <div class="transport-item">
          <strong>${escapeHtml(item.title)}</strong>
          <p>${escapeHtml(item.detail)}</p>
        </div>
      `).join("");
    }
    if (transitList && cfg.transport?.transit) {
      transitList.innerHTML = cfg.transport.transit.map(item => `
        <div class="transport-item">
          <strong>${escapeHtml(item.title)}</strong>
          <p>${escapeHtml(item.detail)}</p>
        </div>
      `).join("");
    }
  }

  function setupMapButton(selector) {
    const button = $(selector);
    if (!button) return;
    if (cfg.event.mapUrl) {
      button.href = cfg.event.mapUrl;
    } else {
      button.addEventListener("click", event => {
        event.preventDefault();
        toast("尚未設定婚宴地圖網址");
      });
    }
  }

  function initCountdown() {
    const target = new Date(cfg.event.start).getTime();

    function update() {
      const diff = target - Date.now();
      if (Number.isNaN(target)) {
        setText("#countdownNote", "請在 config.js 設定正確的婚禮日期。");
        return;
      }
      if (diff <= 0) {
        setText("#days", "000");
        setText("#hours", "00");
        setText("#minutes", "00");
        setText("#seconds", "00");
        setText("#countdownNote", "幸福的日子已經到來，謝謝您的祝福！");
        return;
      }
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setText("#days", pad(days, 3));
      setText("#hours", pad(hours));
      setText("#minutes", pad(minutes));
      setText("#seconds", pad(seconds));
    }

    update();
    setInterval(update, 1000);
  }

  function initCalendar() {
    const button = $("#calendarButton");
    if (!button) return;

    button.addEventListener("click", () => {
      const start = toICSDate(new Date(cfg.event.start));
      const end = toICSDate(new Date(cfg.event.end));
      const location = [cfg.event.venueName, cfg.event.venueAddress].filter(Boolean).join(" ");
      const content = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Wedding Invitation//ZH-TW//",
        "CALSCALE:GREGORIAN",
        "BEGIN:VEVENT",
        `DTSTART:${start}`,
        `DTEND:${end}`,
        `SUMMARY:${escapeICS(cfg.event.calendarTitle)}`,
        `DESCRIPTION:${escapeICS(cfg.event.calendarDescription)}`,
        `LOCATION:${escapeICS(location)}`,
        "END:VEVENT",
        "END:VCALENDAR"
      ].join("\r\n");

      const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "wedding-invitation.ics";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      toast("已建立行事曆檔案");
    });
  }

  function initNav() {
    const toggle = $(".nav-toggle");
    const links = $(".nav-links");
    if (!toggle || !links) return;

    toggle.addEventListener("click", () => {
      const isOpen = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
    links.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }));
  }

  function initReveal() {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach(el => el.classList.add("visible"));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
  }

  function registerSW() {
    if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
      navigator.serviceWorker.register("./sw.js").catch(() => {});
    }
  }

  function toast(message) {
    const el = $("#toast");
    if (!el) return;
    el.textContent = message;
    el.classList.add("show");
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => el.classList.remove("show"), 2200);
  }

  function toICSDate(date) {
    return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  }

  function escapeICS(text = "") {
    return String(text)
      .replace(/\\/g, "\\\\")
      .replace(/\n/g, "\\n")
      .replace(/,/g, "\\,")
      .replace(/;/g, "\\;");
  }

  function escapeHtml(value = "") {
    return String(value).replace(/[&<>"']/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    }[char]));
  }

  initContent();
  initCountdown();
  initCalendar();
  initNav();
  initReveal();
  registerSW();
})();
