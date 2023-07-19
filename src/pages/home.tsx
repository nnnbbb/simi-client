import { Button, Layout, message, Select } from 'antd';
import { useState } from 'react';
import { wordCreate } from '../services/word/word-create.service';
import { Http } from '../utils/Http';
import styles from './page.module.css';

const { Header, Content, Footer } = Layout;

export default function Home() {
  const [suggest, setSuggest] = useState<any[]>([]);
  const [word, setWord] = useState("");

  async function onSearch(word: string) {
    let res = await Http.get(`/suggest?word=${word}`)
    setSuggest(res.data.entries)
  }

  const handleConfirm = async () => {
    let res = await wordCreate({ word })
    message.success("添加成功")
    setWord("")
  };

  return (
    <main className={styles.main}>
      <div className={styles.container} >
        <Select
          size='large'
          showSearch
          value={word}
          optionLabelProp={word}
          // onBlur={(e) => {
          //   const target = e.target as HTMLTextAreaElement;
          //   setWord(target.value)
          // }}
          style={{ width: "80%", marginRight: 8 }}
          placeholder="在此输入单词或文本"
          onSearch={(word) => {
            onSearch(word)
          }}
          onChange={(word) => setWord(word)}

          showArrow={false}
          options={suggest?.map(it => {
            return ({
              value: it.entry,
              label: `${it.entry} ${it.explain}`,
            })
          })}
        >
        </Select>
        <Button type="primary" size='middle' style={{}} onClick={handleConfirm}>
          添加
        </Button>
      </div>
    </main>
  )
}
