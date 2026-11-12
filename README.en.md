<p align="center"><a href="README.md">Русский</a> &nbsp;·&nbsp; <b>English</b></p>

<p align="center">
  <img src="docs/hero.en.jpg?v=5" alt="DotaTraker — who reported whom in your Dota 2 matches" width="100%">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-2.45.2-c7a05a?style=flat-square" alt="Version">
  <img src="https://img.shields.io/badge/platform-Windows-2d2d2d?style=flat-square&logo=windows&logoColor=white" alt="Windows">
  <img src="https://img.shields.io/badge/engine-own%20·%20Go%20·%20manta-00ADD8?style=flat-square&logo=go&logoColor=white" alt="Own Go engine">
  <img src="https://img.shields.io/badge/design-Dota%202%20client-c7a05a?style=flat-square" alt="Dota 2 client design">
  <img src="https://img.shields.io/badge/app-Windows%2010%20·%2011-2AABEE?style=flat-square" alt="Windows 10 and 11 app">
  <a href="https://github.com/m4ks1em-maker/ledger---Dota-Report-FInder/stargazers"><img src="https://img.shields.io/github/stars/m4ks1em-maker/ledger---Dota-Report-FInder?style=flat-square&color=ffd77a&label=stars" alt="Stars"></a>
</p>

<p align="center">
  <a href="https://t.me/m4ks1em"><img src="https://img.shields.io/badge/Buy_a_key-@m4ks1em-2AABEE?style=for-the-badge&logo=telegram&logoColor=white" alt="Buy a key on Telegram"></a>
  &nbsp;
  <a href="https://github.com/m4ks1em-maker/ledger---Dota-Report-FInder/releases/latest/download/DotaTraker-Setup.exe"><img src="https://img.shields.io/badge/Download_for_Windows-DotaTraker--Setup.exe-ecc96c?style=for-the-badge&logo=windows&logoColor=black" alt="Download DotaTraker for Windows"></a>
</p>

<p align="center"><i>Star the repo if it helped — it makes the project easier to find.</i></p>

---

<h3 align="center">Who reported whom in your matches — and why we think so</h3>
<p align="center"><sub>Open a replay and see who complained about whom and when, what went on in chat, who was flaming, where the wards were and how the game went. Everything runs on your PC: no console, no risk to your account.</sub></p>

<table align="center">
<tr>
<td align="center" width="25%">🎯<br><b>Reports with a reason</b><br><sub>Sure · Likely · Possible</sub></td>
<td align="center" width="25%">⚡<br><b>Own engine</b><br><sub>a replay in 1–2 seconds</sub></td>
<td align="center" width="25%">🗺️<br><b>The match on a real map</b><br><sub>kills, wards, smokes, scans, fights</sub></td>
<td align="center" width="25%">💬<br><b>Global chat</b><br><sub>with subscription badges</sub></td>
</tr>
</table>

---

## 🎬 Demo

<p align="center">
  <img src="docs/demo.gif?v=5" alt="DotaTraker demo: sign in, home, replays, match, reports, map, chat" width="92%">
</p>

## 🖥️ The Windows app

<p align="center">
  <img src="docs/app.en.jpg?v=1" alt="DotaTraker home screen: last match, reports on you, recent matches, key days left" width="92%">
</p>

- **One installer, no Node.js.** Download, install, enter your key. The key is remembered until it runs out.
- **Breakdown right after the match.** Dota tells the app the game is over; a minute later you get a notification with how many reports landed on you and when.
- **Updates itself.** New versions install without reinstalling.
- **Tray, autostart, key expiry reminder, Discord status.**

<p align="center"><a href="https://github.com/m4ks1em-maker/ledger---Dota-Report-FInder/releases/latest/download/DotaTraker-Setup.exe"><img src="https://img.shields.io/badge/Download_DotaTraker-for_Windows-ecc96c?style=for-the-badge&logo=windows&logoColor=black" alt="Download DotaTraker"></a></p>

## 🆕 What's new

