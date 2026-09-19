/* =========================================
   DONG — MINIMAL CHARGING SCREEN
   ========================================= */

:root {
  --bg: #000000;
  --text: #f5f5f7;
  --muted: #8c8c96;
  --purple: #b98cff;
  --purple-soft: #8d5cff;
  --green: #5cff8a;
  --card: rgba(255, 255, 255, 0.055);
  --border: rgba(255, 255, 255, 0.08);
}


/* -----------------------------------------
   RESET
   ----------------------------------------- */

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

body {
  background: var(--bg);
  color: var(--text);
  font-family:
    Inter,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    Arial,
    sans-serif;

  -webkit-font-smoothing: antialiased;
}


/* -----------------------------------------
   MAIN SCREEN
   ----------------------------------------- */

.charging-screen {
  position: relative;

  width: 100%;
  height: 100dvh;

  min-height: 100vh;

  display: flex;
  flex-direction: column;

  padding:
    max(24px, env(safe-area-inset-top))
    24px
    max(24px, env(safe-area-inset-bottom));

  background:
    radial-gradient(
      circle at 50% 72%,
      rgba(125, 70, 255, 0.16),
      transparent 35%
    ),
    #000000;

  overflow: hidden;
}


/* -----------------------------------------
   TOP STATUS
   ----------------------------------------- */

.top-status {
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 13px;
  font-weight: 500;

  color: var(--muted);
}

.charging-status {
  display: flex;
  align-items: center;
  gap: 6px;
}

.bolt {
  color: var(--green);
  font-size: 20px;
  line-height: 1;
}

.battery {
  color: var(--text);
}


/* -----------------------------------------
   CLOCK
   ----------------------------------------- */

.clock-section {
  flex: 1;

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  text-align: center;

  transform: translateY(-2%);
}

.clock {
  font-size: clamp(92px, 27vw, 190px);

  line-height: 0.84;

  font-weight: 300;

  letter-spacing: -0.07em;

  color: var(--text);

  user-select: none;

  text-shadow:
    0 0 35px rgba(185, 140, 255, 0.10);
}

.date {
  margin-top: 28px;

  font-size: 15px;

  font-weight: 400;

  letter-spacing: 0.02em;

  color: var(--muted);
}


/* -----------------------------------------
   MUSIC PLAYER
   ----------------------------------------- */

.music-player {
  width: 100%;
  max-width: 420px;

  margin: 0 auto 20px;

  padding: 16px;

  display: grid;

  grid-template-columns:
    58px
    1fr;

  column-gap: 14px;

  border-radius: 20px;

  background: var(--card);

  border: 1px solid var(--border);

  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);

  animation: playerAppear 350ms ease;
}

.hidden {
  display: none;
}


/* Album art */

.album-art {
  width: 58px;
  height: 58px;

  border-radius: 14px;

  background:
    radial-gradient(
      circle at 65% 35%,
      #c58aff,
      transparent 25%
    ),
    linear-gradient(
      145deg,
      #21113d,
      #07070b
    );

  position: relative;

  overflow: hidden;
}

.album-glow {
  position: absolute;

  width: 80px;
  height: 80px;

  left: -20px;
  bottom: -40px;

  border-radius: 50%;

  background: var(--purple);

  filter: blur(22px);

  opacity: 0.55;
}


/* Song information */

.song-info {
  min-width: 0;

  align-self: center;
}

.song-title {
  font-size: 15px;

  font-weight: 500;

  white-space: nowrap;

  overflow: hidden;

  text-overflow: ellipsis;
}

.artist {
  margin-top: 4px;

  font-size: 12px;

  color: var(--muted);
}


/* Progress */

.progress-area {
  grid-column: 1 / -1;

  margin-top: 14px;
}

.progress-bar {
  width: 100%;
  height: 3px;

  border-radius: 10px;

  background: rgba(255, 255, 255, 0.12);

  overflow: hidden;
}

.progress {
  width: 36%;
  height: 100%;

  border-radius: inherit;

  background: var(--purple);
}

.progress-time {
  display: flex;

  justify-content: space-between;

  margin-top: 6px;

  font-size: 10px;

  color: var(--muted);
}


/* Player controls */

.player-controls {
  grid-column: 1 / -1;

  display: flex;

  justify-content: center;

  align-items: center;

  gap: 38px;

  margin-top: 10px;
}

.player-controls button {
  width: 36px;
  height: 36px;

  border: none;

  background: transparent;

  color: var(--text);

  font-size: 25px;

  cursor: pointer;

  display: grid;
  place-items: center;
}

.player-controls .play-button {
  width: 46px;
  height: 46px;

  border-radius: 50%;

  background: var(--text);

  color: #000;

  font-size: 16px;
}


/* -----------------------------------------
   BOTTOM
   ----------------------------------------- */

.bottom-message {
  text-align: center;

  font-size: 11px;

  letter-spacing: 0.16em;

  text-transform: uppercase;

  color: rgba(255, 255, 255, 0.28);

  padding-top: 8px;
}


/* -----------------------------------------
   ANIMATION
   ----------------------------------------- */

@keyframes playerAppear {
  from {
    opacity: 0;
    transform: translateY(12px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}


/* -----------------------------------------
   SMALL SCREENS
   ----------------------------------------- */

@media (max-width: 360px) {

  .charging-screen {
    padding-left: 18px;
    padding-right: 18px;
  }

  .clock {
    font-size: 88px;
  }

  .date {
    margin-top: 22px;
  }

}


/* -----------------------------------------
   LANDSCAPE
   ----------------------------------------- */

@media (orientation: landscape) {

  .charging-screen {
    padding:
      max(16px, env(safe-area-inset-top))
      max(24px, env(safe-area-inset-right))
      max(16px, env(safe-area-inset-bottom))
      max(24px, env(safe-area-inset-left));
  }

  .clock-section {
    transform: translateY(0);
  }

  .clock {
    font-size: min(22vh, 150px);
  }

  .date {
    margin-top: 12px;
  }

  .music-player {
    max-width: 480px;
    margin-bottom: 10px;
  }

}
