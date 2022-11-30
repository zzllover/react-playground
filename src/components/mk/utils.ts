import { createElement, Fragment } from "react";
import rehypeMathJaxSvg from "rehype-mathjax";
import rehypeReact from "rehype-react";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import rehypeHighlight from 'rehype-highlight'
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';

export const getCodeDoc = (doc: string) => {
  return `
  \`\`\`js
  ${doc}
  \`\`\`
  `;
}

export const unifyDocs = (doc: string, treeData?: any) => {
  const md = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeHighlight, { // 代码块格式化
      languages: {
        javascript,
        typescript
      },
      ignoreMissing: true,
    })
    .use(() => (tree) => { // 记录格式树
      treeData && (treeData.current = tree); //treeData length corresponds to previewer's childNodes length
      return tree;
    })
    .use(rehypeMathJaxSvg)
    .use(rehypeReact, { createElement, Fragment })
    .processSync(doc).result;

  return md;
}