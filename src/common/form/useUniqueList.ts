import { useState } from 'react';

const defaultComparisonFunction = <T>(a: T, b: T) => {
  if (a !== null && b !== null) {
    if (typeof a === 'object' && typeof b === 'object') {
      if (Object.keys(a).some((k) => k === 'id') && Object.keys(b).some((k) => k === 'id')) {
        // @ts-ignore
        return a.id === b.id;
      } else if (
        Object.keys(a).some((k) => k === '_id') &&
        Object.keys(b).some((k) => k === '_id')
      ) {
        // @ts-ignore
        return a._id === b._id;
      }
    }
  }
  return a === b;
};

export interface UseUniqueListArgs<T> {
  comparisonFunction?: (a: T, b: T) => boolean;
  initSelected?: T[];
}

export default function useUniqueList<T>({
  initSelected = [],
  comparisonFunction = defaultComparisonFunction,
}: UseUniqueListArgs<T>) {
  const [selected, setSelected] = useState<T[]>(initSelected);

  const add = (obj: T) => {
    if (!selected.some((item) => comparisonFunction(obj, item))) setSelected([...selected, obj]);
  };

  const addOrRemove = (obj: T) => {
    const withoutNew = selected.filter((item) => !comparisonFunction(item, obj));
    if (withoutNew.length === selected.length) setSelected([...withoutNew, obj]);
    else setSelected(withoutNew);
  };

  const addOrUpdateMany = (objs: T[]) => {
    const withoutNew = selected.filter((item) =>
      objs.some((obj) => !comparisonFunction(item, obj))
    );
    setSelected([...withoutNew, ...objs]);
  };

  const remove = (obj: T) => setSelected(selected.filter((item) => !comparisonFunction(item, obj)));

  const removeMany = (objs: T[]) =>
    setSelected(selected.filter((item) => !objs.some((obj) => comparisonFunction(item, obj))));

  const update = (obj: T) => {
    const index = selected.findIndex((item) => comparisonFunction(item, obj));
    if (index > 1) setSelected([...selected.slice(0, index), obj, ...selected.slice(index + 1)]);
  };

  return { add, addOrRemove, addOrUpdateMany, selected, setSelected, remove, removeMany, update };
}
