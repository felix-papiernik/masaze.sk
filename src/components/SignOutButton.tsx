import { Button } from "@mui/material";
import { signOut } from "../../auth";


export default function SignOutButton() {
    return (
        <Button 
        onClick={async () => { "use server"; await signOut(); }}
        type="button"
        variant="contained"
        >Odhlásiť sa</Button>
    );
}
