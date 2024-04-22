import Form from "../components/form";

function Login() {
    return <div>
        <Form route="/api/token/" method="login" />
    </div>
}

export default Login;