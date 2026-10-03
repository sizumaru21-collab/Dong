# ◼ DONGMIS

### Your phone.

### Your charger.

### A little less wasted screen.

<p align="center">

**A tiny Android charging companion that turns your phone into a minimal bedside / desk display.**

<br>

`TIME` · `BATTERY` · `CHARGING`

</p>

---

## `01` — THE IDEA

You plug your phone in.

DongMis takes over.

No dashboard.
No clutter.
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

## `02` — WHAT IT DOES

<table>
<tr>
<td width="50%">

### ◷ Time

A fullscreen clock designed to be readable from a distance.

**7 styles** are currently available:

`CLASSIC` · `THIN` · `BOLD`
`DIGITAL` · `GRADIENT` · `CONDENSED` · `ANALOG`

</td>
<td width="50%">

### ⚡ Charging

A custom animated charging bar gives the screen a little life without becoming distracting.

Battery percentage stays visible in real time.

</td>
</tr>
<tr>
<td>

### 🔌 Plug In

Connect your charger.

DongMis can automatically bring up the standby screen.

</td>
<td>

### 👋 Unplug

Remove the charger.

The automatic standby session closes.

</td>
</tr>
</table>

---

## `03` — THE EXPERIENCE

```text
                    CHARGER
                       │
                       ▼
                  ┌─────────┐
                  │ DongMis │
                  └────┬────┘
                       │
                       ▼
              ┌─────────────────┐
              │                 │
              │      11:42      │
              │                 │
              │  ███████████░░  │
              │       87%       │
              │        ⚡       │
              │                 │
              └─────────────────┘
                       │
                       ▼
                  UNPLUGGED
                       │
                       ▼
                   BACK TO
                    NORMAL
```

No complicated workflow.

**Plug → Display → Unplug.**

---

## `04` — UNDER THE HOOD

DongMis deliberately avoids unnecessary dependencies.

It's built with the Android platform itself.

```text
┌─────────────────────────────────────┐
│              DONGMIS                │
├─────────────────────────────────────┤
│                                     │
│  Java 17                            │
│  Android SDK 34                     │
│  Gradle 8.9                         │
│  Native Canvas rendering            │
│  Foreground Service                 │
│  BroadcastReceiver                  │
│  Custom Android Views               │
│                                     │
└─────────────────────────────────────┘
```

### No UI framework required.

The clock and charging visuals are drawn directly using Android's native graphics APIs.

That keeps DongMis:

**small · fast · dependency-light**

---

## `05` — ARCHITECTURE

```text
                         ┌──────────────┐
                         │  BOOT        │
                         └──────┬───────┘
                                │
                                ▼
                    ┌─────────────────────┐
                    │ ChargeWatcherService│
                    └──────────┬──────────┘
                               │
                        waits for
                     POWER_CONNECTED
                               │
                               ▼
                    ┌─────────────────────┐
                    │   DongMis Activity   │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
           Clock          Battery Bar       Battery %
              │                │                │
              └────────────────┼────────────────┘
                               │
                               ▼
                         POWER_DISCONNECTED
                               │
                               ▼
                            CLOSE
```

Small architecture.

Simple responsibility.

One job.

---

## `06` — CURRENT BUILD

|                          |                |
| ------------------------ | -------------- |
| **Platform**             | Android        |
| **Language**             | Java           |
| **Java Version**         | 17             |
| **Compile SDK**          | 34             |
| **Minimum SDK**          | 26             |
| **Target SDK**           | 34             |
| **Build System**         | Gradle         |
| **CI**                   | GitHub Actions |
| **Runtime Dependencies** | None           |
| **APK Target**           | `< 5 MB`       |

The GitHub Actions pipeline automatically builds the APK and checks that it remains below the 5 MB limit.

---

## `07` — PROJECT MAP

```text
DongMis
│
├── app/
│   └── src/main/
│       │
│       ├── java/com/standby/app/
│       │   ├── MainActivity.java
│       │   ├── AnalogClockView.java
│       │   ├── ChargeBarView.java
│       │   ├── ChargeWatcherService.java
│       │   └── BootReceiver.java
│       │
│       └── res/
│           ├── drawable/
│           ├── layout/
│           ├── layout-land/
│           ├── mipmap-anydpi-v26/
│           └── values/
│
├── build.gradle
├── settings.gradle
└── gradle.properties
```

---

## `08` — BUILD IT

The repository includes a GitHub Actions workflow.

Push to `main` or `master` and the project can build automatically. The workflow also supports manual execution.

```text
GitHub
   │
   ├── Push
   │
   ▼
Actions
   │
   ├── Java 17
   ├── Gradle 8.9
   ├── Android build
   ├── APK size check
   └── Release artifact
```

---

## `09` — STATUS

### `ALPHA`

The core experience is working its way toward a polished release.

```text
CLOCK                         ████████████████████  DONE
BATTERY                       ████████████████████  DONE
CHARGING ANIMATION            ████████████████████  DONE
CLOCK STYLES                  ████████████████████  DONE
PORTRAIT                      ████████████████████  DONE
LANDSCAPE                     ████████████████████  DONE
CHARGER DETECTION             ████████████████████  DONE
AUTO OPEN                     ████████████████████  DONE
DEVICE TESTING                ███████░░░░░░░░░░░░░  NEXT
POLISH                        █████░░░░░░░░░░░░░░░  NEXT
```

---

## `10` — ROADMAP

```text
NOW
│
├── Core charging display
├── Clock styles
├── Battery visualization
└── Automatic charging mode
│
▼
NEXT
│
├── Device compatibility
├── Better onboarding
├── Animation refinement
└── Visual polish
│
▼
LATER
│
├── More customization
├── More display modes
└── Release-ready packaging
```

---

## `11` — DESIGN PRINCIPLE

DongMis follows one rule:

```text
                 LESS
                  ↓
             LESS NOISE
                  ↓
             MORE FOCUS
```

Every element on the screen needs a reason to exist.

If it doesn't help the charging experience—

**it probably doesn't belong.**

---

## `12` — WHY "DONGMIS"?

Because every project needs a name that doesn't sound like another productivity SaaS.

¯\*(ツ)*/¯

---

## `13` — CONTRIBUTING

DongMis is currently a small personal project.

Ideas, improvements, bug reports, and pull requests are welcome.

If you're contributing, keep the core philosophy intact:

> **Simple first.**

---

## `14` — LICENSE

License information will be added before the first public release.

---

<br>

<p align="center">

### DONGMIS

**Plug it in. Set it down.**

`That's it.`

<br>

<sub>Built with Java · Android · a little patience</sub>

</p>
