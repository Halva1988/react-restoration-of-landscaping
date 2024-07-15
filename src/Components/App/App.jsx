import Navigation from "../Navigetion/Navigation";
import NewAddresses from "../NewAddresses/NewAddresses";
import Wrapper from "../Wrapper/Wrapper";
import "./App.module.css";

function App() {
	return (
		<Wrapper>
			<Navigation />
			<NewAddresses />
		</Wrapper>
	);
}

export default App;
