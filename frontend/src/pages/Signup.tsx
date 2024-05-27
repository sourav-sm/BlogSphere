import { Label } from "../components/Label";
import { Authentication } from "../components/Authentication";

export const Signup=()=>{
    return <div className="grid grid-cols-1 lg:grid-cols-2 ">
            <div>
              <Authentication type="signup"/>
            </div>
            <div className="hidden lg:block">
               <Label/>
            </div>       
        </div>
}