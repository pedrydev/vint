import { Card, Image, Rate, Switch, Table, Typography } from 'antd';
import type { TableProps } from 'antd';
import { useTranslation } from 'react-i18next';
import Page from '@/common/layout/Page';
import useProducts from '../hooks/useProducts';
import Product from '../models/Product';
import useUniqueList from '@/common/form/useUniqueList';

export default function Index() {
  const { t } = useTranslation('home');
  const { data, isLoading } = useProducts();
  const { addOrRemove, selected: columnsToShow } = useUniqueList({
    initSelected: ['title', 'category', 'price', 'rating'],
  });

  const columns: TableProps<Product>['columns'] = [
    {
      align: 'center',
      title: t('productTable.title'),
      dataIndex: 'title',
      key: 'title',
      fixed: 'left',
      render: (value, record) => (
        <div className='flex items-center space-x-sm'>
          <Image alt={value} className='rounded-full' src={record.image} width={50} />
          <span>{value}</span>
        </div>
      ),
    },
    { title: t('productTable.description'), dataIndex: 'description', key: 'description' },
    {
      align: 'center',
      title: t('productTable.category'),
      dataIndex: 'category',
      key: 'category',
      width: '120px',
    },
    {
      align: 'center',
      title: t('productTable.price'),
      dataIndex: 'price',
      key: 'price',
      width: '80px',
    },
    {
      align: 'center',
      title: t('productTable.rating'),
      dataIndex: 'rating',
      key: 'rating',
      render: (value) => <Rate disabled defaultValue={value.rate} />,
      width: '150px',
    },
  ];

  const filteredColumns = columns.filter((col) => columnsToShow.some((c) => col.key === c));

  return (
    <Page title={t('title')} help={<Typography.Paragraph>{t('help')}</Typography.Paragraph>}>
      <Card size='small'>
        <div className='space-y-sm'>
          <div className='flex space-x-sm'>
            {['description', 'category'].map((c) => (
              <Switch
                key={c}
                checked={columnsToShow.some((c2) => c === c2)}
                checkedChildren={`Hide ${t(`productTable.${c}`)}`}
                unCheckedChildren={`Show ${t(`productTable.${c}`)}`}
                onChange={() => addOrRemove(c)}
              />
            ))}
          </div>
          <Table
            bordered
            columns={filteredColumns}
            dataSource={data}
            loading={isLoading}
            scroll={{ x: 250 * filteredColumns.length }}
            size='small'
            rowKey='id'
          />
        </div>
      </Card>
    </Page>
  );
}
