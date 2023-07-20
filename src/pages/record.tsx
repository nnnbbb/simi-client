import { PlayCircleFilled } from '@ant-design/icons';
import { Card, Timeline, Tooltip } from 'antd';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { recordQuery } from '../services/record/record-query.service';

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
      let children = _.map(value, (item) => {
        return <div style={{ width: "90%" }}>
          <Card style={{ width: "100%", }} bodyStyle={{ display: "flex", alignItems: "center" }}>
            <Tooltip title={item.chinese} placement="bottom">
              <p>{item.phoneticSymbol} </p><p>{item.word} </p>
            </Tooltip>
            <PlayCircleFilled style={{ marginLeft: "20px" }} onClick={() => { window.open(`https://youglish.com/pronounce/${item.word}`) }} />
          </Card>
        </div>

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
