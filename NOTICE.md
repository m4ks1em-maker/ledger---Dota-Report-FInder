# Third-party notices

- **d3nd3/dota-report-timestamps** (MIT): the replay parser (`server.exe`, `bot.exe`) and the original web UI
  that `static/` is derived from. https://github.com/d3nd3/dota-report-timestamps
  DotaTraker ships its own build of the engine (branch `engine`), compiled with dotabuff/manta v1.5.1.
- **dotabuff/manta** (MIT): the Dota 2 replay parser inside both engines (v1.5.1 in `server.exe`, v1.5.2+ commit d4e4647 in `dtparse.exe`). https://github.com/dotabuff/manta
- `dtparse.exe` is DotaTraker's own replay engine (reports, chat, events, wards); since 2.25.0 it does the replay analysis, `server.exe` keeps the Steam and replay-folder features.
- **seek-bzip** 2.0.0 (MIT, C. Scott Ananian, Eli Skeggs): `gate/vendor/seek-bzip/`, used to unpack replays. Its license is in that folder.
- Hero portraits are Valve's and come with the engine release.
- **Chart.js** 4.4.0 (MIT): `static/vendor/chart.umd.min.js`, licence next to it.
- **Manrope, Unbounded, JetBrains Mono** (SIL Open Font License): `static/fonts/`, licences next to the files.
