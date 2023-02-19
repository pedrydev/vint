import { App, ConfigProvider } from 'antd';
import type { Locale } from 'antd/lib/locale-provider';
import es from 'antd/locale/es_ES';
import en from 'antd/locale/en_US';
import type { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';

const locales: Record<string, Locale> = {
  es,
  en,
};

export default function Antd({ children }: PropsWithChildren<unknown>) {
  const { i18n } = useTranslation();

  return (
    <ConfigProvider
      locale={locales[i18n.language]}
      theme={{
        token: {
          fontSize: 16,
        },
      }}
    >
      <App>{children}</App>
    </ConfigProvider>
  );
}