**2.40 — home screen and a breakdown right after the match.** The Windows app now has its own home screen: your last match and how many reports landed on you, recent matches, days left on your key. Dota tells the app when the match is over (add the launch option `-gamestateintegration`) and a notification with your reports arrives a minute or two later. A reminder 3 days before the key runs out, one-click app updates, Discord status.

**2.39 — a Windows app.** DotaTraker installs with one installer and opens in its own window: no Node.js, no start.bat, no browser tab. You enter the key once and it is remembered until it runs out; then the app brings you back to the key screen by itself. It sits in the tray, checks matches in the background and shows a Windows notification when someone reports you.

**2.37 — scans, smokes and glyphs.** The engine sees who scanned and where, who used a smoke and whom it covered, who pressed the glyph. On the map a scan is a radar circle exactly where it landed, a smoke is a cloud with the heroes inside, towers under a glyph glow. Playback is real time now: 1× is game speed, then 2×, 4×, 8×, 16×, 32×.

**2.36 — looks like the Dota 2 client.** Near-black panels in bronze frames with gold corners, uppercase headings, gold buttons, flat tabs with a gold underline, a solid top bar like in the game.

**2.35 — the real Dota map.** The minimap comes straight from the game files; towers, barracks and Ancients stand where they really are and fall the second they fell in the match.

**2.32–2.34 — the match on a map.** Hero deaths flash where they happened, a live feed of the whole match on the right (kills, chat, wards, objectives), teamfights with jump-to-next, ward vision, player focus, a gold and XP lead strip. A new Player tab with a profile card and every match.

**2.30 — fully own engine and a new chat.** The old engine is gone: Steam, the Game Coordinator, replay downloads and history run on DotaTraker's own code. The global chat shows who is online, grouped by role with role medals.

**2.28 — free trial.** No key yet? Sign in through Steam and press "Try it free": 2 replays a day, you see when and from which team you were reported. Who did it opens with a key.

## 🔍 How DotaTraker finds reports

Valve never writes into a replay whom a player reported. And since recent patches Dota no longer saves mouse movement while a player has the scoreboard open, so the old "cursor detectors" see nothing.

DotaTraker uses what the replay still has: every scoreboard look (who, when, how long, mouse moving or not), chat, deaths and kills, players leaving. From that each report gets a level and the reason behind it:

| Level | When |
|---|---|
| 🟢 **Sure** | the player said it in chat ("reported", "report pudge") and opened the scoreboard |
| 🟡 **Likely** | opened the scoreboard with the mouse moving right after a death, flame or a call to report |
| ⚪ **Possible** | only a long look at the scoreboard with the mouse moving; listed apart and not counted |

<p align="center">
  <img src="docs/moments.en.jpg?v=5" alt="Reports with levels and reasons" width="92%">
</p>

> [!NOTE]
> Reports sent from the post-game screen are not in the replay at all — no tool can see them.

## 📸 What it looks like

| Home | Replays |
|---|---|
| <img src="docs/home.en.jpg?v=5" alt="Home: player lookup, last match with hero art, numbers"> | <img src="docs/replays.jpg?v=5" alt="Replays: hero, result, K/D/A and reports in every row"> |
| **Match: verdict & numbers** | **Match map: fights & feed** |
| <img src="docs/matches.en.jpg?v=5" alt="Match: verdict with hero art, duration, winner, date, score"> | <img src="docs/wards.en.jpg?v=5" alt="The real Dota map: deaths, wards, towers, fights, live match feed, gold lead"> |
| **Smokes, scans & glyphs** | **Stats** |
| <img src="docs/events.en.jpg?v=5" alt="A scan on the map and the Smokes & scans feed: who smoked, who scanned, who pressed the glyph"> | <img src="docs/stats.jpg?v=5" alt="Stats across every analysed match"> |
| **Global chat** | **Sign in** |
| <img src="docs/chat.jpg?v=5" alt="Global chat with subscription badges"> | <img src="docs/login.jpg?v=5" alt="Sign in: Steam and key"> |

## ⚡ Features

<table>
<tr><td width="50%" valign="top">

