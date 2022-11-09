import React from "react"
import {Button, FormControl, InputBase, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";


const MessageView = ({state}) => (

    <form>

        { /* ----- ID, date, from, to ----- */ }
        {
            state.currentView === "message" &&
            <InputBase defaultValue={`ID ${state.messageID}`} margin={"dense"} disabled={true} fullWidth={true}
                       className={ "messageInfoField"}/>
        }
        {
            state.currentView === "message" && <br />
        }
        {
            state.currentView === "message" &&
            <InputBase defaultValue = {state.messageDate} margin={"dense"} disabled = {true} fullWidth={true}
                       className={"messageInfoField"}/>
        }
        {
            state.currentView === "message" && <br />
        }
        {
            state.currentView === "message" &&
            <TextField margin={"dense"} variant ="outlined" fullWidth={true} label = "From" value={state.messageFrom}
                       disabled={true} InputProps={{style:{color:"#000000"}}} />
        }
        {
            state.currentView==="message" && <br />
        }



        {
            state.currentView === "compose" &&
            <TextField margin={"dense"} id={"messageTo"} variant={"outlined"} fullWidth={true} label={"To"}
                       value={state.messageTo}
                       InputProps={{style:{color:"#000000"} }}
                       onChange={state.fieldChangeHandler} />
        }
        {
            state.currentView === "compose" && <br />
        }
        { /* ----- Subject, body ----- */ }

        <TextField margin= "dense" id={"messageSubject"} label={"Subject"} variant={"outlined"} fullWidth={true}
                   value={state.messageSubject} disabled={state.currentView==="message"}
                   InputProps={{style:{color:"#000000"}}}
                   onChange={state.fieldChangeHandler} />

        <br />
        <TextField margin="dense" id="messageBody" variant="outlined" fullWidth={ true } multiline={ true } rows={ 12 }
                   value={ state.messageBody } disabled={ state.currentView === "message" }
                   InputProps={{ style : { color : "#000000" } }} onChange={ state.fieldChangeHandler } />


        <br />

        { /* ----- Buttons. ----- */ }
        {
            state.currentView === "compose"&&
            <Button variant={"contained"} color={"primary"} size={"small"}
                    style={{marginTop:10}} onClick={state.sendMessage} >Send</Button>
        }
        {
            state.currentView === "message" &&
            <Button variant={"contained"} color={"primary"} size={"small"}
                    style={{marginTop:10, marginRight:10}}
                    onClick={()=> state.showComposeMessage("reply")}>Reply</Button>
        }
        {
            state.currentView==="message" &&
            <Button variant={"contained"} color={"primary"} size={"small"}
                    style={{marginTop:10, marginRight:10}} onClick={ state.deleteMessage }>Delete</Button>
        }
        {
            state.currentView==="message" &&
            <Button variant={"contained"} color={"primary"} size={"small"}
                    style={{marginTop:10, marginRight:10}} onClick={state.moveToMailbox}>Move To</Button>
        }
        {
            state.currentView==="message" &&
            <FormControl variant={"standard"} style={{minWidth: 400 }} size="small">
                <InputLabel id="moveToMailbox">Another Mailbox</InputLabel>
                <Select labelId={"moveToMailbox"} id={"moveToMailbox"} value={state.moveMailboxDest}
                        label="Another Mailbox" onChange={state.selectChangeHandler}>
                    {state.mailboxes.filter(inElement=> inElement.name!=state.currentMailbox).map((mailbox) => (
                        <MenuItem key={mailbox.name} value={mailbox.name}>{mailbox.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>

        }

    </form>
)

export default MessageView