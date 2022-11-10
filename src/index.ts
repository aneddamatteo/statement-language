import { parser } from "./syntax.grammar";
import {
  LRLanguage,
  LanguageSupport,
  indentNodeProp,
  foldNodeProp,
  foldInside,
  delimitedIndent,
} from "@codemirror/language";
import { styleTags, tags as t } from "@lezer/highlight";
import { Extension } from "@codemirror/state";

export const StatementLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        Application: delimitedIndent({ closing: ")", align: false }),
      }),
      foldNodeProp.add({
        Application: foldInside,
      }),
      styleTags({
        Operator: t.integer,
        Entity: t.bool,
        Member: t.self,
        Property: t.comment,
        Number: t.float,
        String: t.string,
        "( )": t.paren,
      }),
    ],
  }),
});

export function StatementLang(statementCompletion: any) {
  return new LanguageSupport(StatementLanguage, [
    StatementLanguage.data.of({ autocomplete: statementCompletion }),
  ]);
}