**Reports**
- Who reported whom and at what minute, with a level and a reason
- Incoming and outgoing, a separate "Possible" list
- Match verdict, from "clean" to "toxic"
- Scoreboard tab: who looked when; report-like looks get a gold frame

</td><td width="50%" valign="top">

**The match and more**
- The match on the real Dota map: deaths, wards with vision, towers and barracks, scans, smokes, glyphs, teamfights, a live feed of the whole match, gold and XP lead, real-time playback (1×–32×)
- Match chat with toxicity highlights and chat wheel
- Stats across all matches, a profile with achievements
- Player lookup by Steam ID, auto-sync, CSV / JSON export, global chat

</td></tr>
</table>

## 🚀 Getting started

**Easiest — the Windows app:** [download DotaTraker-Setup.exe](https://github.com/m4ks1em-maker/ledger---Dota-Report-FInder/releases/latest/download/DotaTraker-Setup.exe), install it and enter your key. It downloads and updates everything else by itself.

Or the old way, in the browser:

1. Install [Node.js](https://nodejs.org) (LTS).
2. [Download the ZIP](https://github.com/m4ks1em-maker/ledger---Dota-Report-FInder/archive/refs/heads/main.zip) and unpack it.
3. Run `setup.bat` once, then `start.bat`.
4. Sign in through Steam (the official steamcommunity.com page) and enter your key — or press "Try it free": 2 replays a day without a key.

> [!TIP]
> Offline, DotaTraker keeps working for up to 3 days: the key is checked now and then, not on every start.

## 💳 Pricing

| Period | Price |
|---|---|
| 7 days | $1 |
| 30 days | $2 |
| 90 days | $5 |
| 1 year | $15 |
| **Forever** | **$30** |

Keys are sold on Telegram: [@m4ks1em](https://t.me/m4ks1em). One key works on one computer.

## 🔒 Safe by design

- Sign-in goes through the **official Steam site** (OpenID). DotaTraker gets only your public Steam ID and never sees your password or Guard code.
- Replays are processed on your PC; only the key check goes online.
- The app never touches the game or the Dota client — it only reads finished replays (`.dem`).
- The app's code is in this repository; the replay engine ships as a compiled file on the `engine` branch.

## 🔄 Updates

When a new version is out, the app shows a "DotaTraker … is out" bar. "Update now" downloads it from GitHub and restarts the app; a new engine, if there is one, downloads by itself. Your key, settings and replays stay where they are. Full list of changes: [CHANGELOG.md](CHANGELOG.md).

## ❓ FAQ

<details>
<summary><b>Can I get banned?</b></summary><br>
No. DotaTraker does not touch the game or the Dota client. It reads finished replays (<code>.dem</code>) — the same files anyone can get from Valve's servers.
</details>

<details>
<summary><b>Why does a report say "Likely" and not "Sure"?</b></summary><br>
Because Valve does not save whom a player reported. "Sure" is used only when the player said it in chat. The rest is worked out from behaviour: the scoreboard opened right after a death, flame or a call to report. Every row says what the call is based on and who else it might have been.
</details>

<details>
<summary><b>Can it see reports sent after the game?</b></summary><br>
No. The post-game screen is not recorded in the replay, so nobody can see those.
</details>

<details>
<summary><b>Do I need my Steam password?</b></summary><br>
No. Sign-in uses Steam's official OpenID on steamcommunity.com. The app only sees your public Steam ID.
</details>

<details>
<summary><b>The replay is gone from Valve's servers. What now?</b></summary><br>
Drop the <code>.dem</code> file on the page — DotaTraker parses it locally.
</details>

## 👤 Author

**DotaTraker** is created and maintained by **Max** — [@m4ks1em](https://t.me/m4ks1em) · [GitHub](https://github.com/m4ks1em-maker).
Design, the replay engine, key server, Steam sign-in, global chat and updates are his work.

<sub>© 2026 Maks (m4ks1em). All rights reserved. Third-party components and their licences: [NOTICE.md](NOTICE.md).</sub>
