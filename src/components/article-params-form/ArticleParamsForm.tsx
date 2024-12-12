import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text/Text';
import { Select } from 'src/ui/select/Select';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	OptionType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import { useState, useEffect, useRef } from 'react';
import { RadioGroup } from 'src/ui/radio-group';
import clsx from 'clsx';

type ArticleParamsFormProps = {
	onApplySettings: (settings: {
		fontFamily: string;
		fontSize: string;
		fontColor: string;
		containerWidth: string;
		bgColor: string;
	}) => void;
};

export const ArticleParamsForm = ({
	onApplySettings,
}: ArticleParamsFormProps) => {
	// состояния для настроек
	const [fontFamily, setFontFamily] = useState<OptionType>(
		defaultArticleState.fontFamilyOption
	);
	const [fontSize, setFontSize] = useState<OptionType>(
		defaultArticleState.fontSizeOption
	);
	const [fontColor, setFontColor] = useState<OptionType>(
		defaultArticleState.fontColor
	);
	const [backgroundColor, setBackgroundColor] = useState<OptionType>(
		defaultArticleState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState<OptionType>(
		defaultArticleState.contentWidth
	);

	// сохранение начальных настроек
	const initialSettings = useRef({
		fontFamily: defaultArticleState.fontFamilyOption,
		fontSize: defaultArticleState.fontSizeOption,
		fontColor: defaultArticleState.fontColor,
		backgroundColor: defaultArticleState.backgroundColor,
		contentWidth: defaultArticleState.contentWidth,
	});

	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const sidebarRef = useRef<HTMLDivElement>(null);

	// применение настроек
	const handleApply = (e: React.FormEvent) => {
		e.preventDefault();
		onApplySettings({
			fontFamily: fontFamily.value,
			fontSize: fontSize.value,
			fontColor: fontColor.value,
			containerWidth: contentWidth.value,
			bgColor: backgroundColor.value,
		});
		setIsMenuOpen(false);
	};

	// Сброс настроек
	const handleReset = () => {
		setFontFamily(initialSettings.current.fontFamily);
		setFontSize(initialSettings.current.fontSize);
		setFontColor(initialSettings.current.fontColor);
		setBackgroundColor(initialSettings.current.backgroundColor);
		setContentWidth(initialSettings.current.contentWidth);

		// Применить сброшенные настройки
		onApplySettings({
			fontFamily: initialSettings.current.fontFamily.value,
			fontSize: initialSettings.current.fontSize.value,
			fontColor: initialSettings.current.fontColor.value,
			containerWidth: initialSettings.current.contentWidth.value,
			bgColor: initialSettings.current.backgroundColor.value,
		});
	};

	// Закрыть сайдбар при клике вне его
	useEffect(() => {
		if (!isMenuOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				setIsMenuOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isMenuOpen]);

	return (
		<>
			<ArrowButton
				isOpen={isMenuOpen}
				onClick={() => setIsMenuOpen((prev) => !prev)}
			/>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}
				ref={sidebarRef}>
				<form className={styles.form} onSubmit={handleApply}>
					{/* Заголовок */}
					<Text as='h2' size={31} weight={800} align='left' family='open-sans'>
						Задайте параметры
					</Text>
					{/* списк для выбора шрифта */}
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={fontFamily}
						placeholder='Выберите шрифт'
						onChange={(option) => setFontFamily(option)}
					/>
					{/* Выбор размера шрифта */}
					<RadioGroup
						title='Размер шрифта'
						name='fontSize'
						options={fontSizeOptions}
						selected={fontSize}
						onChange={(option) => setFontSize(option)}
					/>
					{/* выбора цвета текста */}
					<Select
						title='Цвет текста'
						options={fontColors}
						selected={fontColor}
						placeholder='Выберите цвет'
						onChange={(option) => setFontColor(option)}
					/>
					{/* Выбора цвета фона */}
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={backgroundColor}
						placeholder='Выберите цвет'
						onChange={(option) => setBackgroundColor(option)}
					/>
					{/* Выбор ширины контента */}
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={contentWidth}
						placeholder='Выберите ширину'
						onChange={(option) => setContentWidth(option)}
					/>
					{/* Кнопки сброса и применения */}
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='button'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
