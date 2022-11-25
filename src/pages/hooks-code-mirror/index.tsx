import { useCallback, useMemo, useRef, useState } from 'react';
import 'github-markdown-css/github-markdown-light.css';
import { unifyDocs } from './utils';
import useCodeMirror from './useCodeMirror';
import './index.css';
import { Root } from 'remark-gfm';
import 'highlight.js/styles/github.css';
/**
 *
 * demo from
 * https://0xsuk.github.io/posts/2022-03-25-build-your-own-markdown-editor-with-react.js-and-codemirror-6/
 */
const HooksCodeMirror = () => {
  const [doc, setDoc] = useState('# write code');
  const { ref, view: editorView } = useCodeMirror({ initialDoc: doc, setDoc });
  const mouseIsOn = useRef<any>(null);
  const treeData = useRef<Root>(null); // 拿到渲染的文档树

  const markdownElem = document.querySelector('#markdown') as HTMLElement;
  const previewElem = document.querySelector('#preview') as HTMLElement;
  const computeElemsOffsetTop = useCallback(() => {
    let markdownChildNodesOffsetTopList: number[] = [];
    let previewChildNodesOffsetTopList: number[] = [];
    const tree = treeData.current;
    if (editorView && tree) {
      tree.children.forEach((child: any, index: number) => {
        if (child.type !== 'element' || child.position === undefined) return;
        const pos = child.position.start.offset;
        const lineInfo = editorView.lineBlockAt(pos);
        const offsetTop = lineInfo.top;
        markdownChildNodesOffsetTopList.push(offsetTop);
        const childNode = previewElem.childNodes[index] as HTMLElement;
        previewChildNodesOffsetTopList.push(
          childNode.offsetTop - previewElem.getBoundingClientRect()?.top //offsetTop from the top of preview
        );
      });
    }
    return [markdownChildNodesOffsetTopList, previewChildNodesOffsetTopList];
  }, [editorView, previewElem]);

  const handleMdScroll = useCallback(() => {
    if (mouseIsOn.current !== 'markdown') {
      return;
    }
    const [markdownChildNodesOffsetTopList, previewChildNodesOffsetTopList] =
      computeElemsOffsetTop();
    let scrollElemIndex: number = 0;
    for (let i = 0; markdownChildNodesOffsetTopList.length > i; i++) {
      if (markdownElem.scrollTop < markdownChildNodesOffsetTopList[i]) {
        scrollElemIndex = i - 1;
        break;
      }
    }

    if (
      markdownElem.scrollTop >=
      markdownElem.scrollHeight - markdownElem.clientHeight //true when scroll reached the bottom
    ) {
      previewElem.scrollTop = previewElem.scrollHeight - previewElem.clientHeight; //scroll to the bottom
      return;
    }

    if (scrollElemIndex >= 0) {
      let ratio =
        (markdownElem.scrollTop - markdownChildNodesOffsetTopList[scrollElemIndex]) /
        (markdownChildNodesOffsetTopList[scrollElemIndex + 1] -
          markdownChildNodesOffsetTopList[scrollElemIndex]);
      previewElem.scrollTop =
        ratio *
          (previewChildNodesOffsetTopList[scrollElemIndex + 1] -
            previewChildNodesOffsetTopList[scrollElemIndex]) +
        previewChildNodesOffsetTopList[scrollElemIndex];
    }
  }, [computeElemsOffsetTop, markdownElem, previewElem]);

  const handlePreviewScroll = useCallback(() => {
    if (mouseIsOn.current !== 'preview') {
      return;
    }
    const [markdownChildNodesOffsetTopList, previewChildNodesOffsetTopList] =
      computeElemsOffsetTop();
    let scrollElemIndex = -1;
    for (let i = 0; previewChildNodesOffsetTopList.length > i; i++) {
      if (previewElem.scrollTop < previewChildNodesOffsetTopList[i]) {
        scrollElemIndex = i - 1;
        break;
      }
    }

    if (scrollElemIndex >= 0) {
      let ratio =
        (previewElem.scrollTop - previewChildNodesOffsetTopList[scrollElemIndex]) /
        (previewChildNodesOffsetTopList[scrollElemIndex + 1] -
          previewChildNodesOffsetTopList[scrollElemIndex]);
      markdownElem.scrollTop =
        ratio *
          (markdownChildNodesOffsetTopList[scrollElemIndex + 1] -
            markdownChildNodesOffsetTopList[scrollElemIndex]) +
        markdownChildNodesOffsetTopList[scrollElemIndex];
    }
  }, [computeElemsOffsetTop, markdownElem, previewElem]);

  const previewDom = useMemo(() => unifyDocs(doc, treeData), [doc]);

  return (
    <div id="editor-wrapper">
      <div
        id="markdown"
        ref={ref}
        onScroll={handleMdScroll}
        onMouseEnter={() => {
          mouseIsOn.current = 'markdown';
        }}
      />
      <div
        id="preview"
        className="markdown-body"
        onScroll={handlePreviewScroll}
        onMouseEnter={() => {
          mouseIsOn.current = 'preview';
        }}
      >
        {previewDom}
      </div>
    </div>
  );
};

export default HooksCodeMirror;
