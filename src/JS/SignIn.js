import { useNavigate } from 'react-router';

function SignIn() {
    const navigate = useNavigate();

    return(
        <div>
            <h1>Here is Sign-in page.</h1>
            <input placeholder='Nickname' />
            <button onClick={ () => navigate("/redirect") }>Sign In</button>
        </div>
    );
}

export default SignIn;