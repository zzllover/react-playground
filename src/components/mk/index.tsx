import { unifyDocs } from './utils';

type MarkdownPreviewPropsType = {
  doc: string;
  treeRef?: any;
};
const MarkdownPreview = ({ doc, treeRef }: MarkdownPreviewPropsType) => {
  return <>{unifyDocs(doc, treeRef)}</>;
};

export default MarkdownPreview;
