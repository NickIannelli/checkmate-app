import { noop } from 'lodash';
import React from 'react';

export default function useForm({ initialValues = {}, fields }) {
	const [fieldValues, setFields] = React.useState(
		fields.map(field => ({ [field]: initialValues[field] || '' })).reduce((prev, curr) => ({ ...prev, ...curr }), {})
	);

	const setFieldValue = (fieldName, value) => setFields(fields => ({ ...fields, [fieldName]: value }));

	function handleSubmit(handler) {
		return evt => {
			evt.preventDefault();
			return handler(fieldValues);
		};
	}

	return {
		fields: fields
			.map(field => ({
				[field]: {
					onChange: e => setFieldValue(field, e.target.value),
					value: fieldValues[field]
				}
			}))
			.reduce((prev, curr) => ({ ...prev, ...curr }), {}),
		handleSubmit
	};
}

export function fakeEvent(values) {
	return {
		...values,
		addEventListener: noop,
		dispatchEvent: noop
	};
}
