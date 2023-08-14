import { Timeline, Tooltip } from 'antd';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import WordCard from '../../components/WordCard';
import { recordQuery } from '../../services/record/record-query.service';
import { wordRemove } from '../../services/word/word-remove.service';

const Record: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchData();

    const debouncedScroll = _.debounce(handleScroll, 500);
    window.addEventListener('scroll', debouncedScroll);
    return () => {
      window.removeEventListener('scroll', debouncedScroll);
    };
  }, [currentPage]);

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;

    const h = scrollTop + windowHeight + 500;
    if (h >= scrollHeight) {
      setCurrentPage((prevPage) => prevPage + 1); // 使用函数式更新
      fetchData();
    }
  };

  const fetchData = async () => {
    let res = await recordQuery({ page: currentPage, pageSize: 3 });
    const list = _.groupBy(res.list, 'recordTime');

    let items = _.map(list, (value, key) => {
      let children = _.map(value, (item) => {
        return (
          <WordCard
            item={item}
            onRemove={async () => {
              await wordRemove({ id: item.id as unknown as string });
              fetchData();
            }}
          />
        );
      });

      return {
        key,
        color: 'black',
        children: (
          <>
            {
              <Tooltip title={children.length} placement="right">
                {key}
              </Tooltip>
            }{' '}
            {...children}
          </>
        ),
      };
    });
    setItems((prevItems) => {
      prevItems.map((it) => _.remove(items, { key: it.key }));
      return [...prevItems, ...items];
    });
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Timeline
        style={{
          marginTop: '50px',
          marginLeft: '10px',
        }}
        items={items}
      />
    </div>
  );
};

export default Record;
