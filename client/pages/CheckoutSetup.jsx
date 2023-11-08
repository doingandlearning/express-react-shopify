import {
	Layout,
	Card,
	Page,
	Text,
	BlockStack,
	InlineCode,
	InlineStack,
	Button,
} from "@shopify/polaris";
import { navigate } from "raviger";
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch.js";

export default function CheckoutSetup() {
	const fetch = useFetch();
	const [responseData, setResponseData] = useState("");
	const [selectedProduct, setSelectedProduct] = useState("");

	async function fetchContent() {
		setResponseData("loading...");
		const res = await fetch("/api/apps/checkout/setup");
		const data = await res.json();
		if (data.error) {
			setResponseData(data.error);
		} else {
			setResponseData(data);
			setSelectedProduct(data.product);
		}
	}

	async function updateContent() {
		setResponseData("loading...");
		const res = await fetch("/api/apps/checkout/setup", {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ product: selectedProduct }),
		});
		const data = await res.json();
		if (data.error) {
			setResponseData(data.error);
		} else {
			setResponseData(data);
			setSelectedProduct(data.product);
		}
	}

	useEffect(() => {
		fetchContent();
	}, []);

	return (
		<Page
			title="Billing API"
			backAction={{ content: "Home", onAction: () => navigate("/") }}
		>
			<h1>Checkout Setup</h1>
			<input
				value={selectedProduct}
				onChange={(e) => setSelectedProduct(e.target.value)}
			/>
			<Button onClick={() => updateContent()}>Update product</Button>
		</Page>
	);
}