import { PlayCircleFilled } from '@ant-design/icons';
import { Card, DatePicker, Input, message, Select, Tooltip } from 'antd';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { WordRes } from '../../services/models';
import { recordGetMemory } from '../../services/record/record-get-memory.service';
import { recordMemory } from '../../services/record/record-memory.service';
import styles from './styles.module.css';

export default function Memory() {
  const [item, setItem] = useState<WordRes>();
  const [inputValue, setInputValue] = useState('');
  const [exerciseCount, setExerciseCount] = useState(3);
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [times, setTimes] = useState(exerciseCount);
  const router = useRouter();

  useEffect(() => {
    let n = localStorage.getItem('exerciseCount') ?? 3;
    setExerciseCount(+n);
    setTimes(+n);

    const date = router.query.date as string;
    setSelectedDate(date);
    fetchData(date);
  }, [exerciseCount, router.query.date]);

  const fetchData = async (date?: any) => {
    let word = await recordGetMemory({
      recordTime: date ? date : selectedDate!,
    });
    setItem(word);
  };

  const handleDateChange = (date: any) => {
    const formattedDate = date ? date.format('YYYY-MM-DD') : null;
    fetchData(formattedDate);
    setSelectedDate(date);
    router.query.date = formattedDate;
    router.push({ query: { ...router.query, date: formattedDate } });
  };

  if (typeof window !== 'undefined' && navigator.userAgent.includes('Mobile')) {
    const windowHeight = window.innerHeight;
    message.config({
      top: windowHeight - 400, // 距离顶部的距离
    });
  }

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
        <div style={{ flex: 1 }}>
          <div>
            <Select
              size="large"
              style={{ width: '65px' }}
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

            <DatePicker
              size="large"
              value={selectedDate ? dayjs(selectedDate) : null}
              style={{ marginLeft: 10 }}
              onChange={handleDateChange}
            />
          </div>
          {item && (
            <div style={{ marginTop: 50 }}>
              <Card
                style={{ width: '80%' }}
                bodyStyle={{ display: 'flex', alignItems: 'center' }}
              >
                <Tooltip title={item.chinese} placement="bottom">
                  <p> Record Time: {item.recordTime} </p>
                  <p> Hit: {times} </p>
                  <p> Memory Times: {item.memoryTimes} </p>
                  <p> {item.phoneticSymbol} </p>
                  <p>
                    {' '}
                    {times <= 3 ? '*'.repeat(item.word.length) : item.word}{' '}
                  </p>
                  <p>
                    {' '}
                    {times <= 3
                      ? '*'.repeat(item?.sentence?.length ?? 0)
                      : item.sentence}{' '}
                  </p>
                </Tooltip>

                <PlayCircleFilled
                  style={{ marginLeft: '20px' }}
                  onClick={() =>
                    window.open(`https://youglish.com/pronounce/${item.word}`)
                  }
                />
              </Card>
            </div>
          )}
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
      </div>
    </main>
  );
}
