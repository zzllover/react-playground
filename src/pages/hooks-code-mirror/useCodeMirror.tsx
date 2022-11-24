import { useEffect, useRef, useState } from 'react'
import { EditorState } from '@codemirror/state'
import { EditorView } from '@codemirror/view'

type useCodeMirrorProps = {
  initialDoc: string
  setDoc: (doc: string) => void
}
const useCodeMirror = ({ setDoc, initialDoc }: useCodeMirrorProps) => {
  const ref = useRef(null);
  const [view, setView] = useState<EditorView>();

  useEffect(() => {
    console.log("ref", ref)
    if (!ref.current) return;
    const startState = EditorState.create({
      doc: initialDoc,
      extensions: [
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            setDoc(update.state.doc.toString());
          }
        }),
      ],
    });

    const view = new EditorView({
      state: startState,
      parent: ref.current,
    });

    setView(view);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  return {ref, view};

}

export default useCodeMirror
