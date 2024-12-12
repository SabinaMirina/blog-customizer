import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	// Состояние для хранения текущих настроек
	const [articleSettings, setArticleSettings] = useState({
		fontFamily: defaultArticleState.fontFamilyOption.value,
		fontSize: defaultArticleState.fontSizeOption.value,
		fontColor: defaultArticleState.fontColor.value,
		containerWidth: defaultArticleState.contentWidth.value,
		bgColor: defaultArticleState.backgroundColor.value,
	});

	// Функция для обновления настроек (вызывается из ArticleParamsForm)
	const handleApplySettings = (settings: {
		fontFamily: string;
		fontSize: string;
		fontColor: string;
		containerWidth: string;
		bgColor: string;
	}) => {
		setArticleSettings(settings);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleSettings.fontFamily,
					'--font-size': articleSettings.fontSize,
					'--font-color': articleSettings.fontColor,
					'--container-width': articleSettings.containerWidth,
					'--bg-color': articleSettings.bgColor,
				} as CSSProperties
			}>
			{/* Передаем handleApplySettings в ArticleParamsForm */}
			<ArticleParamsForm onApplySettings={handleApplySettings} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
