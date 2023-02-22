# TiTsEdJS

TiTsEdJS is a javascript based state editor for the H-game TiTs. It is loaded into the same runtime enivornment as the game itself and edits the variables of the game in real time.

***This is NOT a save editor.*** This is an game state editor.

## History

The popular H-game TiTs made by Fenoxo (and others) changed from Flash to HTML/Javascript. This obviously changed for format of the save files to something a lot more Javascript friendly. Therefore editors that were designed to edit the saves of the original Flash versions do not work on the new version.

I do not play this game that much, but I did at one point convert a very popular editor for their previous H-game CoC to work with this new game as they used similar save formats.

However when this change occurred I often got messages and error reports that the editor no longer worked, despite me no longer being the maintainer of the TiTs Save Editor.

I personally did not want to attempt to convert it to the new format as I had no desire to install visual studio or a C# development environment. Therefore I took the path of least resistance and made an editor for HTML/Javascript, which has a very low barrier to entry, both to write and to use.

## Suggestions

I am not at this time accepting suggestions for additional content to the editor. Any suggestion made will likely be ignored. This tool is open source and you may make the modifications yourself if you wish, however I am unlikely to support these.

I also have zero interest in developing plugins for any other browser, however you are free to do so if you wish.

## How to install/activate this tool?

Using this is very simple given the very relaxed nature of Javascript (most the time). You simply need to import the script into the same runtime environment as the game, and it should be fairly self explanatory from there.

Here are a few methods to do this.

1. Use the Firefox plugin. I have released a plugin for use in firefox and only firefox. You can simply [click here to download](https://github.com/Chase-san/TiTsEdJS/releases) this plugin, or go to the releases on the sidebar.

2. You can copy and paste the following into the javascript console while playing. Some browsers prevent copy and paste into the console. You will need to disable this to use this method, or type it out by hand.

   `(function(){var s=document.createElement("script");s.src="https://chase-san.github.io/TiTsEdJS/titsed.js";document.head.appendChild(s)})()`

3. You can copy and paste the following into the URL bar of your browser. Few browsers allow this as it is a major security hole. But this method is very easy. You may be able to simply type in the `javascript:` part and paste the rest. The code is otherwise identical to that found in method 2.

   `javascript:(function(){var s=document.createElement("script");s.src="https://chase-san.github.io/TiTsEdJS/titsed.js";document.head.appendChild(s)})()`

4. You can use this in the offline version of the game as well. By using the key combination `CTRL` + `SHIFT` + `I` you will get a prompt where you can copy and paste the code from method 3 above.

Regardless of which method you use a new sidebar should pop up that you can open and close using the small arrow to the side. If you opened the console you can close it without worry of losing the editor.

## How to make edits using the tool?

After the tool is running there will be multiple options available that map directly to the values in game. Selecting and editing these values will allow you to change the indicated value in game. To view the results you will need to move to enter and exit your status screen. This is a limitation of the game itself.

## Disclaimer
This software is provided 'as-is', without any express or implied warranty. In no event will the authors be held liable for any damages arising from the use of this software.

See the License for more details.
