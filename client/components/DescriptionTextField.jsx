// src/components/DescriptionTextField.js

import { TextField } from "@shopify/polaris";
import React from "react";

const DescriptionTextField = ({ description, onChange }) => (
	<TextField
		label="Description"
		value={description}
		onChange={onChange}
		multiline={4}
	/>
);

export default DescriptionTextField;
