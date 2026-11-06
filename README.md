# DotaTraker engine

Binaries DotaTraker downloads into its `engine` folder (see `engineRev` in package.json on main).

- `dtparse.exe` - DotaTraker's own replay engine (since rev 6): reports, scoreboard use, chat, events, wards. Built with dotabuff/manta.
- `server.exe`, `bot.exe` - the original engine (d3nd3/dota-report-timestamps, MIT), kept for the Steam and replay-folder features.
