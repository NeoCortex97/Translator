# Translator

Verwandelt die formatierte Eingabe in html code.

## Installation

1. Klone das Rpository, oder lade das Repository als ZIP-Datei herunter
    1. Wenn du das Repository als ZIP heruntergeladen hast, dann musst du sie entpacken, bevor du weitermachen kannst. Ich empfehle dir sie irgendwo unter `Dokumente` zu entpacken.
2. Installiere [Nodejs](https://nodejs.org/en/).
    1. Es sollte egal sein, ob du die aktuellste stabile Version, oder die LTS Version installierst. Nur ältere und prerelease Versionen solltest du vermeiden.
3. Öffne den Ordner, in dem das Repository liegt.
4. Starte die Datei `install.bat`. Daraufhin öffnet sich ein Fenster mit schwarzem Hintergrund und weißem Text. Hier läuft ein Ladebalken durch. Dieses Script läd alle Bibliotheken herunter, die benötigt werden.
    1. Wenn du MacOS, dann starte anstatt `install.bat` die Datei `install.sh`
    2. Wenn du nach einem Update Probleme hast, oder wenn du als ZIP runtergeladen hast und eine neue Version heruntergeladen hast, musst du diesen schritt nach jedem Update ausführen.
    3. Wenn du das repoitory geklont hast und es gibt nach einem update Probleme, dann wieder hole diesen Schritt ebenfalls.
    4. Sollte es bei diesem Schritt Probleme gehen, dann folge der Anleitung zum [Troubleshooting](#troubleshooting).
5. Um den Server zu starten starte die Datei `start.bat` aus.
    1. Wenn du MacOS benutzt, dann starte bitte anstatt `start.bat` die Datei `start.sh`.

## Troubleshooting

### Dein Fehler passiert beim Installieren

Wenn ín der Fehlermedung etwas von Speicher steht, dann bedeutet das wahrscheinlich, dass du nicht genug Platz auf der Festplatte hast. Die Lösung ist relativ einfach. Mach einfach ein bisschen platz auf der Festplatte, auf der das Repository liegt.

### Dein Fehler passiert beim Starten

Wenn in der Fehlermedung steht, dass der Port 1234 nicht benutzt werden kann, kannst du ihn ignorieren. Das Tool wird automatisch auf einem anderen Port gestertet und du kannst es ganz normal auf dem neuen Port benutzen.

Wenn in der Fehlermedung etwas davon steht, dass beim Bauen ein Fehler aufgetreten ist, dann kannst du die beiden Ordner `.parcel-cache` und `node_modules` löschen und Schritt 4 der Installation erneut ausführen. 

### Dein Fehler ist hier nicht aufgeführt

Öffne ein Issue, oder kontaktiere mich.