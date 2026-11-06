<p align="center"><a href="README.md">Русский</a> &nbsp;·&nbsp; <b>English</b></p>

<p align="center">
  <img src="docs/hero.en.jpg?v=4" alt="DotaTraker — who reported whom in your Dota 2 matches" width="100%">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-2.28.0-ffd77a?style=flat-square" alt="Version">
  <img src="https://img.shields.io/badge/platform-Windows-2d2d2d?style=flat-square&logo=windows&logoColor=white" alt="Windows">
  <img src="https://img.shields.io/badge/engine-own%20·%20Go%20·%20manta-00ADD8?style=flat-square&logo=go&logoColor=white" alt="Own Go engine">
  <img src="https://img.shields.io/badge/design-liquid%20glass-8fc7ff?style=flat-square" alt="Liquid glass">
  <img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="MIT">
  <a href="https://github.com/m4ks1em-maker/ledger---Dota-Report-FInder/stargazers"><img src="https://img.shields.io/github/stars/m4ks1em-maker/ledger---Dota-Report-FInder?style=flat-square&color=ffd77a&label=stars" alt="Stars"></a>
</p>

<p align="center">
  <a href="https://t.me/m4ks1em"><img src="https://img.shields.io/badge/Buy_a_key-@m4ks1em-2AABEE?style=for-the-badge&logo=telegram&logoColor=white" alt="Buy a key on Telegram"></a>
  &nbsp;
  <a href="https://github.com/m4ks1em-maker/ledger---Dota-Report-FInder/archive/refs/heads/main.zip"><img src="https://img.shields.io/badge/Download-ZIP-ffffff?style=for-the-badge&logo=github&logoColor=black" alt="Download ZIP"></a>
</p>

<p align="center"><i>Star the repo if it helped — it makes the project easier to find.</i></p>

---

<h3 align="center">Who reported whom in your matches — and why we think so</h3>
<p align="center"><sub>Open a replay and see who complained about whom and when, what went on in chat, who was flaming, where the wards were and how the game went. Everything runs on your PC: no console, no risk to your account.</sub></p>

<table align="center">
<tr>
<td align="center" width="25%">🎯<br><b>Reports with a reason</b><br><sub>Sure · Likely · Possible</sub></td>
<td align="center" width="25%">⚡<br><b>Own engine</b><br><sub>a replay in 1–2 seconds</sub></td>
<td align="center" width="25%">🗺️<br><b>Match flow & wards</b><br><sub>graph, map, events</sub></td>
<td align="center" width="25%">💬<br><b>Global chat</b><br><sub>with subscription badges</sub></td>
</tr>
</table>

---

## 🎬 Demo

<p align="center">
  <img src="docs/demo.gif?v=4" alt="DotaTraker demo: sign in, home, replays, match, reports, map, chat" width="92%">
</p>

## 🆕 What's new

**2.28 — free trial.** No key yet? Sign in through Steam and press "Try it free": 2 replays a day, you see when and from which team you were reported. Who did it opens with a key.

**2.27 — liquid glass.** The dark theme is rebuilt: frosted see-through cards, a blurred backdrop of the hero from your match (green after a win, red after a loss), pill-shaped menu and buttons, calmer headings. The light theme stays as it was.

**2.26 — home and replays.** Home shows your last match: hero, result, K/D/A and how many reports landed on you. The replay list shows your hero, win or loss and "clean" / "N on you" right in each row.

**2.25 — own engine.** Replays are read by DotaTraker's own engine, `dtparse` (Go + manta). It also fixes old bugs: wards have owners, event times are right even with pauses, no fake "disconnects" after the game.

## 🔍 How DotaTraker finds reports

Valve never writes into a replay whom a player reported. And since recent patches Dota no longer saves mouse movement while a player has the scoreboard open, so the old "cursor detectors" see nothing.

DotaTraker uses what the replay still has: every scoreboard look (who, when, how long, mouse moving or not), chat, deaths and kills, players leaving. From that each report gets a level and the reason behind it:

| Level | When |
|---|---|
| 🟢 **Sure** | the player said it in chat ("reported", "report pudge") and opened the scoreboard |
| 🟡 **Likely** | opened the scoreboard with the mouse moving right after a death, flame or a call to report |
| ⚪ **Possible** | only a long look at the scoreboard with the mouse moving; listed apart and not counted |

<p align="center">
  <img src="docs/moments.en.jpg?v=4" alt="Reports with levels and reasons" width="92%">
</p>

> [!NOTE]
> Reports sent from the post-game screen are not in the replay at all — no tool can see them.

## 📸 What it looks like

| Home | Replays |
|---|---|
| <img src="docs/home.en.jpg?v=4" alt="Home: player lookup, last match with hero art, numbers"> | <img src="docs/replays.jpg?v=4" alt="Replays: hero, result, K/D/A and reports in every row"> |
| **Match: verdict & match flow** | **Ward map** |
| <img src="docs/matches.en.jpg?v=4" alt="Match: verdict with hero art, stat tiles, gold graph"> | <img src="docs/wards.en.jpg?v=4" alt="Ward map with a timeline and stats"> |
| **Match events** | **Stats** |
| <img src="docs/events.en.jpg?v=4" alt="Events: first blood, Roshan, Aegis, glyphs, pauses"> | <img src="docs/stats.jpg?v=4" alt="Stats across every analysed match"> |
| **Global chat** | **Sign in** |
| <img src="docs/chat.jpg?v=4" alt="Global chat with subscription badges"> | <img src="docs/login.jpg?v=4" alt="Sign in: Steam and key"> |

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
- Match flow (gold and XP), ward map with a timeline, events
- Match chat with toxicity highlights and chat wheel
- Stats across all matches, a profile with achievements
- Player lookup by Steam ID, auto-sync, CSV / JSON export, global chat

</td></tr>
</table>

## 🚀 Getting started

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

<sub>MIT licensed. Third-party components and their licences: [NOTICE.md](NOTICE.md).</sub>
