import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";
import App from "./App/App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<StrictMode>
		<BrowserRouter basename="/react-restoration-of-landscaping">
			<App />
		</BrowserRouter>
	</StrictMode>
);
