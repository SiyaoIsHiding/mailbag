# Environment

| Item                  | Description           |
|-----------------------|-----------------------|
| Node.js Version       | 14.17.0               |
| Browser               | Chrome 106.0.5249.119 |
| Operating System      | macOS 12.3.1          |


| Computer Architecture | Description                  |
|-----------------------|------------------------------|
| Model Identifier      | MacBook Pro 14.1             |
| Processor Name        | Intel Core i5                |
| GPU                   | Intel Iris Plus Graphics 640 |

# How to Test
Run the server. Use Postman to test my codes. I test each function of my codes. Two examples of requests are listed here.
This one is to test deleting the contact of jane.
```shell
curl --location --request DELETE 'http://127.0.0.1/contacts/zKWGiKfxSAg9m5nG' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name":"jane",
    "email":"janehesiyao@gmail.com"
}'
```

This one is to test getting a message.
```shell
curl --location --request GET 'http://127.0.0.1/messages/INBOX/1'
```

In addition, I checked my emails directly on Gmail and GMX to confirm the outcome.

# How REST helps
REST API provides scalability and flexibility.
1. First, REST is stateless. That means I don't need to record the previous requests in the server. Each request is independent.
2. JSON format is easier to use and smaller in size.
In this way, REST makes the communication between client-side and server-side easy and increase the robustness in the server.

# Additional Features
## Move Message
I added the feature of move a message from a mailbox to another. A sample of usage is
```shell
curl --location --request PUT 'http://127.0.0.1/messages/INBOX/3' \
--header 'Content-Type: application/json' \
--data-raw '{
    "dest":"Spam"
}'
```
## Correction of codes
Some codes in the textbook do not compile by Typescript, probably because the recent updates of the npm package.
1. First, in `IMAP.ts`, the function `getMessageBody(inCallOptions: ICallOptions): Promise<string>`, the variable `parsed.text` is in type of `string | null`, inconsistent with the `string` type as stated in the `Promise`. I correct it to return `""` when `parsed.text` is `null`.
2. In both `Contacts.ts` function `deleteContact(inID: string): Promise<string>` and `SMTP.ts` function `public sendMessage(inOptions: SendMailOptions): Promise<string>`, the textbook's codes use `inResolve()`, which is inconsistent with `Promise<string>`. I correct them to `Promise<void>`.

