import React, { useState, useCallback } from 'react';
import { Page, Layout, Card, ResourceList, ResourceItem, Filters, TextField, Button, Text } from '@shopify/polaris';

import { navigate } from "raviger";
import { useFetchGQL } from '../../hooks/useFetch';

const DebugIndex = () => {
	const [selectedItems, setSelectedItems] = useState([])

	async function openPicker() {
		const selected = await window?.shopify.resourcePicker({ type: 'product' })
		if (selected) {
			setSelectedItems(selected)
		}
	}

	return (
		<>
			<Page
				title="Feature"
				subtitle="TODO - describe"
				backAction={{ content: "Home", onAction: () => navigate("/") }}
			>
				<Layout>
					<Layout.Section>
						<Button onClick={() => openPicker()}>Launch picker</Button>
						<ResourceList
							resourceName={{ singular: 'product', plural: 'products' }}
							items={selectedItems}
							renderItem={item => {
								console.log(item.id)
								const { title, tags, inventory, images, id, url } = item
								return (
									<ResourceItem
										id={id}
										url={url}>
										<Text variant="bodyMd" fontWeight="bold" as="h3">{title}</Text>
									</ResourceItem>
								)
							}}
						>

						</ResourceList>
					</Layout.Section>
				</Layout>
			</Page>
		</>
	);
};

export default DebugIndex;
