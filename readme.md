# TitsEdJS

## History

So they changed TiTs from Flash to HTML/JS. This has made a lot of people very
angry and been widely regarded as a bad move. However personally, I think it was
a great move.

However I do not really play TiTs much, and I gave my previous editor TiTsEd
over to someone else to manage since I have no interest in doing so myself.

However there has been much complaint about a lack of an editor, and I get
messages from time to time about adapting TiTsEd to work with the new JS based
TiTs.

This I consider to be a terrible idea, since the platform TiTsEd was built
upon is rather niche (Windows, so maybe not so niche) and has been a great
source of annoyance to me for many years and people have contacted me regularly
over it not working on thier old Amiga or some such.

## How to use this tool?

Good question! It's not very straight forward unfortuantely. I'm working on the
problem, but there is no simple solution due to XSS security.

For the moment you can simply copy and paste the following into your browsers
javscript console while playing TiTs.

`(function(){var s=document.createElement("script");s.src="https://chase-san.github.io/TiTsEdJS/titsed.js";document.head.appendChild(s)})()`

On chrome, if you type in `javascript:` and then paste the previous after it in
the address bar to get the same result. Browsers automatically remove
`javascript:` when pasted, SO YOU MUST TYPE IT MANUALLY!

After that it's fairly straight forward, and if you don't understand it, it's
really not my problem. Why is that you ask? That is due to the fancy disclaimer
that follows.

## Disclaimer
This software is provided 'as-is', without any express or implied
warranty. In no event will the authors be held liable for any damages
arising from the use of this software.

See the License for more details.

# Changelog
- v0.5 - 2022-09-06
  - Added additional tail options
  - Added firefox extension (pending)
- v0.4 - 2022-09-05
  - Removed Save/Load function, now performs edits live
  - Add breast/cock/vagina add/remove functions (required the above).
- v0.3 - 2022-07-18
  - Added cheat mode toggle
  - Streamlined code injection slightly
- v0.2 - 2022-07-17
  - Added Stats
  - Added flag editing
- v0.1 - 2022-07-17
  - Changed background and added scrollbars
  - Added ability to hide the editor
- PoC - 2022-07-16
  - Initial release
