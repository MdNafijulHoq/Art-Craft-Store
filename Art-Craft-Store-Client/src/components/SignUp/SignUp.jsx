import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProviders/AuthProviders";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";
import auth from "../../Firebase/firebase.config";


const SignUp = () => {

    const {signUp, logOut} = useContext(AuthContext);
    const navigate = useNavigate();

    const [showPass, setShowPass] = useState(false);
    const [signUpSuccess, setSignUpSuccess] = useState('');
    const [signUpError, setSignUpError] = useState('');
    

    const handleSignUp = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photo = form.photo.value;
        const password = form.password.value;
        const register = {name,email,photo,password}
        // console.log(register)

        if(password.length < 6){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Password Should have at least 6 Characters!",
              });
              return;
        }

        if(!/[A-Z]/.test(password)){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Password Should have at least one Uppercase!",
              });
              return;
        }

        if(!/[a-z]/.test(password)){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Password Should have at least one Lowercase!",
              });
              return;
        }

        // * For - SignUp in firebase
        signUp(email, password)
        .then(result => {
            console.log(result.user)
            setSignUpSuccess(
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User Registered Successfully",
                    showConfirmButton: false,
                    timer: 1500
                  })
            )

            // * update name in console
            updateProfile(auth.currentUser, {
                displayName: name,
                photoURL: photo,
            })

            // * After Register i don't want to user login
            logOut();
            navigate('/login')

        })
        .catch(error => {
            console.log(error)
            setSignUpError(
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.message,
                  })
            )
        })

    }
    

    return (
        <div className="w-full mx-auto max-w-md p-8 space-y-3 rounded-xl shadow-lg dark:bg-gray-50 dark:text-gray-800" bis_skin_checked="1">
        <h1 className="text-2xl font-bold text-center">Registration</h1>
        <form onSubmit={handleSignUp} noValidate="" action="" className="space-y-6">

            <div className="space-y-1 text-sm" bis_skin_checked="1">
                <label htmlFor="name" className="block dark:text-gray-600">Username</label>
                <input type="text" name="name" id="name" placeholder="your name..." className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" required />
            </div>

            <div className="space-y-1 text-sm" bis_skin_checked="1">
                <label htmlFor="email" className="block dark:text-gray-600">Email</label>
                <input type="email" name="email" id="email" placeholder="leroy@jenkins.com" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" required />
            </div>

            <div className="space-y-1 text-sm" bis_skin_checked="1">
                <label htmlFor="photo" className="block dark:text-gray-600">photoURL</label>
                <input type="text" name="photo" id="photo" placeholder="image link..." className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" />
                
            </div>

            <div className="space-y-1 text-sm" bis_skin_checked="1">
                {/* <label htmlFor="password" className="block dark:text-gray-600">Password</label>
                <input type={ showPass ? "text" : "password"} name="password" id="password" placeholder="******" required className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"  />
                <span onClick={() => setShowPass(!showPass)}>
                    {
                        showPass ? 'Hide' : 'Show'
                    }
                </span> */}
                
    <label htmlFor="password" className="flex items-center gap-2 dark:text-gray-600">Password</label>
    <div className="flex items-center border border-gray-300 rounded-md dark:border-gray-300 dark:bg-gray-50">
        <input
            type={showPass ? "text" : "password"}
            name="password"
            id="password"
            placeholder="******"
            required
            className="w-full px-3 py-2 border-0 dark:bg-gray-50 dark:text-gray-800"
        />
        <span onClick={() => setShowPass(!showPass)} className="badge badge-info cursor-pointer rounded-lg mx-2 p-2">
            {showPass ? 'Hide' : 'Show'}
        </span>
    </div>
                
            </div>
            <button className="btn btn-primary block w-full p-3 text-center rounded-sm dark:text-gray-50 dark:bg-violet-600">Sign Up</button>
        </form>
        
        <p className="text-xs text-center sm:px-6 dark:text-gray-600">Already registered?
            
            <Link to='/login' rel="noopener noreferrer" href="#" className="underline text-blue-900 font-bold">Sign In</Link>
        </p>
    </div>
    );
};

export default SignUp;