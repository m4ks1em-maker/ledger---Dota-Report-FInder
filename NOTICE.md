# Third-party notices

- **DotaTraker engine** (`engine/dtparse.exe`, `engine/dtbot.exe`) is DotaTraker's own code, shipped compiled on the `engine` branch.
  - `dtparse.exe` reads replays with **dotabuff/manta** (MIT), v1.5.2+ commit d4e4647. https://github.com/dotabuff/manta
  - `dtbot.exe` talks to Steam and the Dota 2 Game Coordinator with **paralin/go-steam** (BSD-3-Clause) and **paralin/go-dota2** (MIT). https://github.com/paralin/go-steam · https://github.com/paralin/go-dota2
- **seek-bzip** 2.0.0 (MIT, C. Scott Ananian, Eli Skeggs): `gate/vendor/seek-bzip/`, used to unpack replays. Its license is in that folder.
- Hero portraits and art are Valve's, loaded from Valve's CDN.
- **Chart.js** 4.4.0 (MIT): `static/vendor/chart.umd.min.js`, licence next to it.
- **Inter Tight, Bricolage Grotesque, JetBrains Mono** (SIL Open Font License): `static/fonts/`, licences next to the files.
