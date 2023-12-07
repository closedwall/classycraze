import { signInWithGooglePopUp,createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const SignIn =() =>{
    const logGoogleUser =async()=>{
        const {user} = await signInWithGooglePopUp();
        const userDocRef = await createUserDocumentFromAuth(user);
    }
    return(
        <>
        <h1>Sign In page</h1>
        <button onClick={logGoogleUser}>Sign In with google popup</button>
        </>
    )
}

export default SignIn;