import { useEffect, useState } from 'react';
import MarkdownPreview from '../../../components/mk';
import { getCodeDoc } from '../../../components/mk/utils';

const code = getCodeDoc(
  `const ClosureProblem = () => {
    const [count, setCount] = useState(0);
    useEffect(() => {
      const interval = setInterval(() => {
        // 闭包
        setCount(count + 1);
      }, 1000);
      return () => clearInterval(interval);
    }, []);
  
    return (
      <>
        <h1>setInterval 但是无效</h1>
        <p>count: {count}</p>
      </>
    );
  };`
);

const ClosureProblem = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // 闭包
      setCount(count + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <MarkdownPreview doc={code} />
      <h1>setInterval 但是无效,因为 interval 回掉函数内闭包</h1>
      <p>count: {count}</p>
    </div>
  );
};

export default ClosureProblem;
