// src/services/productService.js

const fetchProductData = async (fetch, id) => {
	if (!id) return null;

	const response = await fetch(`/api/apps/products/${encodeURIComponent(id)}`);
	const json = await response.json();
	return json?.data?.body?.data?.product;
};

const enhanceProductDescription = async (fetch, description, title) => {
	const response = await fetch("/api/apps/products/enhance_description", {
		body: JSON.stringify({ description, title }),
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
	});
	return response.json();
};

const updateProductDescription = async (fetch, id, description) => {
	await fetch(`/api/apps/products/${encodeURIComponent(id)}/description`, {
		method: "POST",
		body: JSON.stringify({ description }),
		headers: {
			"Content-Type": "application/json",
		},
	});
};

export { fetchProductData, enhanceProductDescription, updateProductDescription };
