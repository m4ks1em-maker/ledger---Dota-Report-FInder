# DotaTraker engine

Binaries DotaTraker downloads into its `engine` folder (see `engineRev` in package.json on main).

- `dtparse.exe` - DotaTraker's replay engine: reports, scoreboard use, chat, events, wards, hero deaths with positions. Built with dotabuff/manta. Opens replays only with an access ticket from the DotaTraker key server.
- `dtbot.exe` - DotaTraker's Steam / Dota 2 Game Coordinator helper (Steam sign-in, match history, replay addresses, conduct scorecard). Built with paralin/go-steam and paralin/go-dota2.

Since engine rev 8 the original engine (server.exe, bot.exe) is no longer used.
