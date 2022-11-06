const ImapClient = require("emailjs-imap-client")
import {ParsedMail} from "mailparser";
import {simpleParser} from "mailparser";
import {IServerInfo} from "./ServerInfo";

export interface ICallOptions{
    mailbox: string,
    id?: number
}

export interface IMessage {
    id: string, date: string,
    from: string,
    subject: string, body?: string
}

export interface IMailbox {
    name: string,
    path: string
}

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

export class Worker {
    private serverInfo: IServerInfo;
    constructor(inServerInfo: IServerInfo) {
        this.serverInfo = inServerInfo
    }
    private async connectToServer(): Promise<any> {
        const client: any = new ImapClient.default(
            this.serverInfo.imap.host,
            this.serverInfo.imap.port,
            {auth: this.serverInfo.imap.auth});
        client.logLevel = client.LOG_LEVEL_NONE;
        client.onerror = (inError: Error)=>{
            console.log(
                "IMAP.Worker.listMailboxes(): Connection error",
                inError
            );
        };
        await client.connect();
        return client;
    }

    public async listMailboxes(): Promise<IMailbox[]> {
        const client: any = await this.connectToServer();
        const mailboxes: any = await client.listMailboxes();
        await client.close();
        const finalMailboxes: IMailbox[] = []; // constant array can be pushed too
        const iterateChildren: Function = (inArray: any[]) : void => {
            inArray.forEach((inValue: any) => {
                finalMailboxes.push({
                    name: inValue.name, path: inValue.path
                })
                iterateChildren(inValue.children) // Recursion
            })
        }
        iterateChildren(mailboxes.children)
        return finalMailboxes
    }

    public async listMessages(inCallOptions: ICallOptions): Promise<IMessage[]> {
        const client: any = await this.connectToServer();
        const mailbox: any = await client.selectMailbox(inCallOptions.mailbox);
        if (mailbox.exists === 0) {
            await client.close()
            return [];
        }
        const messages: any[] = await client.listMessages(
            inCallOptions.mailbox, "1:*", ["uid", "envelope"]
        )
        await client.close()
        const finalMessages: IMessage[] = [];
        messages.forEach((inValue: any) => {
            finalMessages.push({
                id: inValue.uid, date: inValue.envelope.date,
                from: inValue.envelope.from[0].address,
                subject: inValue.envelope.subject
            })
        })
        return finalMessages
    }

    public async getMessageBody(inCallOptions: ICallOptions): Promise<string> {
        const client: any = await this.connectToServer();
        const messages: any[] = await client.listMessages(
            inCallOptions.mailbox, inCallOptions.id, ["body[]"], {byUid: true}
        )
        const parsed: ParsedMail = await simpleParser(messages[0]["body[]"])
        await client.close();
        if (parsed.text) {
            return parsed.text
        }else{
            return ""
        }
    }

    public async deleteMessage(inCallOptions: ICallOptions): Promise<any> {
        const client: any = await this.connectToServer();
        await client.deleteMessage(inCallOptions.mailbox, inCallOptions.id, {byUid: true})
        await client.close();
    }
}