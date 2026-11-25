import { defaultArticleState } from '@/constants/articleProps.ts';
import { clsx } from 'clsx';
import { useState } from 'react';

import { ArticleParamsForm } from '@components/article-params-form';

import { Article } from '../article/Article';

import type { ArticleStateType } from '@/constants/articleProps.ts';
import type { CSSProperties } from 'react';

import styles from './app.module.scss';

export const App = (): React.JSX.Element => {
  const [articleSettings, setArticleSettings] =
    useState<ArticleStateType>(defaultArticleState);
  return (
    <main
      className={clsx(styles.main)}
      style={
        {
          '--font-family': articleSettings.fontFamilyOption.value,
          '--font-size': articleSettings.fontSizeOption.value,
          '--font-color': articleSettings.fontColor.value,
          '--container-width': articleSettings.contentWidth.value,
          '--bg-color': articleSettings.backgroundColor.value,
        } as CSSProperties
      }
    >
      <ArticleParamsForm onApply={setArticleSettings} />
      <Article />
    </main>
  );
};
