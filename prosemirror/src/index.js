import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
export { Schema, DOMParser, Node } from "prosemirror-model";
// export { schema as basicSchema } from "prosemirror-schema-basic";
import { schema as basicSchema } from "./schemabasic";
// export { exampleSetup } from "prosemirror-example-setup";
import { exampleSetup } from "./exampleSetup";
export function bind(elem){
    var view = new EditorView(elem, {
        state: EditorState.create({
            schema: basicSchema,
            plugins: exampleSetup({ schema: basicSchema })
        })
    });
    return view
}