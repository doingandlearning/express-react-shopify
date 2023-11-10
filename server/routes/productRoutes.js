import { Router } from "express";
import clientProvider from "../../utils/clientProvider.js";
import enhanceProductDescription from "../../utils/enhanceDescription.js";

const productRoutes = Router();


productRoutes.get("/:id", async (req, res) => {
	try {
		console.log(`---> /api/apps/products/:id triggered`)
		const { client } = await clientProvider.graphqlClient({
			req,
			res,
			isOnline: true,
		});
		const response = await client.query({
			data: {
				query: `query GetProductData($id: ID!) {
          product(id: $id) {
            title
            handle
            descriptionHtml
          }
        }`,
				variables: {
					id: req.params.id
				}
			}
		});

		return res.json({ data: response });

	} catch (error) {
		console.error(error)
	}
});

productRoutes.post("/:id/description", async (req, res) => {
	try {
		console.log("---> /api/apps/products/:id/description triggered")
		console.log(req.params.id, req.body)
		const { client } = await clientProvider.graphqlClient({
			req,
			res,
			isOnline: true,
		});
		const { description } = req.body

		if (typeof description !== 'string') {
			return res.status(400).json({ message: "You need to provide a description." })
		}
		const response = await client.query({
			data: {
				query: `mutation ProductDescriptionUpdate($id: ID!, $description: String) {
					productUpdate(input:{
						id: $id,
						descriptionHtml: $description
					}) {
						product {
							id
							title
							description
						}
					}
				}`,
				variables: {
					id: req.params.id,
					description
				}
			}
		});

		return res.json({ data: response });

	} catch (error) {
		console.error(error)
	}
});

productRoutes.patch("/enhance_description", async (req, res) => {
	console.log("---> /api/apps/products/enhance_description triggered")
	const { description, title } = req.body
	const shopName = req.query?.shop?.split(".")[0]
	if (typeof description !== 'string') {
		res.status(400).send({ message: 'You need to send a description.' })
	}
	try {
		// const enhancedDescription = description
		const enhancedDescription = await enhanceProductDescription(description, title, shopName)
		res.send({ description: enhancedDescription })
	} catch (error) {
		res.send({ description })
	}
})

export default productRoutes