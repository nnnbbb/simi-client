import { AutoComplete, Button, message } from 'antd';
import { useState } from 'react';
import { wordCreate } from '../../services/word/word-create.service';
import { Http } from '../../utils/Http';
import styles from './styles.module.css';

export default function Home() {
  const [suggest, setSuggest] = useState<any[]>([]);
  const [word, setWord] = useState('');

  async function onSearch(word: string) {
    let res = await Http.get(`/suggest?word=${word}`);
    setSuggest(res.data.entries);
  }

  const handleConfirm = async () => {
    let res = await wordCreate({ word });
    message.success('添加成功', 1);
    // notification.success({ message: "添加成功" });
    setWord('');
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <AutoComplete
          size="large"
          showSearch
          value={word}
          style={{ width: '80%', marginRight: 8 }}
          placeholder="在此输入单词或文本"
          onSearch={(word) => onSearch(word)}
          onChange={(word) => setWord(word)}
          showArrow={false}
          options={suggest?.map((it) => {
            return {
              value: it.entry,
              label: `${it.entry} ${it.explain}`,
            };
          })}
        ></AutoComplete>
        <Button type="primary" size="middle" style={{}} onClick={handleConfirm}>
          添加
        </Button>
      </div>
    </main>
  );
}
