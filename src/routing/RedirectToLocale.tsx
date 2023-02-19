import { useTranslation } from 'react-i18next';
import { Navigate, useLocation } from 'react-router-dom';

export default function RedirectToLocale() {
  const { i18n } = useTranslation();
  const location = useLocation();

  return (
    <Navigate to={location.pathname.replace(location.pathname, i18n.language)} replace={true} />
  );
}
