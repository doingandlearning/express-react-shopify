import { Router } from "express";
import clientProvider from "../../utils/clientProvider.js";


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
            description
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

		if (!description) {
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

		console.log(response)
		return res.json({ data: response });

	} catch (error) {
		console.error(error)
	}
});

export default productRoutes