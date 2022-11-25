import { useEffect, useRef, useState } from 'react';
import { EditorState } from '@codemirror/state';
import {
  EditorView,
  lineNumbers,
  highlightActiveLine,
  highlightActiveLineGutter
} from '@codemirror/view';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { syntaxHighlighting, HighlightStyle } from '@codemirror/language';
import { tags } from '@lezer/highlight';

const markdownHighlighting = HighlightStyle.define([
  {
    tag: tags.heading1,
    fontSize: '1.6em',
    fontWeight: 'bold'
  },
  {
    tag: tags.heading2,
    fontSize: '1.4em',
    fontWeight: 'bold'
  },
  {
    tag: tags.heading3,
    fontSize: '1.2em',
    fontWeight: 'bold'
  }
]);

type useCodeMirrorProps = {
  initialDoc: string;
  setDoc: (doc: string) => void;
};

const useCodeMirror = ({ setDoc, initialDoc }: useCodeMirrorProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<EditorView>();

  useEffect(() => {
    // 避免 code mirror 注入两次
    if (!ref.current || ref.current.children.length > 0) return;
    const startState = EditorState.create({
      doc: initialDoc,
      extensions: [
        lineNumbers(),
        highlightActiveLine(),
        highlightActiveLineGutter(),
        markdown({
          base: markdownLanguage
        }),
        syntaxHighlighting(markdownHighlighting),
        EditorView.lineWrapping,
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            setDoc(update.state.doc.toString());
          }
        }),
        EditorView.theme(
          {
            '&': {
              color: 'white',
              backgroundColor: '#034'
            },
            '.cm-content': {
              caretColor: '#0e9'
            },
            '&.cm-focused .cm-cursor': {
              borderLeftColor: '#0e9'
            },
            '&.cm-focused .cm-selectionBackground, ::selection': {
              backgroundColor: '#074'
            },
            '.cm-gutters': {
              backgroundColor: '#045',
              color: '#ddd',
              border: 'none'
            }
          },
          { dark: true }
        )
      ]
    });

    const view = new EditorView({
      state: startState,
      parent: ref.current
    });

    setView(view);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  return { ref, view };
};

export default useCodeMirror;
