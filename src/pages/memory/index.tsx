import { PlayCircleFilled } from '@ant-design/icons';
import { Card, Input, message, Select, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { WordRes } from '../../services/models';
import { recordGetMemory } from '../../services/record/record-get-memory.service';
import { recordMemory } from '../../services/record/record-memory.service';
import styles from './styles.module.css';

export default function Memory() {
  const [item, setItem] = useState<WordRes>();
  const [inputValue, setInputValue] = useState('');
  const [exerciseCount, setExerciseCount] = useState(3);
  const [times, setTimes] = useState(exerciseCount);

  useEffect(() => {
    let n = localStorage.getItem('exerciseCount') ?? 3;
    setExerciseCount(+n);
    setTimes(+n);
    fetchData();
  }, [exerciseCount]);

  const fetchData = async () => {
    let word = await recordGetMemory();
    setItem(word);
  };

  const handleEnter = async (event: any) => {
    const v = event.target.value as string;
    // 处理回车事件的逻辑
    if (item?.word.trim() === v.trim()) {
      message.success('Hit!');

      setInputValue('');

      setTimes((prev: number) => {
        const t = prev - 1;
        if (t === 0) {
          recordMemory({ word: v }).then((r) => {
            fetchData();
            setTimes(exerciseCount);
          });
        }

        return t;
      });
    } else {
      message.error('输入错误');
    }
  };
  const handleChange = (event: any) => {
    setInputValue(event.target.value);
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {item && (
          <div style={{ flex: 1 }}>
            <div>
              <Select
                size="large"
                placeholder="输入单词"
                style={{ width: '60px' }}
                value={exerciseCount}
                options={Array.from('x'.repeat(50)).map((v, i) => ({
                  value: i,
                  label: i,
                }))}
                onChange={(v) => {
                  setExerciseCount(v);
                  localStorage.setItem('exerciseCount', String(v));
                }}
              />
            </div>

            <div style={{ marginTop: 50 }}>
              <Card
                style={{ width: '80%' }}
                bodyStyle={{ display: 'flex', alignItems: 'center' }}
              >
                <Tooltip title={item.chinese} placement="bottom">
                  <p> Hit: {times} </p>
                  <p> Memory Times: {item.memoryTimes} </p>
                  <p> {item.phoneticSymbol} </p>
                  <p> {item.word} </p>
                </Tooltip>

                <PlayCircleFilled
                  style={{ marginLeft: '20px' }}
                  onClick={() =>
                    window.open(`https://youglish.com/pronounce/${item.word}`)
                  }
                />
              </Card>
            </div>
            <div className={styles.inputContainer}>
              <Input
                size="large"
                placeholder="输入单词"
                value={inputValue}
                onChange={handleChange}
                onPressEnter={handleEnter}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
