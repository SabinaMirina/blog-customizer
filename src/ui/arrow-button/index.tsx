import React, { useState } from 'react';
export { ArrowButton } from './ArrowButton';
import { ArrowButton } from './ArrowButton';

export const FormToggle = () => {
	const [isOpen, setIsOpen] = useState(false);

	// Функция обработки клика
	const handleToggle = () => {
		setIsOpen((prev) => !prev); // Изменение состояния (открыть/закрыть)
	};

	return (
		<div>
			{/* Передаем состояние и обработчик клика в ArrowButton */}
			<ArrowButton isOpen={isOpen} onClick={handleToggle} />
			{isOpen && <div>Форма открыта!</div>}
		</div>
	);
};
