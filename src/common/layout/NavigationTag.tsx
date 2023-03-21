import { Button } from 'antd';
import { createContext, MouseEventHandler, useContext, useMemo } from 'react';
import type { PropsWithChildren } from 'react';
import { useLocation } from 'react-router-dom';
import useUniqueList from '../form/useUniqueList';
import Link from '../navigation/Link';

// @ts-ignore
const NavigationTagContext = createContext<NavigationTagFunctions>();
// @ts-ignore
const NavigationTagStateContext = createContext<NavigationTagItem[]>();

interface NavigationTagItem {
  closeable: boolean;
  label: string;
  url: string;
}

interface NavigationTagButtonProps {
  item: NavigationTagItem;
}

interface NavigationTagFunctions {
  add: (item: NavigationTagItem) => void;
  remove: (item: NavigationTagItem) => void;
}

interface NavigationTagProvider {
  initItems?: NavigationTagItem[];
}

function NavigationTagProvider({ children, initItems }: PropsWithChildren<NavigationTagProvider>) {
  const { add, remove, selected } = useUniqueList<NavigationTagItem>({
    comparisonFunction: (a, b) => a.url === b.url,
    initSelected: initItems,
  });
  const functions = { add, remove };

  return (
    <NavigationTagContext.Provider value={functions}>
      <NavigationTagStateContext.Provider value={selected}>
        {children}
      </NavigationTagStateContext.Provider>
    </NavigationTagContext.Provider>
  );
}

function NavigationTagPanel() {
  const items = useContext(NavigationTagStateContext);

  return (
    <section className='flex space-x-sm p-sm bg-white h-14'>
      {items.map((item) => (
        <NavigationTagButton item={item} key={item.url} />
      ))}
    </section>
  );
}

function NavigationTagButton({ item }: NavigationTagButtonProps) {
  const location = useLocation();
  const { remove } = useNavigationTags();
  const pathnameWithoutLanguage = location.pathname.substring(4);

  return (
    <Link key={item.url} to={item.url}>
      <Button
        className='inline-block'
        onContextMenu={(ev) => {
          ev.preventDefault();
          if (item.closeable) remove(item);
        }}
        type={pathnameWithoutLanguage === item.url ? 'primary' : 'default'}
      >
        {item.label}
      </Button>
    </Link>
  );
}

function useNavigationTags() {
  return useContext(NavigationTagContext);
}

const NavigationTag = {
  Panel: NavigationTagPanel,
  Provider: NavigationTagProvider,
  useNavigationTags,
};

export default NavigationTag;
