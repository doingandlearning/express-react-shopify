//Press `tab` to cycle through and fill up information

/**
* Replace TOPIC_NAME with a Webhook Topic to enable autocomplete
* @typedef { import("../../_developer/types/2023-07/webhooks.js").PRODUCTS_CREATE } webhookTopic
*/

const ProductCreate = async (topic, shop, webhookRequestBody, webhookId, apiVersion) => {
	try {
		/** @type {webhookTopic} */
		const webhookBody = JSON.parse(webhookRequestBody);
		const image = webhookBody.images
	} catch (e) {
		console.error(e);
	}
};

export default ProductCreate;