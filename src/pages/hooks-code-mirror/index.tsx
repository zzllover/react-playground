import { useState } from "react";

const HooksCodeMirror = () => {
  const [docs, setDoc] = useState("#hello");

  return <div>{docs}</div>;
};

export default HooksCodeMirror;
