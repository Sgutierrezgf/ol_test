import './notfound.css'

function NotFound() {
    return (
        <div className="notfound-container">
            <div className="notfound-content">
                <h1>404</h1>
                <div className="notfound-message">
                    <h2>SORRY!</h2>
                    <p>Parece que a donde vas no es a donde podemos ir...</p>
                </div>
                <a href="/" className="back-link">Regresar al Dashboard</a>
                <footer>
                    Copyright © 2024. All rights reserved.
                </footer>
            </div>
        </div>
    );
}

export default NotFound;