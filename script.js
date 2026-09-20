/* =========================================================
   DONG
   Charging Display
   ========================================================= */


/* ---------- ELEMENTS ---------- */

const clockElement =
    document.getElementById("clock");

const dateElement =
    document.getElementById("date");

const batteryElement =
    document.getElementById("batteryPercent");

const chargingScreen =
    document.getElementById("chargingScreen");

const musicPlayer =
    document.getElementById("musicPlayer");

const settingsButton =
    document.getElementById("settingsButton");

const settingsPanel =
    document.getElementById("settingsPanel");

const closeSettings =
    document.getElementById("closeSettings");

const formatToggle =
    document.getElementById("formatToggle");

const batteryToggle =
    document.getElementById("batteryToggle");

const dateToggle =
    document.getElementById("dateToggle");

const playButton =
    document.getElementById("playButton");

const previousButton =
    document.getElementById("previousButton");

const nextButton =
    document.getElementById("nextButton");


/* ---------- SETTINGS ---------- */

let settings = {

    clockStyle: "digital",

    theme: "amoled",

    twentyFourHour: true,

    showBattery: true,

    showDate: true

};


/* ---------- LOAD SETTINGS ---------- */

function loadSettings() {

    try {

        const saved =
            localStorage.getItem("dongSettings");

        if (saved) {

            settings =
                {
                    ...settings,
                    ...JSON.parse(saved)
                };

        }

    } catch (error) {

        console.log(
            "Dong: Could not load settings."
        );

    }

    applySettings();

}


/* ---------- SAVE SETTINGS ---------- */

function saveSettings() {

    try {

        localStorage.setItem(
            "dongSettings",
            JSON.stringify(settings)
        );

    } catch (error) {

        console.log(
            "Dong: Could not save settings."
        );

    }

}


/* ---------- CLOCK ---------- */

function updateClock() {

    const now = new Date();

    let hours =
        now.getHours();

    const minutes =
        now.getMinutes();

    const seconds =
        now.getSeconds();


    if (!settings.twentyFourHour) {

        hours =
            hours % 12 || 12;

    }


    const hourText =
        String(hours).padStart(2, "0");

    const minuteText =
        String(minutes).padStart(2, "0");


    /*
        Main clock intentionally shows
        hours and minutes only.
    */

    clockElement.textContent =
        `${hourText}:${minuteText}`;


    updateDate(now);

}


/* ---------- DATE ---------- */

function updateDate(date) {

    const options = {

        weekday: "short",

        day: "numeric",

        month: "short"

    };


    dateElement.textContent =
        date.toLocaleDateString(
            undefined,
            options
        );

}


/* ---------- BATTERY ---------- */

async function updateBattery() {

    /*
        Browser battery API is not available
        on every browser.

        If unavailable, we keep the
        default value.
    */

    if (!("getBattery" in navigator)) {

        return;

    }


    try {

        const battery =
            await navigator.getBattery();


        function refreshBattery() {

            const percentage =
                Math.round(
                    battery.level * 100
                );

            batteryElement.textContent =
                `${percentage}%`;

        }


        refreshBattery();


        battery.addEventListener(
            "levelchange",
            refreshBattery
        );


    } catch (error) {

        console.log(
            "Dong: Battery information unavailable."
        );

    }

}


/* ---------- CHARGING STATUS ---------- */

async function detectCharging() {

    if (!("getBattery" in navigator)) {

        return;

    }


    try {

        const battery =
            await navigator.getBattery();


        function updateCharging() {

            const status =
                document.querySelector(
                    ".charging-status span:last-child"
                );


            if (status) {

                status.textContent =
                    battery.charging
                        ? "Charging"
                        : "Not charging";

            }

        }


        updateCharging();


        battery.addEventListener(
            "chargingchange",
            updateCharging
        );


    } catch (error) {

        console.log(
            "Dong: Charging state unavailable."
        );

    }

}


/* ---------- SETTINGS ---------- */

