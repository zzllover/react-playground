import { useState } from "react";
import { unifyDocs } from "./utils";
import useCodeMirror from "./useCodeMirror";

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
