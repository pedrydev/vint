import { useTranslation } from 'react-i18next';
import { useNavigate as _useNavigate } from 'react-router-dom';
import type { NavigateOptions, To } from 'react-router-dom';
import { useCallback } from 'react';

export default function useNavigate() {
  const { i18n } = useTranslation();
  const _navigate = _useNavigate();
  const navigate = useCallback(
    (to: To, options: NavigateOptions | undefined = undefined) => {
      if (typeof to === 'string') _navigate(`/${i18n.language}/${to}`, options);
      else _navigate({ ...to, pathname: `/${i18n.language}/${to.pathname}` }, options);
    },
    [i18n]
  );
  return navigate;
}
