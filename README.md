# Environment

| Item             | Description           |
|------------------|-----------------------|
| Node.js Version  | 14.17.0               |
| Browser          | Chrome 106.0.5249.119 |
| Operating System | macOS 12.3.1          |
| IMAP Server      | GMX                   |


| Computer Architecture | Description                  |
|-----------------------|------------------------------|
| Model Identifier      | MacBook Pro 14.1             |
| Processor Name        | Intel Core i5                |
| GPU                   | Intel Iris Plus Graphics 640 |

# How to Test
1. Input the server information, including email address and application passwords, in `server/serverInfo.json` and `client/src/code/config.ts`.
2. In `client/package.json`, run `build`
3. In `server/package.json`, run `compile`
4. In browser, access `http://localhost:80`

I tested each function following the functions in `client/src/code/state.ts`. Apart from checking the server log and the client side web page, I checked my Gmail and GMX to confirm the outcomes.

# How AJAX helps
AJAX allows the website to update only a part of the page, not the entire one, and as a result, to transmit data in pieces, not loading entire pages from the server. Therefore, AJAX reduces the load on the server and improves the processing speed.

# Additional Features
## Move Message
I added the feature of moving a message from a mailbox to another. A select component in Material UI is used. The current mailbox will not appear in the list.

## Sort messages with date
In the message list, the email messages are sorted with the latest ones go first.
