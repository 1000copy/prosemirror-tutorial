# README

ProseMirror is an ideal content editor which produces structured, semantically meaningful documents, in the mean time it is easy for users to understand with it's classical WYSIWYG editors.

Because it is required to transpile by a bundle,so even you just want to set up a simple editor workable,it requires quite a lot of code. so a tutorial is absolutly neccessory here.

## Shortcut

For those who are not very patient, please execute the command directly.

	npm install
	cd prosemirror
	rollup -c
	open public/index.html

You should see a nice little rich text editor out there!

If you are not satisfied with this,you can dive into it with me.


## Prerequisite knowledge

The conventional way of using an external library was to include the JS file in your index.html in a script tag. This will attach a global namespace for that library which will expose the library’s APIs and methods.

For example: You’ll include 

	<script src=”jquery.js”> 

in your index.html After that you’ll access all jQuery APIs via window.jQuery or window.$ namespace.Basically, build a ProseMirror.js file that you can use like `jquery.js`.You’d have to find a way to export necessary Prosemirror APIs into the global namespace.


## Prepare project 

Create a folder & file structure as below:

	mkdir prosemirror/
	mkdir prosemirror/src       
	touch prosemirror/src/index.js
	mkdir prosemirror/public
	touch prosemirror/public/index.html
	touch prosemirror/package.json
	touch prosemirror/rollup.config.js
	cd prosemirror

## Transpile

Since ProseMirror is written using ES6, and we want to use it with plain old ES5 Javascript, we need to transpile ProseMirror library along with its global APIs to ES5.

We are going to do that with Babel & Use Rollup as our module bundler.

Put the below content into package.json:

	cat << EOT >> package.json 
	{
	  "name": "setup-prosemirror",
	  "dependencies": {
	    "prosemirror-example-setup": "^1.0.1",
	    "prosemirror-model": "^1.6.4",
	    "prosemirror-schema-basic": "^1.0.0",
	    "prosemirror-state": "^1.2.2",
	    "prosemirror-view": "^1.6.8"
	  },
	  "devDependencies": {
	    "@babel/core": "^7.2.2",
	    "@babel/preset-env": "^7.2.3",
	    "babel-loader": "^8.0.5",
	    "rollup": "^1.1.0",
	    "rollup-plugin-babel": "^4.3.1",
	    "rollup-plugin-commonjs": "^9.2.0",
	    "rollup-plugin-node-resolve": "^4.0.0"
	  }
	}
	EOT

The package.json file declares all the dependencies to build a final ProseMirror.js file, including all the tools needed.then it’s time to use this package.json and install the dependencies. Run:

	npm i

##  Transpile by Rollup and Babel

After the dependencies are installed, create a rollup.config.js file in the prosemirror directory and put below code in it. This tells Rollup to take our src file from src/index.js and spit out a ProseMirror.js into public/ProseMirror.js

	cat <<EOT >> rollup.config.js
	import babel from 'rollup-plugin-babel';
	import resolve from 'rollup-plugin-node-resolve';
	import commonJS from 'rollup-plugin-commonjs'
	export default {
	  input: './src/index.js',
	  output: {
	    format: 'iife',
	    file: 'public/ProseMirror.js',
	    name: 'ProseMirror'
	  },
	  plugins: [
	      babel(),
	      resolve(),
	      commonJS({
	        include: 'node_modules/**'
	      })
	    ],
	};
	EOT

## import all ProseMirror APIs and exporting them to window namespace

Now’s the most important step – Writing the code to import all ProseMirror APIs and exporting them to window namespace.

Put below code into src/index.js
	
	cat <<EOT >> src/index.js
	export { EditorState } from "prosemirror-state";
	export { EditorView } from "prosemirror-view";
	export { Schema, DOMParser, Node } from "prosemirror-model";
	export { schema as basicSchema } from "prosemirror-schema-basic";
	export { exampleSetup } from "prosemirror-example-setup";
	EOT

then run to do transpile:

	rollup -c

then you will see a `ProseMirror.js` file being created at `public`.

## use this compiled JS and initialize a ProseMirror editable area

	cat << EOT >> public/index.html
	<!DOCTYPE html> <meta charset="utf8" />
	<html>
	<head>
	    <link rel="stylesheet" href="https://prosemirror.net/css/editor.css" />
	</head>
	<body>
	<div id="editor" style="margin-bottom: 23px"></div>
	<script src="ProseMirror.js"></script>
	<script>
	// window.ProseMirror is active by now.
	var plugins = ProseMirror.exampleSetup({ schema: ProseMirror.basicSchema });
	var view = new ProseMirror.EditorView(document.querySelector("#editor"), {
	    state: ProseMirror.EditorState.create({
	        schema: ProseMirror.basicSchema,
	        plugins: plugins
	    })
	});
	</script>
	</body>
	</html>
	EOT

Open up index.html in a browser and you should see a nice little rich text editor out there!

thank [@vettijoe](https://twitter.com/@vettijoe).
the article is just one note from [his article](http://hexopress.com/@joe/blog/2019/01/07/how-to-install-use-prosemirror-in-your-project
)
