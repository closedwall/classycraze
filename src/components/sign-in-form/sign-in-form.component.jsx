import { useState } from "react";
import { createUserDocumentFromAuth,SignInAuthUserWithEmailAndPassword, signInWithGooglePopUp } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss'
import Button from "../button/button.component";

const defaultUser ={
    email:'',
    password:'',
}

const SignInForm =() =>{
    const [formFields, setFormFields] = useState(defaultUser);
    const {email, password} = formFields;
    const handleChange =(event)=>{
        const {name, value} = event.target;
        setFormFields({...formFields, [name]:value});
    }
    const signInWithGoogle =async()=>{
        await signInWithGooglePopUp();
        console.log("done")
    }

    const handleSubmit =async(event)=>{
        event.preventDefault();
        try {
            const {user} = await SignInAuthUserWithEmailAndPassword(email,password);
            setFormFields(defaultUser);
        } catch (error) {
           
        }
    }

    return(
        <div className="sign-up-container">
        <h2>Already have an account</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={handleSubmit}>
            <FormInput label="Email" type="email" name="email" onChange={handleChange} value={email} required />
            <FormInput label="Password" type="password" name="password" onChange={handleChange} value={password} required />
            <div className="buttons-container">
                <Button type="submit">Sign In</Button>
                <Button type="button" buttonType={`google`} onClick={signInWithGoogle}>Google SignIn</Button>
            </div>
        </form>
        </div>
    )
}

export default SignInForm;