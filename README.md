# ◼ DONGMIS

<p align="center">

### Your phone. Your charger. A little less wasted screen.

**A minimal Android charging companion that turns your phone into a clean fullscreen standby display.**

<br>

`TIME` · `BATTERY` · `CHARGING`

<br><br>

<a href="YOUR_GITHUB_RELEASE_APK_LINK">
  <img src="https://img.shields.io/badge/⬇%20DOWNLOAD%20DONGMIS%20APK-5CF08F?style=for-the-badge&labelColor=111111" alt="Download DongMis APK">
</a>

<br><br>

<sub>Android 8.0+ · Lightweight · Native Android</sub>

</p>

---

## `01` — THE IDEA

You plug your phone in.

**DongMis takes over.**

No dashboard.
No feed.
No unnecessary information.

Just a clock, your battery level, and a subtle charging animation.

```text
                    11:42

             ━━━━━━━━━━━━━━━
             ████████████████
                  87% ⚡

                charging...
```

The idea is simple:

> **If your phone is sitting there doing nothing,
> make the screen worth looking at.**

---

## `02` — FEATURES

<table>
<tr>
<td width="50%">

### ◷ Minimal Clock

A fullscreen clock designed to be simple and readable.

**7 styles included:**

`CLASSIC` · `THIN` · `BOLD`

`DIGITAL` · `GRADIENT`

`CONDENSED` · `ANALOG`

</td>

<td width="50%">

### ⚡ Charging Display

A custom animated charging bar gives the screen some life without turning it into a dashboard.

Battery percentage updates while charging.

</td>
</tr>

<tr>
<td>

### 🔌 Automatic Charging Mode

Connect your charger and DongMis can automatically open the standby screen.

</td>

<td>

### 👋 Automatic Exit

Disconnect the charger and the automatically opened standby screen closes.

</td>
</tr>

<tr>
<td>

### 📱 Portrait + Landscape

Separate layouts provide a suitable display in both orientations.

</td>

<td>

### 💾 Remembers Your Style

Your selected clock style is saved and restored the next time DongMis opens.

</td>
</tr>
</table>

---

## `03` — THE EXPERIENCE

```text
                         CHARGER
                            │
                            ▼
                     ┌────────────┐
                     │   DongMis  │
                     └─────┬──────┘
                           │
                           ▼
              ┌────────────────────────┐
              │                        │
              │         11:42          │
              │                        │
              │   ████████████░░░░     │
              │          87%            │
              │           ⚡            │
              │                        │
              └────────────────────────┘
                           │
                           ▼
                       UNPLUGGED
                           │
                           ▼
                     BACK TO NORMAL
```

The whole interaction is intentionally simple:

**Plug → Display → Unplug**

---

## `04` — CLOCK STYLES

DongMis currently includes seven clock designs.

| Style       | Description                     |
| ----------- | ------------------------------- |
| `Classic`   | Clean standard typeface         |
| `Thin`      | Lightweight typography          |
| `Bold`      | Strong, high-visibility display |
| `Digital`   | Monospace digital-inspired look |
| `Gradient`  | Green-to-yellow gradient        |
| `Condensed` | Compact condensed typography    |
| `Analog`    | Custom-drawn analog clock       |

Tap the screen to cycle through the available designs.

---

## `05` — CHARGING VISUAL

The battery display isn't just a percentage.

DongMis uses a custom-drawn segmented charging bar with:

* Green → yellow progression
* Dark inactive segments
* 3D-style top and end faces
* Soft shadow
* Animated charging shine
* Smooth battery-level transitions

The visual is rendered directly using Android's `Canvas` APIs.

**No image assets are required for the charging animation.**

---

## `06` — UNDER THE HOOD

DongMis deliberately keeps the application lightweight.

```text
┌──────────────────────────────────────┐
│                DONGMIS               │
├──────────────────────────────────────┤
│                                      │
│  Java 17                             │
│  Android SDK 34                      │
│  Gradle 8.9                          │
│  Native Android Views                │
│  Android Canvas                      │
│  Foreground Service                  │
│  BroadcastReceiver                   │
│                                      │
│  Third-party runtime libraries:  0   │
│                                      │
└──────────────────────────────────────┘
```

### No UI framework required.

The clock and charging visuals are implemented using native Android drawing and views.

That keeps the core project:

**small · simple · dependency-light**

---

## `07` — HOW IT WORKS

```text
                     ┌──────────────┐
                     │  DEVICE BOOT │
                     └──────┬───────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │ ChargeWatcherService│
                 └──────────┬──────────┘
                            │
                            │ waits for
                            │ POWER_CONNECTED
                            ▼
                 ┌─────────────────────┐
                 │    MainActivity     │
                 └──────────┬──────────┘
                            │
             ┌──────────────┼──────────────┐
             ▼              ▼              ▼
          Clock        Battery Bar     Battery %
             │              │              │
             └──────────────┼──────────────┘
                            │
                            ▼
                    POWER_DISCONNECTED
                            │
                            ▼
                          CLOSE
```

The project uses a small foreground service to watch for charging events.

The main activity handles the standby display.

---

## `08` — PROJECT STRUCTURE

```text
DongMis/
│
├── .github/
│   └── workflows/
│       └── build.yml
│
├── app/
│   └── src/
│       └── main/
│           │
│           ├── java/
│           │   └── com/standby/app/
│           │       ├── MainActivity.java
│           │       ├── AnalogClockView.java
│           │       ├── ChargeBarView.java
│           │       ├── ChargeWatcherService.java
│           │       └── BootReceiver.java
│           │
│           └── res/
│               ├── drawable/
│               ├── layout/
│               ├── layout-land/
│               ├── mipmap-anydpi-v26/
│               └── values/
│
├── build.gradle
├── settings.gradle
└── gradle.properties
```

