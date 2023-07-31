import { Timeline } from 'antd';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import WordCard from '../../components/WordCard';
import { recordQuery } from '../../services/record/record-query.service';
import { wordRemove } from '../../services/word/word-remove.service';

const Record: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchData(currentPage);
  }, []);


  const fetchData = async (page: number) => {
    let res = await recordQuery()
    const list = _.groupBy(res.list, "recordTime")

    let items = _.map(list, (value, key) => {
      let children: any = _.map(value, (item) => {
        return <WordCard
          item={item}
          onRemove={async () => {
            await wordRemove({ id: (item.id as unknown as string) })
            fetchData(currentPage);
          }}
        />

      })
      return { color: 'black', children: <>{key} {...children}</> }
    })
    setItems(items)
  };
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Timeline
        style={{
          marginTop: "50px",
          marginLeft: "10px",
        }}
        items={items}
      />
    </div>
  );

}

export default Record;
