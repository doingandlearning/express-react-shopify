import {
	Page,
	Layout,
	Card,
	TextField,
	Text,
	Button,
	Spinner,
	ButtonGroup,
} from "@shopify/polaris";
import { useEffect, useState, useCallback } from "react";
import useFetch from "../hooks/useFetch";
import "./EnhanceDescription.css";

const GraphQLData = ({ id }) => {
	const [data, setData] = useState({});
	const [description, setDescription] = useState("");
	const [loading, setLoading] = useState(true);
	const [enhancing, setEnhancing] = useState(false);
	const [changed, setChanged] = useState(false);
	const fetch = useFetch();

	useEffect(() => {
		fetchGraphQLData();
	}, [id]);

	async function fetchGraphQLData() {
		try {
			if (!id) {
				return;
			}
			const response = await fetch(
				`/api/apps/products/${encodeURIComponent(id)}`
			);
			const json = await response.json();
			const product = json?.data?.body?.data?.product;
			setData(product || {});
			setDescription(product?.descriptionHtml || "");
			setLoading(false);
			setChanged(false)
		} catch (error) {
			console.error("Error fetching GraphQL data:", error);
		}
	}

	const handleDescriptionChange = useCallback(
		(newValue) => setDescription(newValue) && setChanged(true),
		[]
	);

	const enhanceDescription = async () => {
		try {
			setEnhancing(true);
			const response = await fetch("/api/apps/products/enhance_description", {
				body: JSON.stringify({ description, title: data.title }),
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const json = await response.json();
			setDescription(json.description);
			setEnhancing(false);
			setChanged(true)
		} catch (error) {
			console.log(error);
			setEnhancing(false);
		}
	};

	const setNewDescription = async () => {
		try {
			const response = await fetch(
				`/api/apps/products/${encodeURIComponent(id)}/description`,
				{
					method: "POST",
					body: JSON.stringify({ description }),
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			setChanged(false)
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Page>
				{!loading && (
					<Layout>
						<Layout.Section>
							<Card sectioned title="">
								<Text as="h2" variant="bold">
									{data?.title}
								</Text>
							</Card>

							<TextField
								label="Description"
								value={description}
								onChange={handleDescriptionChange}
								multiline={4}
							/>
						</Layout.Section>
						<Layout.Section oneHalf></Layout.Section>
						<Layout.Section oneHalf>

							<Button onClick={enhanceDescription} disabled={enhancing}>
								Enhance with AI
							</Button>

							<Button variant={changed ? 'primaryCritical' : 'primary'} onClick={setNewDescription}>
								Save
							</Button>
						</Layout.Section>
						{enhancing && <Spinner />}
					</Layout>
				)}
				{loading && <Spinner />}
			</Page >
		</>
	);
};

export default GraphQLData;
