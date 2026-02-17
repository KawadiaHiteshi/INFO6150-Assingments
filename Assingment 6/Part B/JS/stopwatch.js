/* Part B - stopwatch.js (FINAL)
   Meets requirements:
   - jQuery validations (focus clear, start-blocking)
   - Async/Await + Promises for saving
   - setInterval / clearInterval timer
   - localStorage session history (most recent first)
   - filter by date + stats (total sessions + total time)
   - disables date + event name while running
   - no alert() popups
   - prevents double-save (lock + disable + .off().on())
*/

$(document).ready(function () {
  const STORAGE_KEY = "a6_sessions";

  // --- Timer state ---
  let totalSeconds = 0;
  let intervalId = null;
  let isRunning = false;
  let isPaused = false;
  let isSaving = false; // prevents double save

  // --- Cache DOM ---
  const $time = $("#timeDisplay");

  const $date = $("#eventDate");
  const $name = $("#eventName");

  const $dateErr = $("#dateErr");
  const $nameErr = $("#nameErr");

  const $start = $("#startBtn");
  const $pause = $("#pauseBtn");
  const $stop = $("#stopBtn");
  const $reset = $("#resetBtn");

  const $history = $("#history");
  const $filterDate = $("#filterDate");
  const $clearFilter = $("#clearFilterBtn");
  const $clearAll = $("#clearAllBtn");


  const $totalSessions = $("#totalSessions");
  const $totalTime = $("#totalTime");

  const $toast = $("#toast");
  const $modalBack = $("#modalBack");
  const $modalBody = $("#modalBody");
  const $modalClose = $("#modalClose");

  // --- Helpers ---
  const todayISO = () => new Date().toISOString().slice(0, 10);

  const formatTime = (sec) => {
    const hrs = String(Math.floor(sec / 3600)).padStart(2, "0");
    const mins = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
    const secs = String(sec % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  const parseHHMMSS = (hhmmss) => {
    const [h, m, s] = hhmmss.split(":").map((x) => Number(x) || 0);
    return h * 3600 + m * 60 + s;
  };

  const updateDisplay = () => $time.text(formatTime(totalSeconds));

  const showToast = (msg) => {
    $toast.stop(true, true).text(msg).addClass("toast--show");
    setTimeout(() => $toast.removeClass("toast--show"), 1500);
  };

  const openModal = (text) => {
    $modalBody.text(text);
    $modalBack.addClass("modalBack--show").attr("aria-hidden", "false");
  };

  const closeModal = () => {
    $modalBack.removeClass("modalBack--show").attr("aria-hidden", "true");
  };

  const setInputsDisabled = (disabled) => {
    $date.prop("disabled", disabled);
    $name.prop("disabled", disabled);
  };

  const startInterval = () => {
    intervalId = setInterval(() => {
      totalSeconds++;
      updateDisplay();
    }, 1000);
  };

  const stopInterval = () => {
    if (intervalId) clearInterval(intervalId);
    intervalId = null;
  };

  // --- Validation (jQuery) ---
  const validateDate = (show = true) => {
    const v = $date.val();
    if (!v) {
      if (show) {
        $dateErr.text("Please select a date").show();
        $date.addClass("inputErr");
      }
      return false;
    }
    if (show) {
      $dateErr.text("").hide();
      $date.removeClass("inputErr");
    }
    return true;
  };

  // Allowed: letters, numbers, spaces, hyphens, apostrophes
  const nameRegex = /^[a-zA-Z0-9\s'-]+$/;

  const validateName = (show = true) => {
    const v = $name.val().trim();

    if (!v) {
      if (show) {
        $nameErr.text("Event name is required").show();
        $name.addClass("inputErr");
      }
      return false;
    }
    if (v.length < 3) {
      if (show) {
        $nameErr.text("Event name must be at least 3 characters").show();
        $name.addClass("inputErr");
      }
      return false;
    }
    if (v.length > 100) {
      if (show) {
        $nameErr.text("Event name too long (max 100 characters)").show();
        $name.addClass("inputErr");
      }
      return false;
    }
    if (!nameRegex.test(v)) {
      if (show) {
        $nameErr.text("Event name contains invalid characters").show();
        $name.addClass("inputErr");
      }
      return false;
    }

    if (show) {
      $nameErr.text("").hide();
      $name.removeClass("inputErr");
    }
    return true;
  };

  // Clear errors on focus (required)
  $date.on("focus", function () {
    $dateErr.text("").hide();
    $date.removeClass("inputErr");
  });
  $name.on("focus", function () {
    $nameErr.text("").hide();
    $name.removeClass("inputErr");
  });

  // --- Storage ---
  const loadSessions = () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  };

  const saveSessions = (sessions) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  };

  // Async/Await + Promise requirement
  const saveSessionAsync = async (sessionObj) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const sessions = loadSessions();
        sessions.unshift(sessionObj); // most recent first
        saveSessions(sessions);
        resolve(sessions);
      }, 350);
    });
  };

  // --- Render ---
  const renderStats = (sessions) => {
    $totalSessions.text(sessions.length);
    const total = sessions.reduce((acc, s) => acc + parseHHMMSS(s.duration), 0);
    $totalTime.text(formatTime(total));
  };

  const escapeHtml = (str) => $("<div>").text(str).html();

