import { useNavigate } from 'react-router';

function SignIn() {
    const navigate = useNavigate();

    return(
        <div>
            <h1>Here is Redirect page.</h1>
            <input placeholder='Nickname' />
            <button onClick={ () => navigate("/main") }>Sign In</button>
        </div>
    );
}

export default SignIn;