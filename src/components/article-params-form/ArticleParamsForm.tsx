import {
  defaultArticleState,
  fontFamilyOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
  fontSizeOptions,
} from '@/constants/articleProps';
import { useSidebarClose } from '@/hooks/useSidebarClose';
import { RadioGroup } from '@/ui/radio-group';
import { Select } from '@/ui/select';
import { Separator } from '@/ui/separator';
import { Text } from '@/ui/text';
import { clsx } from 'clsx';
import { useState, useRef, type FormEvent } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import type { ArticleStateType, OptionType } from '@/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = { onApply: (settings: ArticleStateType) => void };

export const ArticleParamsForm = ({
  onApply,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formSettings, setFormSettings] =
    useState<ArticleStateType>(defaultArticleState);
  const sidebarContainerRef = useRef<HTMLDivElement>(null);

  const createChangeHandler =
    (key: keyof ArticleStateType) =>
    (option: OptionType): void => {
      setFormSettings((previousSettings) => ({ ...previousSettings, [key]: option }));
    };

  const handleToggle = (): void => {
    setIsSidebarOpen((previousIsOpen) => !previousIsOpen);
  };

  useSidebarClose({
    isOpen: isSidebarOpen,
    containerRef: sidebarContainerRef,
    setIsOpen: setIsSidebarOpen,
  });

  // применение настроек по кнопке
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onApply(formSettings);
  };
  // сброс настроек по кнопке
  const handleReset = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setFormSettings(defaultArticleState);
    onApply(defaultArticleState);
  };

  return (
    <div ref={sidebarContainerRef}>
      <ArrowButton isOpen={isSidebarOpen} onClick={handleToggle} />
      <aside
        className={clsx(styles.container, { [styles.container_open]: isSidebarOpen })}
      >
        <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
          <Text as="h2" size={31} weight={800} uppercase>
            Задайте параметры
          </Text>
          <Select
            title="шрифт"
            options={fontFamilyOptions}
            selected={formSettings.fontFamilyOption}
            onChange={createChangeHandler('fontFamilyOption')}
          />
          <RadioGroup
            title="размер шрифта"
            name="fontSize"
            options={fontSizeOptions}
            selected={formSettings.fontSizeOption}
            onChange={createChangeHandler('fontSizeOption')}
          />
          <Select
            title="цвет шрифта"
            options={fontColors}
            selected={formSettings.fontColor}
            onChange={createChangeHandler('fontColor')}
          />
          <Separator />
          <Select
            title="цвет фона"
            options={backgroundColors}
            selected={formSettings.backgroundColor}
            onChange={createChangeHandler('backgroundColor')}
          />
          <Select
            title="ширина контента"
            options={contentWidthArr}
            selected={formSettings.contentWidth}
            onChange={createChangeHandler('contentWidth')}
          />

          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </div>
  );
};
