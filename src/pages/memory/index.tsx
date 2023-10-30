import { PlayCircleFilled } from '@ant-design/icons';
import {
  Button,
  Card,
  DatePicker,
  Input,
  message,
  Select,
  Tooltip,
} from 'antd';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
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
  const inputRef = useRef<any>(null);

  const router = useRouter();

  useEffect(() => {
    inputRef && inputRef.current?.focus();

    let n = localStorage.getItem('exerciseCount') ?? 3;
    setExerciseCount(+n);
    setTimes(+n);

    const date = router.query.date as string;
    setSelectedDate(date);
    fetchData(date);
  }, [exerciseCount, router.query.date]);

  useEffect(() => {
    document.addEventListener('keydown', keydownHandler);
    return () => {
      document.removeEventListener('keydown', keydownHandler);
    };
  }, [item]);

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

  const nextWord = async () => {
    await recordMemory({ word: item!.word });
    fetchData();
    setTimes(exerciseCount);
  };

  const keydownHandler = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      nextWord();
    }
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
          nextWord();
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

  const handleExerciseCountChange = (times: number) => {
    setExerciseCount(times);
    setTimes(times);
    localStorage.setItem('exerciseCount', String(times));
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div style={{ flex: 1 }}>
          <div>
            <Button size="large" onClick={() => handleExerciseCountChange(15)}>
              上
            </Button>
            <Button
              size="large"
              style={{ marginLeft: 10 }}
              onClick={() => handleExerciseCountChange(10)}
            >
              中
            </Button>
            <Button
              size="large"
              style={{ marginLeft: 10 }}
              onClick={() => handleExerciseCountChange(5)}
            >
              下
            </Button>

            <Select
              size="large"
              style={{ width: '65px', marginLeft: 10 }}
              value={exerciseCount}
              options={Array.from('x'.repeat(50)).map((v, i) => ({
                value: i,
                label: i,
              }))}
              onChange={(v) => handleExerciseCountChange(v)}
            />

            <DatePicker
              size="large"
              value={selectedDate ? dayjs(selectedDate) : null}
              style={{ marginLeft: 10 }}
              onChange={handleDateChange}
            />
            <Button
              size="large"
              style={{ marginLeft: 10 }}
              onClick={() => nextWord()}
            >
              下一个
            </Button>
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
              ref={inputRef}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
