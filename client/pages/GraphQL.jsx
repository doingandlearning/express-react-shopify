import { Page, Layout, Card, TextField, Text, Button, Spinner } from "@shopify/polaris";
import { useEffect, useState, useCallback } from "react";

const GraphQLData = () => {
	const [data, setData] = useState({});
	const [description, setDescription] = useState("");
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		fetchGraphQLData();
	}, []);

	async function fetchGraphQLData() {
		try {
			const response = await fetch(`/api/apps/products/${encodeURIComponent("gid://shopify/Product/7755488362690")}`);
			const json = await response.json();
			const product = json?.data?.body?.data?.product;
			setData(product || {});
			setDescription(product?.description || "");
			setLoading(false)
		} catch (error) {
			console.error("Error fetching GraphQL data:", error);
		}
	}

	const handleDescriptionChange = useCallback(
		(newValue) => setDescription(newValue),
		[],
	);

	const enhanceDescription = async () => {
	}

	const setNewDescription = async () => {
		try {
			console.log(description)
			const response = await fetch(`/api/apps/products/${encodeURIComponent("gid://shopify/Product/7755488362690")}/description`, {
				method: 'POST',
				body: JSON.stringify({ description }),
				headers: {
					'Content-Type': 'application/json'
				}
			});
		} catch (error) {

		}
	}

	return (
		<>
			<Page>
				{!loading &&
					<Layout>
						<Layout.Section>
							<Card sectioned title="">
								<Text as="h2" variant="bold">{data?.title}</Text>

								<TextField
									label="Description"
									value={description}
									onChange={handleDescriptionChange}
									multiline={4}
								/>
								<Button onClick={enhanceDescription}>Enhance with AI</Button>
								<Button onClick={setNewDescription}>Save</Button>
							</Card>
						</Layout.Section>
					</Layout>
				}
				{loading && <Spinner />}
			</Page>
		</>
	);
};

export default GraphQLData;
