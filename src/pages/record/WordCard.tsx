import { DeleteOutlined, PlayCircleFilled } from '@ant-design/icons';
import { Button, Card, Modal, Tooltip } from 'antd';
import React, { useState } from 'react';
import { WordRes } from '../../services/models';
import styles from './styles.module.css';

interface IProps {
  item: WordRes;
  onRemove: () => void
}

const WordCard: React.FC<IProps> = (props: IProps) => {
  const { item, onRemove } = props
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  const handleConfirm = (item: WordRes) => {
    Modal.confirm({
      title: '确认删除',
      okText: '确认',
      cancelText: '取消',
      content: `您确定要删除 ${item.word} 吗?`,
      onOk: onRemove,
      onCancel() { },
    });
  };

  return (
    <div className={styles.card}>
      <Card
        style={{ width: "100%" }}
        bodyStyle={{ display: "flex", alignItems: "center" }}
        onClick={() => setShowDeleteButton(!showDeleteButton)}
      >
        <Tooltip title={item.chinese} placement="bottom">
          <p> {item.phoneticSymbol} </p>
          <p> {item.word} </p>
        </Tooltip>

        <PlayCircleFilled style={{ marginLeft: "20px" }} onClick={() => window.open(`https://youglish.com/pronounce/${item.word}`)} />

        {showDeleteButton && (
          <Button className={styles["delete-button"]} onClick={() => handleConfirm(item)}>
            <DeleteOutlined />
          </Button>
        )}

      </Card>

    </div>
  );
};

export default WordCard;
