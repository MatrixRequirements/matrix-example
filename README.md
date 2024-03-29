# Matrix Requirements UI Plugin Template

![Plugin Build](https://github.com/MatrixRequirements/matrix-example/actions/workflows/main.yml/badge.svg)

Matrix UI Plugins are implementations of the IPlugin interface.
They can be registered in the plugin manager at startup and will be queried
in different situations, for example to add new UI Controls or entries to 
the tree.

This basic example registers a new Dashboard which fetches so data, 
transforms it and renders the result. It can be compiled using the standard
Typescript build process into a single JS file and loaded into Matrix.

## Installation
To simplify installation without requiring disk access to a Matrix instance
you can use a special developer setup and a GitHub action to build the code.

* Create a new project using this project as a template
* Modify the code and check it into GitHub
* Make sure the build succeeds (look under Actions)
* Login into the [developer instance](https://developer.matrixreq.net)
* Create a new UI entry in the 
  [PLUGINS project](https://developer.matrixreq.net/PLUGINS/F-UI-2)
* Press the Deploy button
* Reload the browser

This should install the script on the server and load it into the browser. The
naming reflects the repository name, for example `https://developer.matrixreq.net/static/js/GitHub-MatrixRequirements_matrix-example-exampleplugin.js`

## APIs
Matrix has a very large set of APIs which you can explore in the interface definitions
in the lib directory. To simplify the start there are some wrappers around common 
calls in the src/api directory. The intention is to make these a smaller but better
documented set of often used APIs. Let us know if you're missing something!

## Tools
The build runs several tools to make it easier to create consistent plugins

### Name and version
JS file name, artifact file name and plugin name and version are all picked up from package.json. This means you need to
make sure that the `name`, `version`, and `description` field have meaningful values. 

* Name: The name of the plugin, this is used in file names
* Version: Version of the plugin, the build number is appended to this
* Description: The long/descriptive name of the plugin as it will be shown in the UI

### Linting
The project has ESLint configured and run as part of the build. You can run it yourself with `npm run lint`.

### Prettier
The project also contains a configuration for Prettier which can form your code, use this with `npm run prettier`
