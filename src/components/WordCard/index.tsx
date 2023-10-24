import { PlayCircleFilled } from '@ant-design/icons';
import { Card, Modal, Tooltip } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { WordRes } from '../../services/models';
import styles from './styles.module.css';

interface IProps {
  item: WordRes;
  onRemove?: () => void;
}

const WordCard: React.FC<IProps> = (props: IProps) => {
  const { item, onRemove } = props;
  const cardTopRef = useRef<HTMLDivElement>(null);
  const [cardBottomHeight, setCardBottomHeight] = useState(0);

  useEffect(() => {
    if (cardTopRef.current) {
      const cardTopHeight = cardTopRef.current.offsetHeight;
      setCardBottomHeight(cardTopHeight);
    }
    return () => {
      closeDrawer();
    };
  }, []);

  const handleConfirm = (item: WordRes) => {
    Modal.confirm({
      title: '确认删除',
      okText: '确认',
      cancelText: '取消',
      content: `您确定要删除 ${item.word} 吗?`,
      onOk: onRemove,
      onCancel() {},
      maskClosable: false,
    });
  };
  const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
    if (
      cardTopRef.current &&
      !cardTopRef.current.contains(event.target as HTMLElement | null)
    ) {
      // 处理点击卡片外的其他位置
      closeDrawer();
    }
  };
  const closeDrawer = () => {
    cardTopRef.current &&
      (cardTopRef.current.style.transform = 'translateX(0px)');
    document.removeEventListener('click', handleOutsideClick);
    document.removeEventListener('touchmove', handleOutsideClick);
  };
  const openDrawer = () => {
    cardTopRef.current &&
      (cardTopRef.current.style.transform = 'translateX(-75px)');
    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('touchmove', handleOutsideClick);
  };
  const handlers = useSwipeable({
    onSwipedLeft: (e) => openDrawer(),
    onSwipedRight: (e) => closeDrawer(),
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <div className={styles['card-container']} {...handlers}>
      <Card
        onClick={() => handleConfirm(item)}
        style={{ height: cardBottomHeight ? cardBottomHeight : 0 }}
        className={`${styles['card']} ${styles['card-bottom']}`}
      >
        删除
      </Card>
      <Card
        ref={cardTopRef}
        className={`${styles['card']} ${styles['card-top']}`}
        bodyStyle={{ display: 'flex', alignItems: 'center' }}
      >
        <Tooltip title={item.chinese} placement="bottom">
          <p> Memory Times: {item.memoryTimes} </p>
          <p> {item.phoneticSymbol} </p>
          <p> {item.word} </p>
          <p> {item.sentence} </p>
        </Tooltip>

        <PlayCircleFilled
          style={{ marginLeft: '20px' }}
          onClick={() =>
            window.open(`https://youglish.com/pronounce/${item.word}`)
          }
        />
      </Card>
    </div>
  );
};

export default WordCard;
