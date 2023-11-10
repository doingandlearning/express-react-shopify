import React, { useState, useCallback } from 'react';
import { Page, Layout, Button } from '@shopify/polaris';

import { navigate } from "raviger";
import GraphQLData from '../../components/EnhanceDescription';

const DebugIndex = () => {
	const [selectedItem, setSelectedItems] = useState('')

	async function openPicker() {
		const selected = await window?.shopify.resourcePicker({ type: 'product' })
		if (selected) {
			setSelectedItems(selected[0].id)
		}
	}

	return (
		<>
			<Page
				title="Enhance Product Descriptions"
				subtitle="Use OpenAI to enhance product descriptions"
				backAction={{ content: "Home", onAction: () => navigate("/") }}
			>
				<Layout>
					<Layout.Section>
						<Button onClick={() => openPicker()} variant="primary">Pick Product</Button>
						{selectedItem && <GraphQLData id={selectedItem} />}
					</Layout.Section>
				</Layout>
			</Page>
		</>
	);
};

export default DebugIndex;
