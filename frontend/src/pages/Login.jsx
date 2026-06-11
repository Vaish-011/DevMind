function Login() {

  const login = () => {

    window.location.href =
      "http://localhost:5000/api/auth/github";

  };

  return (
    <div>
      <h1>DevMind</h1>

      <button onClick={login}>
        Login With GitHub
      </button>

    </div>
  );
}

export default Login;