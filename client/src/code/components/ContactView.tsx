import React from "react"
import {Button, TextField} from "@material-ui/core";

const ContactView = ({state}) => (
    <form>
        <TextField margin={"dense"} id={"contactName"} label={"Name"}
                   value={state.contactName} variant = "outlined" InputProps={{style:{color:`#000000`}}}
                    disabled={state.currentView === "contact"} style={{width:260}} onChange={state.fieldChangeHandler} />
        <br />
        <TextField margin={"dense"} id={"contactEmail"} label={"Email"} value={state.contactEmail}
            variant = "outlined" InputProps={{style:{color:"#000000"}}} disabled={state.currentView === "contact"} style={{width:520}}
            onChange = {state.fieldChangeHandler} />
        <br />
        {
            state.currentView === "contactAdd" && <Button variant="contained" color="primary" size="small" style={{marginTop:10}} onClick={state.saveContact}> Save </Button>
        }
        {
            state.currentView === "contact" &&
            <Button variant={"contained"} color={"primary"} size={"small"} style={{marginTop:10}}
                    onClick= {state.deleteContact} >Delete</Button>
        }
        {
            state.currentView === "contact" &&
            <Button variant={"contained"} color="primary" size={"small"} style={{marginTop:10}}
                    onClick={()=>state.showComposeMessage("contact")}>Send Email</Button>
        }


    </form>
)

export default ContactView