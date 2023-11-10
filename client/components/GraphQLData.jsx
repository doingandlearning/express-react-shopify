// src/components/GraphQLData.js

import { Page, Layout, Card, Text, Spinner } from "@shopify/polaris";
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import DescriptionTextField from "./DescriptionTextField";
import SaveEnhanceButtons from "./SaveEnhanceButtons";
import { fetchProductData, enhanceProductDescription, updateProductDescription } from "../services/productService";
import { logError } from "../utils/errorHandler";

const GraphQLData = ({ id }) => {
	const [data, setData] = useState({});
	const [description, setDescription] = useState("");
	const [loading, setLoading] = useState(true);
	const [enhancing, setEnhancing] = useState(false);
	const [changed, setChanged] = useState(false);
	const fetch = useFetch();

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const product = await fetchProductData(fetch, id);
				setData(product || {});
				setDescription(product?.descriptionHtml || "");
				setChanged(false);
				setLoading(false);
			} catch (error) {
				logError(error, "Error fetching GraphQL data:");
				setLoading(false);
			}
		};

		fetchData();
	}, [id]);

	const handleDescriptionChange = (newValue) => {
		setDescription(newValue);
		setChanged(true);
	};

	const enhanceDescription = async () => {
		try {
			setEnhancing(true);
			const enhancedData = await enhanceProductDescription(fetch, description, data.title);
			setDescription(enhancedData.description);
			setChanged(true);
		} catch (error) {
			logError(error, "Error enhancing description:");
		} finally {
			setEnhancing(false);
		}
	};

	const setNewDescription = async () => {
		try {
			await updateProductDescription(fetch, id, description);
			setChanged(false);
		} catch (error) {
			logError(error, "Error updating description:");
		}
	};

	if (loading) return <Spinner />;

	return (
		<Page>
			<Layout>
				<Layout.Section>
					<Card sectioned title="">
						<Text as="h2" variant="bold">
							{data?.title}
						</Text>
					</Card>
					<DescriptionTextField description={description} onChange={handleDescriptionChange} />
				</Layout.Section>
				<Layout.Section oneHalf></Layout.Section>
				<Layout.Section oneHalf>
					<SaveEnhanceButtons
						onEnhanceClick={enhanceDescription}
						onSaveClick={setNewDescription}
						enhancing={enhancing}
						changed={changed}
					/>
				</Layout.Section>
			</Layout>
		</Page>
	);
};

export default GraphQLData;
