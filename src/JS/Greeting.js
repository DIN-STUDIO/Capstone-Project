import { useNavigate } from 'react-router';

function Greeting() {
    const navigate = useNavigate();

    return(
        <div>
            <h1>INU Attention</h1>
            <h3>Our service is 'Image to Voice' for Gamers & Developers</h3>
            <button onClick={ () => navigate("/sign-in") }>Sign In</button>
        </div>
    );
}

export default Greeting;