const buildItem = (s) => `
  <div class="item" data-id="${escapeHtml(s.id || "")}">
    <div class="itemTop">
      <div class="badge">${escapeHtml(s.date)}</div>

      <div class="itemTopRight">
        <div class="dur">${escapeHtml(s.duration)}</div>
        <button type="button" class="delBtn" data-del="${escapeHtml(s.id)}">🗑</button>
      </div>
    </div>
    <div class="name">${escapeHtml(s.eventName)}</div>
  </div>
`;


  const renderHistory = (sessions, filterDate = "") => {
    $history.empty();

    const filtered = filterDate
      ? sessions.filter((s) => s.date === filterDate)
      : sessions;

    if (filtered.length === 0) {
      $history.append(`<div class="empty">No sessions recorded yet</div>`);
    } else {
      filtered.forEach((s) => $history.append(buildItem(s)));
    }

    renderStats(sessions);
  };

  const refresh = () => {
    const sessions = loadSessions();
    renderHistory(sessions, $filterDate.val());
  };
  // Delete ONE session (event delegation)
$history.off("click", ".delBtn").on("click", ".delBtn", function (e) {
  e.preventDefault();
  e.stopPropagation();

  const id = $(this).data("del");
  if (!id) return;

  const sessions = loadSessions();
  const updated = sessions.filter((s) => s.id !== id);
  saveSessions(updated);
  renderHistory(updated, $filterDate.val());
  showToast("Session deleted");
});
// Clear ALL history
$clearAll.off("click").on("click", function (e) {
  e.preventDefault();

  // Optional confirm (recommended for safety)
  const ok = confirm("Clear all saved sessions? This cannot be undone.");
  if (!ok) return;

  saveSessions([]);
  renderHistory([], $filterDate.val());
  showToast("All sessions cleared");
});


  // --- Filter ---
  $filterDate.on("change", refresh);
  $clearFilter.on("click", function () {
    $filterDate.val("");
    refresh();
  });

  // --- Modal ---
  $modalClose.on("click", closeModal);
  $modalBack.on("click", function (e) {
    if (e.target === this) closeModal();
  });

  // --- Controls ---
  $start.off("click").on("click", function (e) {
    e.preventDefault();
    if (isRunning || isSaving) return;

    const okD = validateDate(true);
    const okN = validateName(true);
    if (!(okD && okN)) return;

    isRunning = true;
    isPaused = false;

    setInputsDisabled(true);

    $start.prop("disabled", true);
    $pause.prop("disabled", false).text("Pause");
    $stop.prop("disabled", false);

    startInterval();
    showToast("Timer started");
  });

  $pause.off("click").on("click", function (e) {
    e.preventDefault();
    if (!isRunning || isSaving) return;

    if (!isPaused) {
      isPaused = true;
      stopInterval();
      $pause.text("Resume");
      showToast("Paused");
    } else {
      isPaused = false;
      startInterval();
      $pause.text("Pause");
      showToast("Resumed");
    }
  });

  // IMPORTANT: Prevent double-save
  $stop.off("click").on("click", async function (e) {
    e.preventDefault();
    e.stopPropagation();

    if (!isRunning || isSaving) return;
    isSaving = true;

    // disable instantly to prevent double clicks
    $stop.prop("disabled", true);
    $pause.prop("disabled", true);

    try {
      stopInterval();
      isRunning = false;
      isPaused = false;

      const sessionObj = {
        id: (crypto.randomUUID ? crypto.randomUUID() : String(Date.now())),
        date: $date.val(),
        eventName: $name.val().trim(),
        duration: formatTime(totalSeconds),
      };

      const sessions = await saveSessionAsync(sessionObj);

      setInputsDisabled(false);

      $start.prop("disabled", false);
      $pause.text("Pause").prop("disabled", true);
      $stop.prop("disabled", true);

      openModal(
        `Saved "${sessionObj.eventName}" on ${sessionObj.date} for ${sessionObj.duration}.`
      );
      showToast("Session saved");

      renderHistory(sessions, $filterDate.val());

      // Reset timer after save (common UX; allowed)
      totalSeconds = 0;
      updateDisplay();
    } finally {
      isSaving = false;
    }
  });

  $reset.off("click").on("click", function (e) {
    e.preventDefault();

    stopInterval();
    totalSeconds = 0;
    updateDisplay();

    isRunning = false;
    isPaused = false;
    isSaving = false;

    setInputsDisabled(false);

    $start.prop("disabled", false);
    $pause.prop("disabled", true).text("Pause");
    $stop.prop("disabled", true);

    showToast("Reset to 00:00:00");
  });

  // --- Init ---
  $date.val(todayISO());
  $dateErr.hide();
  $nameErr.hide();
  updateDisplay();
  refresh();
});
