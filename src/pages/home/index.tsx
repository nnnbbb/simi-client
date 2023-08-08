import { AutoComplete, Button, Input, message } from 'antd';
import { useState } from 'react';
import { wordCreate } from '../../services/word/word-create.service';
import { Http } from '../../utils/Http';
import styles from './styles.module.css';

export default function Home() {
  const [suggest, setSuggest] = useState<any[]>([]);
  const [word, setWord] = useState('');
  const [chinese, setChinese] = useState('');
  const [showChineseInput, setShowChineseInput] = useState(false);

  async function onSearch(word: string) {
    let res = await Http.get(`/suggest?word=${word}`);
    setSuggest(res.data.entries || []);
  }

  const handleConfirm = async () => {
    let res = await wordCreate({ word, chinese });
    message.success('添加成功', 1);
    // notification.success({ message: "添加成功" });
    setWord('');
    setChinese('');
  };

  const handleShowChineseInput = (word: string) => {
    if (word.length > 0 && suggest?.length === 0) {
      setShowChineseInput(true);
    } else {
      setShowChineseInput(false);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div style={{ width: '100%' }}>
          <AutoComplete
            size="large"
            showSearch
            value={word}
            style={{ width: '100%' }}
            placeholder="在此输入单词或文本"
            onSearch={(word) => onSearch(word)}
            onChange={(word) => {
              setWord(word);
              handleShowChineseInput(word);
            }}
            showArrow={false}
            options={suggest?.map((it) => {
              return {
                value: it.entry,
                label: `${it.entry} ${it.explain ? it.explain : ''}`,
              };
            })}
          ></AutoComplete>
          <Input
            size="large"
            placeholder="中文"
            value={chinese}
            onChange={(e) => setChinese(e.target.value)}
            style={{ display: showChineseInput ? '' : 'none' }}
          />
        </div>
        <div style={{ width: '20%', margin: '16px' }}>
          <Button type="primary" size="middle" onClick={handleConfirm}>
            添加
          </Button>
        </div>
      </div>
    </main>
  );
}
