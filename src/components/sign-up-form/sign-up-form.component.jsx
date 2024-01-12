import { useState} from "react";
import { createAuthUserWithEmailAndPassword,createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss'
import Button from "../button/button.component";

const defaultUser ={
    displayName:'',
    email:'',
    password:'',
    confirmPassword:'',
}

const SignUpForm =() =>{
    const [formFields, setFormFields] = useState(defaultUser);
    const {displayName, email, password,confirmPassword} = formFields;
    const handleChange =(event)=>{
        const {name, value} = event.target;
        setFormFields({...formFields, [name]:value});
    }

    const handleSubmit =async(event)=>{
        event.preventDefault();
        if(password !== confirmPassword){
            alert("password don't match");
            return;
        }
        try {
            const {user} = await createAuthUserWithEmailAndPassword(email,password);
            await createUserDocumentFromAuth(user,{displayName})
            setFormFields(defaultUser);
        } catch (error) {
            if(error.code === 'auth/email-already-in-use'){
                alert("cannot create duplicate user with same email")
            }else{
                console.log("user creation encountered an error", error);
            }
        }
    }

    return(
        <div className="sign-up-container">
        <h2>Don't have an account</h2>
        <span>Sign up with your email and password</span>
        <form onSubmit={handleSubmit}>
            <FormInput label="Display Name" type="text" id="name" name="displayName" onChange={handleChange} value={displayName} required />
            <FormInput label="Email" type="email" id="email" name="email" onChange={handleChange} value={email} required />
            <FormInput label="Password" type="password" id="password" name="password" onChange={handleChange} value={password} required />
            <FormInput label="Confirmed password" type="password" id="confirm-password" name="confirmPassword" onChange={handleChange} value={confirmPassword} required />

            <Button type="submit">SignUp</Button>
        </form>
        </div>
    )
}

export default SignUpForm;