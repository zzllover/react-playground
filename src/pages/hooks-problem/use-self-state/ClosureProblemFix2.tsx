import { useCallback, useEffect, useRef, useState } from 'react';
import MarkdownPreview from '../../../components/mk';
import { getCodeDoc } from '../../../components/mk/utils';

const code = getCodeDoc(
  `// 通过 useRef 拿住 state
  const useGetState = (initialState: any) => {
    const [state, setState] = useState(initialState);
    const stateRef = useRef(state);
    stateRef.current = state;
  
    const getState = useCallback(() => stateRef.current, []);
    return [state, setState, getState]
  }
  
  const ClosureProblem = () => {
    const [count, setCount, getState] = useGetState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        // 闭包
        setCount(getState() + 1);
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

// 通过 useRef 拿住 state
const useGetState = (initialState: any) => {
  const [state, setState] = useState(initialState);
  const stateRef = useRef(state);
  stateRef.current = state;

  const getState = useCallback(() => stateRef.current, []);
  return [state, setState, getState]
}

const ClosureProblem = () => {
  const [count, setCount, getState] = useGetState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // 闭包
      setCount(getState() + 1);
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
