import { Component, SyntheticEvent } from "react";
import "../Login.css";

class Register extends Component {
	first_name: string | undefined;
	last_name: string | undefined;
	email: string | undefined;
	password: string | undefined;
	password_confirm: string | undefined;

	// preventDefault to suppress default behavior on event
	submit = (e: SyntheticEvent) => {
		e.preventDefault();
		console.log({
			first_name: this.first_name,
			last_name: this.last_name,
			email: this.email,
		});
	};

	render() {
		return (
			<main className="form-signin">
				<form onSubmit={this.submit}>
					<h1 className="h3 mb-3 fw-normal">Please register</h1>

					<input
						className="form-control"
						placeholder="First Name"
						required
						onChange={(e) => (this.first_name = e.target.value)}
					/>
					<input
						className="form-control"
						placeholder="Last Name"
						required
						onChange={(e) => (this.last_name = e.target.value)}
					/>
					<input
						type="email"
						className="form-control"
						placeholder="name@example.com"
						required
						onChange={(e) => (this.email = e.target.value)}
					/>

					<input
						type="password"
						className="form-control"
						placeholder="Password"
						required
						onChange={(e) => (this.password = e.target.value)}
					/>
					<input
						type="password"
						className="form-control"
						placeholder="Password Confirm"
						required
						onChange={(e) =>
							(this.password_confirm = e.target.value)
						}
					/>

					<button
						className="w-100 btn btn-lg btn-primary"
						type="submit"
					>
						Submit
					</button>
				</form>
			</main>
		);
	}
}

export default Register;
