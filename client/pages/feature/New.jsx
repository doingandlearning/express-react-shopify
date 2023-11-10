import { Page, Layout, LegacyCard } from "@shopify/polaris";

const NewPage = () => {
	return (
		<>
			<Page>
				<Layout>
					<Layout.Section>
						<LegacyCard sectioned title="">
							<p></p>
						</LegacyCard>
					</Layout.Section>
				</Layout>
			</Page>
		</>
	);
};

export default NewPage;