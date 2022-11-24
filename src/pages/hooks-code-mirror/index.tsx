import { useState } from "react";
import { unifyDocs } from "./utils";
import useCodeMirror from "./useCodeMirror";
/**
 * 
 * demo from
 * https://0xsuk.github.io/posts/2022-03-25-build-your-own-markdown-editor-with-react.js-and-codemirror-6/
 */
const HooksCodeMirror = () => {
  const [doc, setDoc] = useState("# hell1o12123123123");
  const {ref}= useCodeMirror({initialDoc: doc, setDoc})

  return (
    <>
      <div className="kkoine" ref={ref}/>
      <div>{unifyDocs(doc)}</div>
    </>
  );
};

export default HooksCodeMirror;