---

## `09` — TECHNICAL DETAILS

| Property             | Current configuration |
| -------------------- | --------------------- |
| Platform             | Android               |
| Language             | Java                  |
| Java                 | 17                    |
| Compile SDK          | 34                    |
| Target SDK           | 34                    |
| Minimum SDK          | 26                    |
| Build System         | Gradle                |
| Gradle               | 8.9                   |
| CI                   | GitHub Actions        |
| Runtime Dependencies | None                  |
| APK Size Requirement | `< 5 MB`              |

---

## `10` — BUILD SYSTEM

DongMis is built automatically through **GitHub Actions**.

The workflow:

```text
Git Push
   │
   ▼
GitHub Actions
   │
   ├── Checkout repository
   │
   ├── Setup Java 17
   │
   ├── Setup Gradle 8.9
   │
   ├── Assemble Debug APK
   │
   ├── Check APK size
   │
   ├── Upload APK artifact
   │
   └── Publish latest release
```

The current workflow also checks that the generated APK stays below **5 MB**.

---

## `11` — DOWNLOAD

### Latest APK

<p align="center">

<a href="YOUR_GITHUB_RELEASE_APK_LINK">
  <img src="https://img.shields.io/badge/⬇%20DOWNLOAD%20LATEST%20APK-5CF08F?style=for-the-badge&labelColor=111111" alt="Download latest DongMis APK">
</a>

<br><br>

<sub>
Download the latest APK from the project's GitHub release.
</sub>

</p>

> **Note:** Replace `YOUR_GITHUB_RELEASE_APK_LINK` with the actual APK release URL once the GitHub repository is published.

---

## `12` — INSTALLATION

1. Download the latest APK.
2. Open the APK on your Android device.
3. Allow Android to install the application if prompted.
4. Launch **DongMis**.
5. Grant the requested permissions when required.
6. Connect your charger.
7. DongMis can open the standby display automatically.

### Important

Android manufacturers can apply their own background-management rules.

Depending on the device, DongMis may require additional permission or battery-management configuration for reliable automatic behavior.

---

## `13` — PERMISSIONS

DongMis currently uses Android permissions related to:

* Foreground services
* Special-use foreground service operation
* Notifications
* Displaying over other apps
* Receiving boot completion

These are used for the application's charging detection and automatic standby behavior.

---

## `14` — COMPATIBILITY

### Minimum

**Android 8.0 / API 26**

### Current build target

**Android 14 / API 34**

Actual background-service and automatic-launch behavior can vary depending on:

* Android version
* Device manufacturer
* Battery optimization settings
* Background activity restrictions
* Overlay permissions

Testing across different devices is therefore an important part of the project.

---

## `15` — PROJECT STATUS

### `ALPHA`

The core DongMis experience is implemented.

```text
CLOCK                       ████████████████████  DONE
BATTERY                     ████████████████████  DONE
CHARGING BAR                ████████████████████  DONE
CLOCK STYLES                ████████████████████  DONE
ANALOG CLOCK                ████████████████████  DONE
PORTRAIT                    ████████████████████  DONE
LANDSCAPE                   ████████████████████  DONE
CHARGER DETECTION           ████████████████████  DONE
AUTO OPEN                   ████████████████████  DONE
AUTO CLOSE                  ████████████████████  DONE
STYLE PERSISTENCE           ████████████████████  DONE

DEVICE TESTING              ███████░░░░░░░░░░░░░  NEXT
POLISH                      █████░░░░░░░░░░░░░░░  NEXT
RELEASE PREPARATION         ███░░░░░░░░░░░░░░░░░  NEXT
```

---

## `16` — ROADMAP

```text
                    DONGMIS
                       │
                       ▼
              ┌─────────────────┐
              │     CORE        │
              │                 │
              │ Clock           │
              │ Battery         │
              │ Charging        │
              │ Auto launch     │
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │    POLISH       │
              │                 │
              │ Compatibility   │
              │ Animations      │
              │ Onboarding      │
              │ UI refinement   │
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │    RELEASE      │
              │                 │
              │ Testing         │
              │ Packaging       │
              │ Documentation   │
              └─────────────────┘
```

---

## `17` — DESIGN PHILOSOPHY

DongMis follows one rule:

```text
                       LESS
                        │
                        ▼
                   LESS NOISE
                        │
                        ▼
                    MORE FOCUS
```

Every element on the screen needs a reason to exist.

If it doesn't improve the charging experience—

**it probably doesn't belong.**

---

## `18` — WHY DONGMIS?

Because every project needs a name that doesn't sound like another productivity app.

And because:

```text
phone + charger + time
          =
       DongMis
```

¯\*(ツ)*/¯

---

## `19` — CONTRIBUTING

DongMis is currently a small personal project.

Bug reports, ideas, improvements, and pull requests are welcome.

If you're contributing, keep the core philosophy in mind:

> **Simple first.**

Avoid adding complexity unless it meaningfully improves the experience.

---

## `20` — LICENSE

License information will be added before the first public release.

---

<br>

<p align="center">

# ◼ DONGMIS

### Plug it in. Set it down.

`That's it.`

<br>

<sub>Built with Java · Android · GitHub Actions · a little patience</sub>

</p>
