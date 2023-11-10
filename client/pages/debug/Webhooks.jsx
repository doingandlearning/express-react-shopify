import useFetch from "../../hooks/useFetch.js";
import {
  Card,
  DataTable,
  Layout,
  Page,
  Text,
  BlockStack,
} from "@shopify/polaris";
import { navigate } from "raviger";
import { useEffect, useState } from "react";

const ActiveWebhooks = () => {
  const fetch = useFetch();

  const [rows, setRows] = useState([
    ["Loading", "I haven't implemented swr or react query yet."],
  ]);

  async function fetchWebhooks() {
    const res = await fetch("/api/apps/debug/activeWebhooks");
    const data = await res.json();
    let rowData = [];
    Object.entries(data.body.data.webhookSubscriptions.edges).map(
      ([key, value]) => {
        const topic = value.node.topic;
        const callbackUrl = value.node.endpoint.callbackUrl;
        rowData.push([topic, callbackUrl]);
      }
    );
    setRows(rowData);
  }

  useEffect(() => {
    fetchWebhooks();
  }, []);

  return (
    <>
      <Page
        title="Exploring Webhooks"
        backAction={{ content: "Home", onAction: () => navigate("/debug") }}
      >
        <Layout>

          <Layout.Section>
            <Card>
              <BlockStack gap="200">
                <Text>
                  When working with webhooks there are many things that might go wrong. This section will explore those. Below are a list of the currently registered webhooks.
                </Text>
              </BlockStack>
            </Card>
          </Layout.Section>
          <Layout.Section>
            <Card padding="0">
              <DataTable
                columnContentTypes={["text", "text"]}
                headings={["Topic", "Callback Url"]}
                rows={rows}
              />
            </Card>
          </Layout.Section>
          <Layout.Section>
            <Card>
              <BlockStack gap="200">
                <Text as="h2" variant="headingMd">
                  Note
                </Text>
                <Text>
                  Webhooks are registered when the app is installed, or when
                  tokens are refetched by going through the authentication
                  process. If your Callback URL isn't the same as your current
                  URL (happens usually during dev when using ngrok), you need to
                  go through the auth process again.
                </Text>
              </BlockStack>
            </Card>
          </Layout.Section>
          <Layout.Section variant="oneHalf">
            <Card>
              <BlockStack gap="200">
                <Text as="h2" variant="headingMd">
                  Incorrectly Register a webhook
                </Text>
                <Text>
                  I'd like to put a button in here to incorrectly register the webhook
                </Text>
              </BlockStack>
            </Card>
          </Layout.Section>
          <Layout.Section variant="oneHalf">
            <Card>
              <BlockStack gap="200">
                <Text as="h2" variant="headingMd">
                  Incorrectly Trigger a webhook
                </Text>
                <Text>
                  I'd like to put a button in here to incorrectly register the webhook
                </Text>
              </BlockStack>
            </Card>
          </Layout.Section>
          <Layout.Section variant="oneHalf">
            <Card>
              <BlockStack gap="200">
                <Text as="h2" variant="headingMd">
                  Correctly Register a webhook
                </Text>
                <Text>
                  I'd like to put a button in here to incorrectly register the webhook
                </Text>
              </BlockStack>
            </Card>
          </Layout.Section>
          <Layout.Section variant="oneHalf">
            <Card>
              <BlockStack gap="200">
                <Text as="h2" variant="headingMd">
                  Correctly Trigger a webhook
                </Text>
                <Text>
                  I'd like to put a button in here to incorrectly register the webhook
                </Text>
              </BlockStack>
            </Card>
          </Layout.Section>

        </Layout>
      </Page>
    </>
  );
};

export default ActiveWebhooks;
