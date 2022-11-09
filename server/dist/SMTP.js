"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Worker = void 0;
const nodemailer = require("nodemailer");
class Worker {
    constructor(inServerInfo) {
        this.serverInfo = inServerInfo;
    }
    sendMessage(inOptions) {
        console.log("messageBody in state.ts");
        console.log(inOptions.text);
        return new Promise((inResolve, inReject) => {
            const transport = nodemailer.createTransport(this.serverInfo.smtp);
            transport.sendMail(inOptions, (inError, inInfo) => {
                if (inError) {
                    inReject(inError);
                }
                else {
                    inResolve(); // TODO: different from textbook
                }
            });
        });
    }
}
exports.Worker = Worker;
//# sourceMappingURL=SMTP.js.map