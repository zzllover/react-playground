import { useEffect, useRef, useState } from 'react';
import MarkdownPreview from '../../../components/mk';
import { getCodeDoc } from '../../../components/mk/utils';

const code = getCodeDoc(
  `const useLatest = (state: any) => {
    const ref = useRef(state);
    ref.current = state;
    return ref;
  }
  const ClosureProblem = () => {
    const [count, setCount] = useState(0);
    const refCount = useLatest(count);
  
    useEffect(() => {
      const interval = setInterval(() => {
        // 闭包
        setCount(refCount.current + 1);
      }, 1000);
      return () => clearInterval(interval);
    }, []);
  
    return (
      <>
        <MarkdownPreview doc={code} />
        <h1>setInterval 但是无效,因为 interval 回掉函数内闭包</h1>
        <p>count: {count}</p>
      </>
    );
  };`
);

const useLatest = (state: any) => {
  const ref = useRef(state);
  ref.current = state;
  return ref;
}

const ClosureProblem1 = () => {
  const [count, setCount] = useState(0);
  const refCount = useLatest(count);

  useEffect(() => {
    const interval = setInterval(() => {
      // 闭包
      setCount(refCount.current + 1);
    }, 1000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <MarkdownPreview doc={code} />
      <h1>setInterval 但是无效,因为 interval 回掉函数内闭包</h1>
      <p>count: {count}</p>
    </div>
  );
};

export default ClosureProblem1;
