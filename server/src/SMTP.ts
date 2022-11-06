import Mail from "nodemailer/lib/mailer";
// import * as nodemailer from "nodemailer";
import { SendMailOptions, SentMessageInfo} from "nodemailer";
import {IServerInfo} from "./ServerInfo";
import {Send} from "express";
const nodemailer = require("nodemailer")

export class Worker {
    private serverInfo: IServerInfo;
    constructor(inServerInfo: IServerInfo) {
        this.serverInfo = inServerInfo
    }
    public sendMessage(inOptions: SendMailOptions): Promise<string> {
        return new Promise((inResolve, inReject) =>{
            const transport: Mail = nodemailer.createTransport(this.serverInfo.smtp);
            transport.sendMail(inOptions, (inError: Error | null, inInfo: SentMessageInfo) => {
                if (inError) {
                    inReject(inError);
                }else{
                    inResolve("mail sent"); // TODO: different from textbook
                }
            })
        })
    }
}