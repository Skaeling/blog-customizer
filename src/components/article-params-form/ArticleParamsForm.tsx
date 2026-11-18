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
import { useState, useRef, useEffect } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import type { ArticleStateType, OptionType } from '@/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = (): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [formSettings, setFormSettings] =
    useState<ArticleStateType>(defaultArticleState);
  const sidebarContainerRef = useRef<HTMLDivElement>(null);

  const handleToggle = (): void => {
    setIsOpen((previousIsOpen) => !previousIsOpen);
  };

  const handleFontFamilyChange = (option: OptionType): void => {
    setFormSettings((previousSettings) => ({
      ...previousSettings,
      fontFamilyOption: option,
    }));
  };

  const handleFontColorChange = (option: OptionType): void => {
    setFormSettings((previousSettings) => ({ ...previousSettings, fontColor: option }));
  };
  const handleBGColorsChange = (option: OptionType): void => {
    setFormSettings((previousSettings) => ({
      ...previousSettings,
      backgroundColor: option,
    }));
  };

  const handleContentWidthChange = (option: OptionType): void => {
    setFormSettings((previousSettings) => ({
      ...previousSettings,
      contentWidth: option,
    }));
  };

  const handleFontSizeChange = (option: OptionType): void => {
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

  return (
    <div ref={sidebarContainerRef}>
      <ArrowButton isOpen={isOpen} onClick={handleToggle} />
      <aside className={clsx(styles.container, { [styles.container_open]: isOpen })}>
        <form className={styles.form}>
          <h2 className={clsx(styles.form_title)}>Задайте параметры</h2>
          <Select
            title="шрифт"
            options={fontFamilyOptions}
            selected={formSettings.fontFamilyOption}
            onChange={handleFontFamilyChange}
          ></Select>
          <RadioGroup
            title="размер шрифта"
            name="fontSize"
            options={fontSizeOptions}
            selected={formSettings.fontSizeOption}
            onChange={handleFontSizeChange}
          ></RadioGroup>
          <Select
            title="цвет шрифта"
            options={fontColors}
            selected={formSettings.fontColor}
            onChange={handleFontColorChange}
          ></Select>
          <Select
            title="цвет фона"
            options={backgroundColors}
            selected={formSettings.backgroundColor}
            onChange={handleBGColorsChange}
          ></Select>
          <Separator></Separator>
          <Select
            title="Ширина контента"
            options={contentWidthArr}
            selected={formSettings.contentWidth}
            onChange={handleContentWidthChange}
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
