import { Button, Card, Input, Modal, Table as AntTable, Typography } from 'antd';
import type { TableProps } from 'antd';
import { AiOutlineClear, AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from 'react-icons/ai';
import useUniqueList from '@/common/form/useUniqueList';
import { useToggle } from 'ahooks';
import Page from '@/common/layout/Page';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Movie {
  id: number;
  title: string;
  year: number;
  cost: number;
}

const fakeMovies: Movie[] = [];
for (let i = 0; i < 100; i++)
  fakeMovies.push({
    cost: Math.floor(Math.random() * 1000),
    id: Math.random(),
    title: 'Movie ' + i,
    year: Math.floor(Math.random() * 1000),
  });

export default function Table() {
  const [title, setTitle] = useState<string | undefined>();
  const [year, setYear] = useState<number | undefined>();
  const [cost, setCost] = useState<number | undefined>();
  const [modalAction, setModalAction] = useState<'creation' | 'edition'>('creation');
  const [page, setPage] = useState(1);
  const [open, { toggle }] = useToggle();
  const {
    add: addMovie,
    selected: movies,
    remove,
    removeMany: removeManyMovies,
  } = useUniqueList<Movie>({ initSelected: fakeMovies });
  const { selected, setSelected } = useUniqueList<Movie>({});
  const { t } = useTranslation('movies');
  const { t: tCommon } = useTranslation('common');
  const { t: tRoutes } = useTranslation('routes');

  const columns: TableProps<Movie>['columns'] = [
    { dataIndex: 'title', title: t('title') },
    { dataIndex: 'year', title: t('year') },
    { dataIndex: 'cost', title: t('cost') },
    {
      title: '',
      render: (movie) => (
        <div className='flex space-x-xs justify-center'>
          <Button
            icon={<AiOutlineEdit />}
            onClick={() => {
              setCost(movie.cost);
              setTitle(movie.title);
              setYear(movie.year);
              setModalAction('edition'), toggle();
            }}
            shape='circle'
            type='text'
          />
          <Button
            danger
            icon={<AiOutlineDelete />}
            onClick={() => remove(movie)}
            shape='circle'
            type='text'
          />
        </div>
      ),
      width: '4%',
    },
  ];

  const handleAdd = () => {
    if (title && year && cost) {
      addMovie({
        title,
        year,
        cost,
        id: Math.random(),
      });
      setTitle(undefined);
      setYear(undefined);
      setCost(undefined);
      toggle();
    }
  };

  const handleDeleteMany = () => {
    removeManyMovies(selected);
    setSelected([]);
  };

  return (
    <Page
      title={t('help')}
      breadcrumbs={[
        { href: '', key: 'home', label: tRoutes('home') },
        { href: 'movies', key: 'movies', label: tRoutes('movies') },
      ]}
      help={<Typography.Paragraph>{t('help')}</Typography.Paragraph>}
    >
      <Card size='small'>
        <div className='space-y-xs'>
          <header className='space-y-sm'>
            <div className='flex justify-between'>
              <Typography.Title level={5}>{tRoutes('movies')}</Typography.Title>
              <div className='flex space-x-xs'>
                <Button
                  icon={<AiOutlinePlus />}
                  onClick={() => {
                    setCost(undefined);
                    setTitle(undefined);
                    setYear(undefined);
                    setModalAction('creation');
                    toggle();
                  }}
                  shape='circle'
                  type='text'
                />
                <Button
                  danger
                  disabled={selected.length === 0}
                  icon={<AiOutlineDelete />}
                  onClick={handleDeleteMany}
                  shape='circle'
                  type='text'
                />
                <Button
                  disabled={selected.length === 0}
                  icon={<AiOutlineClear />}
                  onClick={() => setSelected([])}
                  shape='circle'
                  type='text'
                />
              </div>
            </div>
          </header>
          <AntTable
            bordered
            columns={columns}
            dataSource={movies}
            pagination={{
              current: page,
              hideOnSinglePage: true,
              onChange(page, _) {
                setPage(page);
              },
              showPrevNextJumpers: false,
              showSizeChanger: false,
              showTotal: (total, range) => `${range[0]}-${range[1]} | ${total}`,
              showQuickJumper: false,
              total: movies.length,
            }}
            rowKey='id'
            rowSelection={{
              selectedRowKeys: selected.map((item) => item.id),
              onChange(_, selectedRows, __) {
                setSelected(selectedRows);
              },
            }}
            size='small'
          />
        </div>
      </Card>
      <Modal
        title={`${modalAction === 'creation' ? tCommon('create') : tCommon('edit')} movie`}
        open={open}
        onCancel={toggle}
        onOk={handleAdd}
      >
        <div className='space-y-md'>
          <Input onChange={(ev) => setTitle(ev.target.value)} placeholder='Title' value={title} />
          <Input
            type='number'
            onChange={(ev) => {
              if (ev.target.value !== '') setYear(parseInt(ev.target.value));
              else setYear(undefined);
            }}
            placeholder='Year'
            value={year}
          />
          <Input
            type='number'
            onChange={(ev) => {
              if (ev.target.value !== '') setCost(parseInt(ev.target.value));
              else setCost(undefined);
            }}
            placeholder='Cost'
            value={cost}
          />
        </div>
      </Modal>
    </Page>
  );
}
