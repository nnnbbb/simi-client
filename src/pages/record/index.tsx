import { DeleteOutlined, PlayCircleFilled } from '@ant-design/icons';
import { Button, Card, Modal, Timeline, Tooltip } from 'antd';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { WordRes } from '../../services/models';
import { recordQuery } from '../../services/record/record-query.service';
import { wordRemove } from '../../services/word/word-remove.service';
import styles from './styles.module.css';

const Record: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  useEffect(() => {
    fetchData(currentPage);
  }, [showDeleteButton]);

  const handleMouseEnter = () => {
    setShowDeleteButton(true);
  };

  const handleMouseLeave = () => {
    setShowDeleteButton(false);
  };

  const handleConfirm = (item: WordRes) => {
    Modal.confirm({
      title: '确认删除',
      okText: '确认',
      cancelText: '取消',
      content: `您确定要删除 ${item.word} 吗?`,
      onOk() {
        wordRemove({ id: (item.id as unknown as string) })
      },
      onCancel() {
      },
    });
  };

  const fetchData = async (page: number) => {
    let res = await recordQuery()
    const list = _.groupBy(res.list, "recordTime")

    let items = _.map(list, (value, key) => {
      let children = _.map(value, (item) => {
        return <div className={styles.card}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ width: "90%" }}>
          <Card
            style={{ width: "100%" }}
            bodyStyle={{ display: "flex", alignItems: "center" }}
          >
            <Tooltip title={item.chinese} placement="bottom">
              <p>{item.phoneticSymbol} </p><p>{item.word} </p>
            </Tooltip>
            <PlayCircleFilled style={{ marginLeft: "20px" }} onClick={() => { window.open(`https://youglish.com/pronounce/${item.word}`) }} />
          </Card>
          {showDeleteButton && (
            <Button className={styles["delete-button"]} onClick={() => handleConfirm(item)}>
              <DeleteOutlined />
            </Button>
          )}
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