function applySettings() {


    /* CLOCK STYLE */

    chargingScreen.classList.remove(
        "clock-minimal",
        "clock-outline"
    );


    if (
        settings.clockStyle ===
        "minimal"
    ) {

        chargingScreen.classList.add(
            "clock-minimal"
        );

    }


    if (
        settings.clockStyle ===
        "outline"
    ) {

        chargingScreen.classList.add(
            "clock-outline"
        );

    }


    /* THEME */

    document.body.classList.remove(
        "light"
    );


    if (
        settings.theme ===
        "light"
    ) {

        document.body.classList.add(
            "light"
        );

    }


    /* BATTERY */

    batteryElement.style.display =
        settings.showBattery
            ? ""
            : "none";


    /* DATE */

    dateElement.style.display =
        settings.showDate
            ? ""
            : "none";


    /* FORMAT */

    formatToggle.textContent =
        settings.twentyFourHour
            ? "ON"
            : "OFF";


    formatToggle.classList.toggle(
        "active",
        settings.twentyFourHour
    );


    /* BATTERY TOGGLE */

    batteryToggle.textContent =
        settings.showBattery
            ? "ON"
            : "OFF";


    batteryToggle.classList.toggle(
        "active",
        settings.showBattery
    );


    /* DATE TOGGLE */

    dateToggle.textContent =
        settings.showDate
            ? "ON"
            : "OFF";


    dateToggle.classList.toggle(
        "active",
        settings.showDate
    );


    /* OPTION BUTTONS */

    document.querySelectorAll(
        "[data-clock]"
    ).forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.clock ===
            settings.clockStyle
        );

    });


    document.querySelectorAll(
        "[data-theme]"
    ).forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.theme ===
            settings.theme
        );

    });


    saveSettings();

    updateClock();

}


/* ---------- CLOCK OPTIONS ---------- */

document.querySelectorAll(
    "[data-clock]"
).forEach(button => {

    button.addEventListener(
        "click",
        () => {

            settings.clockStyle =
                button.dataset.clock;

            applySettings();

        }
    );

});


/* ---------- THEME OPTIONS ---------- */

document.querySelectorAll(
    "[data-theme]"
).forEach(button => {

    button.addEventListener(
        "click",
        () => {

            settings.theme =
                button.dataset.theme;

            applySettings();

        }
    );

});


/* ---------- FORMAT ---------- */

formatToggle.addEventListener(
    "click",
    () => {

        settings.twentyFourHour =
            !settings.twentyFourHour;

        applySettings();

    }
);


/* ---------- BATTERY ---------- */

batteryToggle.addEventListener(
    "click",
    () => {

        settings.showBattery =
            !settings.showBattery;

        applySettings();

    }
);


/* ---------- DATE ---------- */

dateToggle.addEventListener(
    "click",
    () => {

        settings.showDate =
            !settings.showDate;

        applySettings();

    }
);


/* ---------- SETTINGS OPEN ---------- */

settingsButton.addEventListener(
    "click",
    () => {

        settingsPanel.classList.add(
            "open"
        );

    }
);


/* ---------- SETTINGS CLOSE ---------- */

closeSettings.addEventListener(
    "click",
    () => {

        settingsPanel.classList.remove(
            "open"
        );

    }
);


/* ---------- MUSIC DEMO ---------- */

/*
    For now this is a UI demonstration.

    Real Android music detection will be
    implemented in the native Android
    version of Dong.

    The GitHub Pages version cannot
    automatically control another app's
    music player.
*/


let isPlaying = false;


playButton.addEventListener(
    "click",
    () => {

        isPlaying =
            !isPlaying;


        playButton.textContent =
            isPlaying
                ? "Ⅱ"
                : "▶";

    }
);


previousButton.addEventListener(
    "click",
    () => {

        console.log(
            "Dong: Previous track"
        );

    }
);


nextButton.addEventListener(
    "click",
    () => {

        console.log(
            "Dong: Next track"
        );

    }
);


/* ---------- INITIALIZE ---------- */

loadSettings();

updateClock();

updateBattery();

detectCharging();


/* ---------- CLOCK REFRESH ---------- */

setInterval(
    updateClock,
    1000
);
