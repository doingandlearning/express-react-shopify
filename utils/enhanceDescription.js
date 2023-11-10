import OpenAI from 'openai';

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY, // Your OpenAI API key
});

const enhanceProductDescription = async (description, productName, shopName) => {
	try {
		const prompt = `Product name: ${productName}\nShop name: ${shopName}\nCurrent description: ${description}\n\nWrite a compelling product description. \n\n This should be returned as valid HTML using paragraph and other tags as appropriate. If there is an original description, try to keep the tone.`;

		const response = await openai.chat.completions.create({
			messages: [{ role: 'system', content: prompt }],
			model: 'gpt-3.5-turbo', // You can choose the model you prefer
		});

		const enhancedDescription = response.choices[0].message.content;
		return enhancedDescription;
	} catch (error) {
		console.error("Error enhancing product description:", error);
		throw error;
	}
};

export default enhanceProductDescription;
