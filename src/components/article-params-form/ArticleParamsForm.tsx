import {
  defaultArticleState,
  fontFamilyOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
  fontSizeOptions,
} from '@/constants/articleProps';
import { RadioGroup } from '@/ui/radio-group';
import { Select } from '@/ui/select';
import { Separator } from '@/ui/separator';
import { clsx } from 'clsx';
import { useState, useRef, useEffect, type FormEvent } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import type { ArticleStateType, OptionType } from '@/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = { onApply: (settings: ArticleStateType) => void };

export const ArticleParamsForm = ({
  onApply,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [formSettings, setFormSettings] =
    useState<ArticleStateType>(defaultArticleState);
  const sidebarContainerRef = useRef<HTMLDivElement>(null);

  const handleToggle = (): void => {
    setIsOpen((previousIsOpen) => !previousIsOpen);
  };

  const changeFontFamily = (option: OptionType): void => {
    setFormSettings((previousSettings) => ({
      ...previousSettings,
      fontFamilyOption: option,
    }));
  };

  const changeFontColor = (option: OptionType): void => {
    setFormSettings((previousSettings) => ({ ...previousSettings, fontColor: option }));
  };
  const changeBackgroundColor = (option: OptionType): void => {
    setFormSettings((previousSettings) => ({
      ...previousSettings,
      backgroundColor: option,
    }));
  };

  const changeContentWidth = (option: OptionType): void => {
    setFormSettings((previousSettings) => ({
      ...previousSettings,
      contentWidth: option,
    }));
  };

  const changeFontSize = (option: OptionType): void => {
    setFormSettings((previousSettings) => ({
      ...previousSettings,
      fontSizeOption: option,
    }));
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const handleOutsideClick = (e: MouseEvent): void => {
      // при клике за пределами сайдбара - закрываем его, внутри - не реагируем
      const container = sidebarContainerRef.current;

      if (container && e.target instanceof Node && !container.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return (): void => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

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
      <ArrowButton isOpen={isOpen} onClick={handleToggle} />
      <aside className={clsx(styles.container, { [styles.container_open]: isOpen })}>
        <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
          <h2 className={styles.form_title}>Задайте параметры</h2>
          <Select
            title="шрифт"
            options={fontFamilyOptions}
            selected={formSettings.fontFamilyOption}
            onChange={changeFontFamily}
          ></Select>
          <RadioGroup
            title="размер шрифта"
            name="fontSize"
            options={fontSizeOptions}
            selected={formSettings.fontSizeOption}
            onChange={changeFontSize}
          ></RadioGroup>
          <Select
            title="цвет шрифта"
            options={fontColors}
            selected={formSettings.fontColor}
            onChange={changeFontColor}
          ></Select>
          <Separator></Separator>
          <Select
            title="цвет фона"
            options={backgroundColors}
            selected={formSettings.backgroundColor}
            onChange={changeBackgroundColor}
          ></Select>
          <Select
            title="ширина контента"
            options={contentWidthArr}
            selected={formSettings.contentWidth}
            onChange={changeContentWidth}
          ></Select>

          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </div>
  );
};
