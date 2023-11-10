import { Button, ButtonGroup, Icon } from "@shopify/polaris";
import { AlertMinor } from '@shopify/polaris-icons';
import React from "react";

const SaveEnhanceButtons = ({ onEnhanceClick, onSaveClick, enhancing, changed }) => (
	<ButtonGroup>
		<Button onClick={onEnhanceClick} loading={enhancing}>
			Enhance with AI
		</Button>
		<Button variant="primary" onClick={onSaveClick} icon={changed && <Icon source={AlertMinor} tone="base" />}>
			Save
		</Button>
	</ButtonGroup>
);

export default SaveEnhanceButtons;
